import { useEffect, useState } from "react";
import {
  initialize,
  requestPermission,
  readRecords,
} from "react-native-health-connect";
import { Permission } from "react-native-health-connect/lib/typescript/types";
import { TimeRangeFilter } from "react-native-health-connect/lib/typescript/types/base.types";

import {
  getElderHeartRateDetail,
  setElderHeartRateDetail,
} from "../services/elder";
import { auth } from "../utils/FirebaseConfig";
import { server } from "../../metro.config";

export const getHealthData = () => {
  const userEmail = auth?.currentUser?.email;

  const init = async () => {
    try {
      // initialize the client
      const isInitialized = await initialize();
      if (!isInitialized) {
        console.log("Failed to initialize Health Connect");
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

        if (serverLatestHeartRateData.latestHeartRateRecord.length > 0) {
          console.log("Heart rate data found in the server");
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
            console.log("No new heart rate data found in google health");
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
            console.log(response);
          }
        }
        2;
        if (serverLatestHeartRateData.latestHeartRateRecord.length === 0) {
          console.log(
            "No heart rate data found in the server, sending data to server directly"
          );
          googleHeartRateData.forEach(async (heartRate) => {
            const response = setElderHeartRateDetail({
              email: userEmail,
              beatsPerMinute: heartRate.beatsPerMinute,
              timestamp: new Date(heartRate.time).toISOString(),
            });
            console.log(response);
          });
        }
      } else {
        throw new Error("Permission not granted");
      }
    } catch (error) {
      console.log(error.message);
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
      startTime: new Date(today.getTime() - 1000 * 60 * 60 * 24).toISOString(),
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
