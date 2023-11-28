import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Constants from "expo-constants";
// services function
import { saveNotificationToken } from "../../services/caregiver";

// set push notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = await Notifications.getExpoPushTokenAsync({
      projectId:
        Constants.default.easConfig.projectId ??
        Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default function PushNotificationScreen({ userEmail }) {
  const navigation = useNavigation();

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        return token;
      })
      .then((token) => {
        saveNotificationToken(token.data, userEmail);
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const { payload, type, elderEmail, elderName, elderPhoneNumber } =
          notification.request.content.data;

        if (type == "MOVEMENT_LOCATION") {
          // navigation.navigate("MovementStack", {
          //   screen: "MovementMainScreen",
          // });
        } else if (type == "FALL_DETECTED") {
          navigation.navigate("AccountStack", {
            screen: "ElderFallDetectedScreen",
            params: {
              elderPhoneNumber,
              elderName,
              location: payload?.location,
            },
          });
        } else if (type == "CRITICAL_HEART_RATE") {
          // navigation.navigate("HeartRateStack", {
          //   screen: "CriticalHeartRateScreen",
          //   params: {
          //     elderEmail: elderEmail,
          //     minThreshold: payload.currentMinHeartRate,
          //     maxThreshold: payload.currentMaxHeartRate,
          //   },
          // });
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { payload, type, elderEmail, elderName, elderPhoneNumber } =
          response.notification.request.content.data;

        if (type == "MOVEMENT_LOCATION") {
          navigation.navigate("MovementStack", {
            screen: "MovementMainScreen",
          });
        } else if (type == "FALL_DETECTED") {
          navigation.navigate("AccountStack", {
            screen: "ElderFallDetectedScreen",
            params: { elderPhoneNumber, elderName, location: payload.location },
          });
        } else if (type == "CRITICAL_HEART_RATE") {
          navigation.navigate("HeartRateStack", {
            screen: "CriticalHeartRateScreen",
            params: {
              elderEmail: elderEmail,
              minThreshold: payload.currentMinHeartRate,
              maxThreshold: payload.currentMaxHeartRate,
            },
          });
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <></>;
}
