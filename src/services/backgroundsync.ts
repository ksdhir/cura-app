import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { getHealthData } from "../hooks/googlehealth";
import { useFallDetectionChecker } from "../hooks/falldetection";

const BACKGROUND_FETCH_TASK = "background-fetch";
let userEmail = "";
let fallDetectionChecker: any = null;

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();
  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  // Use Fall Detection Checker
  // fallDetectionChecker = useFallDetectionChecker();

  // Get Google Health Data
  // getHealthData(userEmail);

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 10, // seconds
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

export const backgroundsync = async (email: string) => {
  userEmail = email;
  return registerBackgroundFetchAsync().then((taskId) => {
    console.log(`Task registered, ID: ${taskId}`);
  });
};
