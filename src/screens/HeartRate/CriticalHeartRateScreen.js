import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import curaTheme from "../../theme/theme";
import { getAllNotificationLog } from "../../services/caregiver";
import { getElderHeartRateThreshold } from "../../services/elder";

export default function CriticalHeartRateScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [log, setLog] = useState([]);
  const [threshold, setThreshold] = useState({});

  const route = useRoute();

  const { bpm, staticEmail } = route.params;

  useEffect(() => {
    getAllNotificationLog(staticEmail).then((data) => {
      setLog(data);
      console.log(data);
    });

    getElderHeartRateThreshold(staticEmail).then((data) => {
      setThreshold(data);
      console.log(data);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-curaWhite px-4 space-y-4">
      <StatusBar style="auto" />
      <View className="w-full">
        <Text className="text-5xl font-bold">Critical Heart Rate</Text>
      </View>
      <View className="w-full justify-center  bg-primaryDark rounded-xl ">
        <Text className="text-xl text-curaWhite font-bold">
          Image placeholder
        </Text>
        <Text className="text-xl text-curaWhite font-bold">Min: {bpm}</Text>
        <Text className="text-xl text-curaWhite font-bold">Max: {bpm}</Text>
      </View>
      <View className="w-full flex-1 justify-center ">
        <Text className="text-xl text-curaBlack font-bold">History</Text>
      </View>
    </SafeAreaView>
  );
}
