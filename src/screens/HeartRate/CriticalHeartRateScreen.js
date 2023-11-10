import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import curaTheme from "../../theme/theme";
import { getAllNotificationLog } from "../../services/caregiver";
import { formatDateTime } from "../../helpers";
import Header from "../../components/layouts/Header";
import IconBtn from "../../components/IconBtn";
import PolyUp from "../../assets/icons/svg/polygonup.svg";
import PolyDown from "../../assets/icons/svg/polygondown.svg";

export default function CriticalHeartRateScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [log, setLog] = useState([]);

  const route = useRoute();

  const { bpm, elderEmail, minThreshold, maxThreshold } = route.params;

  useEffect(() => {
    getAllNotificationLog(elderEmail).then((data) => {
      setLog(data);
    });
  }, []);

  
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-curaWhite px-4 space-y-4">
      <StatusBar style="auto" />
      <Header />

      <View className="w-full">
        <Text className="text-5xl font-SatoshiBold">Critical Heart Rate</Text>
      </View>
      <View className="w-full justify-center px-2 py-4 bg-primaryDark rounded-xl ">
        <Text className="text-xl text-curaWhite ">Image placeholder</Text>
        <Text className="text-lg text-curaWhite ">Min: {minThreshold}</Text>
        <Text className="text-lg text-curaWhite ">Max: {maxThreshold}</Text>
      </View>
      <View className="w-full flex-1 justify-center ">
        <Text className="text-xl text-curaBlack ">History</Text>
        <ScrollView className="w-full flex ">
          <View className="flex flex-1 flex-col space-y-4">
            {log && log.notificationLog && log.notificationLog.length > 0 ? (
              log.notificationLog.map((logItem, index) => (
                <View
                  key={logItem.id}
                  className=" px-2 py-4 bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60 justify-center rounded-xl"
                >
                  <Text>{index + 1}</Text>
                  <Text>{formatDateTime(logItem.timestamp)}</Text>
                  <Text>{logItem.type}</Text>
                </View>
              ))
            ) : (
              <Text>No log data available</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
