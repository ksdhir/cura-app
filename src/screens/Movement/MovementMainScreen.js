import { View, Text, TextInput, Button, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SquircleView } from "react-native-figma-squircle";
import { useNavigation } from "@react-navigation/native";

export default function MovementMainScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-curaWhite ">
      <StatusBar style="auto" />
      <View className="w-full flex-1 justify-center px-8">
        <Text className="text-2xl text-neutral-800 font-bold">
          Movement Main Screen
        </Text>
      </View>
      <View className=" h-[75vh] w-full p-8 flex items-center justify-center rounded-tl-[120px] space-y-8">
        <Text
          className="text-2xl text-neutral-800 font-bold"
          onPress={() => {
            navigation.navigate("MovementHistoryScreen");
          }}
        >
          Go To Movement History Screen
        </Text>
      </View>
    </View>
  );
}
