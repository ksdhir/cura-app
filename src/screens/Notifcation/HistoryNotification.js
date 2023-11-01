import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryNotification() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex flex-1 bg-curaWhite">
      <StatusBar style="auto" />

      <View className="flex w-full flex-1 justify-center items-center space-y-4">
        <Text className="text-2xl text-neutral-800 font-bold mt-4">
          Notification Notification Screen
        </Text>
      </View>
    </SafeAreaView>
  );
}
