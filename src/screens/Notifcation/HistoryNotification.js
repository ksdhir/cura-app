import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryNotification() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 justify-center px-4 bg-curaWhite">
      <StatusBar style="auto" />
      {/* <Header /> */}
      <View className="w-full">
        <Text className="text-5xl font-SatoshiBold">Notifications</Text>
      </View>
      <View className="w-full flex-row justify-between py-4">
        <Text className="text-2xl text-curaBlack font-SatoshiBold mt-4">
          Notifications
        </Text>
      </View>
    </SafeAreaView>
  );
}
