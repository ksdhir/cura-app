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
          console.log("user is caregiver", email);
        } else {
          //Elder flow
          email = user.email;
          console.log("user is elder", email);
        }

        if (email !== "") {
          setElderEmail(email); // Update the state with the retrieved email
        }
      } catch (error) {
        throw new Error("Could not get elder profile");
      }
    };

    init();
  }, [user, userLoggedIn]); // Removed 'isLoaded' and 'elderEmail' from dependencies

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

      const today = new Date();
      const todayLog = [];
      const earlierLog = [];

      notificationLog?.notificationLog?.map((log) => {
        //if log timestamp is within 24 hours from current time, push to todayLog
        //other wise push to earlierLog

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
    }
  }, [elderEmail]);

  // const logTimestamp = notificationLog?.notificationLog[0]?.timestamp;
  // console.log("logTimestamp", logTimestamp);

  // const todayLogTimestamp = todayNotification[0]?.timestamp;
  // console.log("todayLogTimestamp", todayLogTimestamp);

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-curaWhite px-4 space-y-4">
      <StatusBar />
      <View className="w-full flex-row justify-between py-4">
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
        {loading ? (
          <LoadingSpinner /> // Display the loading spinner while data is being fetched
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full flex "
          >
            <Text className="text-lg text-curaBlack font-SatoshiBold pb-1 border-b border-b-curaGray/20">
              Today
            </Text>
            <View className="flex flex-col">
              {todayNotification?.map((log, index) => {
                return (
                  <View
                    key={index}
                    className="flex flex-row justify-between items-center w-full h-20 "
                  >
                    <View className="flex flex-col justify-center items-start">
                      <Text className="text-lg text-curaBlack font-SatoshiBold">
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
            <Text className="text-lg text-curaBlack font-SatoshiBold pt-4 pb-1 border-b border-b-curaGray/20">
              Earlier
            </Text>
            <View className="flex flex-col">
              {earlierNotification?.map((log, index) => {
                return (
                  <View
                    key={index}
                    className="flex flex-row justify-between items-center w-full h-20 "
                  >
                    <View className="flex flex-col justify-center items-start">
                      <Text className="text-lg text-curaBlack font-SatoshiBold">
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
        )}
      </View>
    </SafeAreaView>
  );
}
