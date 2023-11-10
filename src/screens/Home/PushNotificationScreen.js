import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Constants from "expo-constants";
// services function
import { saveNotificationToken } from "../../services/caregiver";
import { testPushNotification } from "../../services/elder";

// set push notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// a dummy push notification

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 1 },
  });
}

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

export default function PushNotificationScreen() {
  const navigation = useNavigation();

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  console.clear();
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        setExpoPushToken(token);
        return token;
      })
      .then((token) => {
        saveNotificationToken(token.data);
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <></>
    // <View style={styles.container}>
    //   <Text style={styles.text}>Test Push Notifications:</Text>
    //   <Text>expoPushToken: {JSON.stringify(expoPushToken)}</Text>
    //   <View style={{ alignItems: "center", justifyContent: "center" }}>
    //     <Text>
    //       Title: {notification && notification.request.content.title}{" "}
    //     </Text>
    //     <Text>Body: {notification && notification.request.content.body}</Text>
    //     <Text>
    //       Data:{" "}
    //       {notification && JSON.stringify(notification.request.content.data)}
    //     </Text>
    //   </View>

    //   {/* Self Notification Scheduler */}
    //   {/* <Button
    //     title="Press to schedule a notification"
    //     onPress={async () => {
    //       await schedulePushNotification();
    //     }}
    //   /> */}

    //   <View className="mt-2">
    //     <Button
    //       title="Press to Notify Caregiver"
    //       onPress={async () => {
    //         await testPushNotification();
    //       }}
    //     />
    //   </View>

    //   <View className="flex-col justify-center items-center w-full p-8 space-y-3">
    //     <TouchableOpacity
    //       className="w-full bg-slate-300 p-4 rounded-lg flex justify-center items-center "
    //       onPress={() => navigation.navigate("HomeScreen")}
    //     >
    //       <Text className=" text-slate-800 text-base font-SatoshiBold">
    //         Go Back To Home
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
