import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getElderEmailFromCaregiverEmail } from "../../services/elder";
import IconBtn from "../../components/IconBtn";
import curaTheme from "../../theme/theme";
import ScreenTitle from "../../components/layouts/ScreenTitle";
import { getAllNotificationLog } from "../../services/caregiver";
import { timeDifference } from "../../helpers";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

export default function HistoryNotification() {
  const navigation = useNavigation();
  const [notificationLog, setNotificationLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [elderEmail, setElderEmail] = useState("");
  const [todayNotification, setTodayNotification] = useState([]);
  const [earlierNotification, setEarlierNotification] = useState([]);

  const { user, profileType } = useAuth();
  const userLoggedIn = profileType;

  useEffect(() => {
    if (!user) return;
    const caregiverEmail = user.email;

    const init = async () => {
      try {
        let email = ""; // Declare a variable to hold the email
        if (userLoggedIn === "Caregiver") {
          const data = await getElderEmailFromCaregiverEmail(caregiverEmail);
          email = data.caregiver?.elderEmails[0];
          // console.log("user is caregiver", email);
        } else {
          //Elder flow
          email = user.email;
          // console.log("user is elder", email);
        }

        if (email !== "") {
          setElderEmail(email); // Update the state with the retrieved email
        }
      } catch (error) {
        throw new Error("Could not get elder profile");
      }
    };

    init();
  }, [user, userLoggedIn]);

  useEffect(() => {
    // Fetch notification logs when 'elderEmail' changes
    if (elderEmail !== "") {
      const fetchNotificationLogs = async () => {
        try {
          const data = await getAllNotificationLog(elderEmail, "ALL");
          setNotificationLog(data);
          setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
          console.error("Error fetching notification logs:", error);
          setLoading(false); // Set loading to false in case of an error
        }
      };

      fetchNotificationLogs();
    }
  }, [elderEmail]);

  useEffect(() => {
    // Logic for categorizing logs into today and earlier
    const today = new Date();
    const todayLog = [];
    const earlierLog = [];

    notificationLog?.notificationLog?.forEach((log) => {
      if (
        new Date(log.timestamp) >=
        new Date(today.getTime() - 24 * 60 * 60 * 1000)
      ) {
        todayLog.push(log);
      } else {
        earlierLog.push(log);
      }
    });

    setTodayNotification(todayLog);
    setEarlierNotification(earlierLog);
  }, [notificationLog]);

  if (loading) {
    return (
      <View className="w-full flex-1 items-center justify-center bg-curaWhite border pb-[80px]">
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-curaWhite px-4 space-y-4">
      <StatusBar />
      <View className="w-full flex-row justify-between pb-4">
        <IconBtn
          name="back"
          onPress={() => navigation.goBack()}
          iconStyle={{
            color: curaTheme.lightColors.primary,
          }}
        />
      </View>

      <ScreenTitle title="Notifications" />

      <View className="w-full flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="w-full flex "
        >
          <Text className="text-lg text-curaBlack font-SatoshiMedium pb-4">
            Today
          </Text>
          <View className="flex w-full flex-col space-y-4">
            {todayNotification?.map((log, index) => {
              return (
                <View
                  key={index}
                  className="flex flex-row py-4 space-x-2 items-center bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60  rounded-xl"
                >
                  <IconBtn
                    name={
                      log.type === "MOVEMENT_LOCATION"
                        ? "elderFarFromHome"
                        : log.type === "CRITICAL_HEART_RATE"
                        ? "criticalHeartrate"
                        : "fallDetected"
                    }
                    iconStyle={{
                      color: curaTheme.lightColors.error,
                      marginHorizontal: 24,
                    }}
                    height={32}
                    width={32}
                  />
                  <View className="pr-24">
                    <Text className="text-lg text-curaBlack font-SatoshiBold">
                      {log.type === "MOVEMENT_LOCATION"
                        ? "Elder is far from home."
                        : log.type === "CRITICAL_HEART_RATE"
                        ? "Heart rate is abnormal."
                        : "Fall detected."}
                    </Text>
                    <Text className="text-xs font-SatoshiMedium text-curaGray">
                      {timeDifference(log.timestamp)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <Text className="mt-8 text-lg text-curaBlack font-SatoshiMedium pb-4">
            Earlier
          </Text>
          <View className="flex w-full flex-col space-y-4">
            {earlierNotification?.map((log, index) => {
              return (
                <View
                  key={index}
                  className="flex flex-row py-4 space-x-2 items-center bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60  rounded-xl"
                >
                  <IconBtn
                    name={
                      log.type === "MOVEMENT_LOCATION"
                        ? "elderFarFromHome"
                        : log.type === "CRITICAL_HEART_RATE"
                        ? "criticalHeartrate"
                        : "fallDetected"
                    }
                    iconStyle={{
                      color: curaTheme.lightColors.error,
                      marginHorizontal: 24,
                    }}
                    height={32}
                    width={32}
                  />
                  <View className="pr-24">
                    <Text className="text-lg  text-curaBlack font-SatoshiBold">
                      {log.type === "MOVEMENT_LOCATION"
                        ? "Elder is far from home."
                        : log.type === "CRITICAL_HEART_RATE"
                        ? "Heart rate is abnormal."
                        : "Fall detected."}
                    </Text>
                    <Text className="text-sm text-curaGrey">
                      {timeDifference(log.timestamp)}
                    </Text>
                  </View>
                  <View className="flex flex-col justify-center items-end">
                    <Text className="text-lg text-curaBlack font-SatoshiBold">
                      {log.message}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// <IconBtn
//   name="bell"
//   onPress={() => navigation.navigate("NotificationHistory")}
//   iconStyle={{
//     color: curaTheme.lightColors.primary,
//   }}
// />;
