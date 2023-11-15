import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconBtn from "../../components/IconBtn";
import curaTheme from "../../theme/theme";
import ScreenTitle from "../../components/layouts/ScreenTitle";
import { getAllNotificationLog } from "../../services/caregiver";
import { timeDifference } from "../../helpers";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function HistoryNotification() {
  const navigation = useNavigation();
  const [notificationLog, setNotificationLog] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();

  const { elderEmail } = route.params;

  useEffect(() => {
    const fetchNotificationLogs = async () => {
      try {
        const data = await getAllNotificationLog(elderEmail, "ALL");
        setNotificationLog(data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching notification logs:", error);
        // Handle the error appropriately, e.g., show a user-friendly message.
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchNotificationLogs();
  }, [elderEmail]);

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
            <View className="flex flex-1 flex-col space-y-4">
              {notificationLog?.notificationLog?.map((log, index) => {
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
