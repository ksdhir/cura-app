import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import {
  getElderHeartRateThreshold,
  getElderHeartRateDetail,
  setElderHeartRateDetail,
  criticalHeartRateNotification,
} from "./elder";
import currentLocation from "../utils/getCurrentLocation";

const BACKGROUND_FETCH_TASK = "background-fetch";
let email = null;
let getHeartRate = null;
let token = null;
let profileType = null;

const criticalHeartRateThreshold = {
  maximum: 0,
  minimum: 0,
};

const getCriticalHeartRateThreshold = () => {
  try {
    getElderHeartRateThreshold(email)
      .then((res) => {
        criticalHeartRateThreshold.maximum = res.detail.maximum;
        criticalHeartRateThreshold.minimum = res.detail.minimum;
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error.message);
    return (
      (criticalHeartRateThreshold.maximum = 0),
      (criticalHeartRateThreshold.minimum = 0)
    );
  }
};

const init = () => {
  getCriticalHeartRateThreshold();
  getHeartRate();
};

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  // Be sure to return the successful result type!

  const getFitbitHeartRateData = async () => {
    try {
      // const responseData = sampleData;
      const responseData = await getHeartRate();
      const serverHeartRateTimestamp = await getServerHeartRateData();
      const transformedHeartRateData = transformHeartRateData(responseData);
      const filteredHeartRateData = filterHeartRateData(
        transformedHeartRateData
      );

      console.log(JSON.stringify(filteredHeartRateData));

      const matchIndex = getIndexOfMatchTimestamp(
        serverHeartRateTimestamp,
        filteredHeartRateData
      );

      useChechCriticalHeartRate(
        filteredHeartRateData[filteredHeartRateData.length - 1].beatsPerMinute
      );

      // Check if index of match timestamp is the last index of the array
      if (matchIndex === filteredHeartRateData.length - 1) {
        return;
      }

      // Index of match timestamp not found, sending data to server directly
      if (matchIndex === -1) {
        for (const dataItem of filteredHeartRateData) {
          try {
            const response = await setElderHeartRateDetail({
              email: email,
              beatsPerMinute: dataItem.beatsPerMinute,
              timestamp: new Date(dataItem.time).toISOString(),
            });
            console.log(response);
          } catch (error) {
            console.log(error.message);
          }
        }
      }

      if (matchIndex > 0 && matchIndex < filteredHeartRateData.length - 1) {
        for (let i = matchIndex; i < filteredHeartRateData.length; i++) {
          try {
            const response = await setElderHeartRateDetail({
              email: email,
              beatsPerMinute: filteredHeartRateData[i].beatsPerMinute,
              timestamp: new Date(filteredHeartRateData[i].time).toISOString(),
            });
            console.log(response);
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const transformHeartRateData = (data: any) => {
    const { dataset } = data;
    const currentDate = new Date();
    const transformedData = dataset.map(({ time, value }) => {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      const localDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hours,
        minutes,
        seconds
      );
      if (localDate > currentDate) {
        localDate.setDate(currentDate.getDate() - 1);
      }

      const utcTime = localDate.toISOString();

      return {
        beatsPerMinute: value,
        time: utcTime,
      };
    });

    return transformedData;
  };

  const filterHeartRateData = (data: any) => {
    const filteredData = data.filter((item: any) => {
      const dateTime = new Date(item.time);
      const timeInMinutes = dateTime.getMinutes();
      return timeInMinutes % 5 === 0;
    });
    return filteredData;
  };

  const getIndexOfMatchTimestamp = (
    serverHeartRateDateTime: string,
    fitbitHeartRateData: any
  ) => {
    if (!serverHeartRateDateTime) {
      return -1;
    }
    for (let i = 0; i < fitbitHeartRateData.length; i++) {
      if (
        serverHeartRateDateTime ===
        new Date(fitbitHeartRateData[i].time).toISOString()
      ) {
        return i;
      }
    }
    return -1;
  };

  const getServerHeartRateData = async () => {
    const responseData = await getElderHeartRateDetail(email);
    if (responseData.latestHeartRateRecord.length === 0) {
      return;
    }

    return responseData.latestHeartRateRecord[0].timestamp;
  };
  const useChechCriticalHeartRate = (heartRate: number) => {
    if (
      heartRate > criticalHeartRateThreshold.maximum ||
      heartRate < criticalHeartRateThreshold.minimum
    ) {
      sendPushNotification();
      return;
    }

    return;
  };

  const sendPushNotification = () => {
    currentLocation().then((param_location) => {
      const payload = {
        location: {
          latitude: param_location.latitude,
          longitude: param_location.longitude,
        },
      };
      console.log("Critical Heart Rate Detected: ", email, payload);
      // criticalHeartRateNotification(email, token, payload);
    });
  };

  const currentDate = new Date();
  const currentTime = currentDate.getMinutes();
  if (currentTime % 2 !== 0) {
    console.log(
      "Background worker running...",
      currentDate.toLocaleTimeString()
    );
  }
  if (currentTime % 2 === 0) {
    console.log(
      "GETTING HEART RATE DATA FROM FITBIT:",
      currentDate.toLocaleTimeString()
    );
    getFitbitHeartRateData();
  }

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60, // seconds
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

export const useElderBackgroundWorker = (
  emailParam: string,
  profileTypeParam: any,
  tokenParam: any,
  getHeartRateParam: any
) => {
  email = emailParam;
  profileType = profileTypeParam;
  token = tokenParam;
  getHeartRate = getHeartRateParam;
  console.log("Background worker started...");
  init();
  return registerBackgroundFetchAsync();
};
