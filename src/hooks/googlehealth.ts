import {
  initialize,
  requestPermission,
  getGrantedPermissions,
  readRecords,
} from "react-native-health-connect";
import { Permission } from "react-native-health-connect/lib/typescript/types";
import { TimeRangeFilter } from "react-native-health-connect/lib/typescript/types/base.types";

import {
  getElderHeartRateDetail,
  setElderHeartRateDetail,
} from "../services/elder";

export const getHealthData = (email: string) => {
  const userEmail = email;

  const init = async () => {

    try {
      // initialize the client
      const isInitialized = await initialize();
      if (!isInitialized) {
        console.error("Failed to initialize Health Connect");
        return;
      }

      // Permission Request
      const grantedPermissions = await requestPermission([
        { accessType: "read", recordType: "HeartRate" },
      ]);

      if (hasAndroidPermission(grantedPermissions, "HeartRate")) {
        const googleHeartRateData = await getGoogleHeartRateData();
        const serverLatestHeartRateData = await getElderHeartRateDetail(
          userEmail
        );

        console.log("@@googleHeartRateData: ", googleHeartRateData);

        if (serverLatestHeartRateData.latestHeartRateRecord.length > 0) {
          const serverHeartRateTime = new Date(
            serverLatestHeartRateData.latestHeartRateRecord[0].timestamp
          ).toISOString();

          const indexOfMatchTimestamp = getIndexOfMatchTimestamp(
            serverHeartRateTime,
            googleHeartRateData
          );

          if (indexOfMatchTimestamp === -1) {
            // No match timestamp found, sending data to server directly
            googleHeartRateData.forEach(async (heartRate) => {
              const response = setElderHeartRateDetail({
                email: userEmail,
                beatsPerMinute: heartRate.beatsPerMinute,
                timestamp: new Date(heartRate.time).toISOString(),
              });
            });
            return;
          }

          // Check if index of match timestamp is the last index of the array
          if (indexOfMatchTimestamp === googleHeartRateData.length - 1) {
            return;
          }

          // Match timestamp found, loop through the data starting from the matched timestamp
          for (
            let i = indexOfMatchTimestamp;
            i < googleHeartRateData.length;
            i++
          ) {
            const response = setElderHeartRateDetail({
              email: userEmail,
              beatsPerMinute: googleHeartRateData[i].beatsPerMinute,
              timestamp: new Date(googleHeartRateData[i].time).toISOString(),
            });
          }
        }

        if (serverLatestHeartRateData.latestHeartRateRecord.length === 0) {
          googleHeartRateData.forEach(async (heartRate) => {
            const response = setElderHeartRateDetail({
              email: userEmail,
              beatsPerMinute: heartRate.beatsPerMinute,
              timestamp: new Date(heartRate.time).toISOString(),
            });
          });
        }
      } else {
        throw new Error("Permission not granted");
      }
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  const hasAndroidPermission = (
    permissions: Permission[],
    recordType: string
  ) => {
    const permission = permissions.find((p) => p.recordType === recordType);
    return !!permission;
  };

  const getGoogleHeartRateData = async () => {
    const today = new Date();
    const timeRangeFilter: TimeRangeFilter = {
      operator: "between",
      startTime: new Date(
        today.getTime() - 1000 * 60 * 60 * 24 * 7
      ).toISOString(),
      endTime: today.toISOString(),
    };

    // Heart Rate
    const response = await readRecords("HeartRate", { timeRangeFilter });
    const responseHeartRates = response
      .map((heartRate) => heartRate.samples)
      .flat();

    const filteredHeartRates = responseHeartRates.filter((item) => {
      const time = new Date(item.time);
      const timeInMinute = time.getMinutes();

      return timeInMinute % 10 === 0;
    });

    return filteredHeartRates;
  };

  const getIndexOfMatchTimestamp = (serverTime: string, googleTime: any) => {
    for (let i = 0; i < googleTime.length; i++) {
      if (serverTime === new Date(googleTime[i].time).toISOString()) {
        return i;
      }
    }
    return -1;
  };

  init();
};
