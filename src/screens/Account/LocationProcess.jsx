// core packages imports
import React, { useState, useEffect, useRef } from "react";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

// functionality imports
import AsyncStorage from "@react-native-async-storage/async-storage";
import radiusBetweenCoords from "../../utils/radiusBetweenCoords";

// api imports
import { getElderProfile } from "../../services/elder";
import { movementPushNotification } from "../../services/elder";

// Define task name
const LOCATION_TASK_NAME = "background-location-task";

const requestPermissions = async () => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === "granted") {
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.BestForNavigation, // accuracy: Location.Accuracy.Balanced,
        timeInterval: 1000 * 60 * 20, // 20 minutes
        distanceInterval: 0,
        showsBackgroundLocationIndicator: true,
      });
    }
  }
};

// Define Task manager
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;
    const { latitude, longitude } = locations[0].coords;

    const currentLocation = { latitude, longitude };
    console.log(currentLocation, "from location process")

    // from async storage get home coordinates
    AsyncStorage.getItem("homeCoordinates").then((data) => {
      const homeCoordinates = JSON.parse(data);
      locationLiveDetectionProcess(homeCoordinates, currentLocation);
    });
  }
});

const minimumDistance = 0.3; // 300 meters

function locationLiveDetectionProcess(homeCoordinates, currentLocation) {
  // compute radius first
  const radius = radiusBetweenCoords(
    homeCoordinates.latitude,
    homeCoordinates.longitude,
    currentLocation.latitude,
    currentLocation.longitude
  );
  if (radius > minimumDistance) {
    // TODO add token
    AsyncStorage.setItem("isPreviousHome", "false").then(() => {
      movementPushNotification(
        homeCoordinates.elderEmail,
        currentLocation.latitude,
        currentLocation.longitude
      );
    });
  } else {
    
    // is User back home? Send Notifcation of Home but only Once

    AsyncStorage.getItem("isPreviousHome").then((data) => {
      if (data == null || data == "false") {
        // user was not home previously
        AsyncStorage.setItem("isPreviousHome", "true").then(() => {
          movementPushNotification(
            homeCoordinates.elderEmail,
            homeCoordinates.latitude,
            homeCoordinates.longitude
          );
        });
      }
    });
  }
}

export default function LocationProcess({ userEmail }) {
  const [runOnce, setRunOnce] = useState(false);
  const elderEmail = userEmail;

  useEffect(() => {
    if (!runOnce) {
      setRunOnce(true);

      getElderProfile(elderEmail)
        .then((data) => {
          const profile = data.profile;
          const latitude = profile.defaultLocation.latitude ?? 49.229033;
          const longitude = profile.defaultLocation.longitude ?? -123.0691669;


          const homeCoordinates = { latitude, longitude, elderEmail };
          const stringify = JSON.stringify(homeCoordinates);
          return AsyncStorage.setItem("homeCoordinates", stringify);
        })
        .then((data) => {
          requestPermissions();
        });
    }
  }, []);
}
