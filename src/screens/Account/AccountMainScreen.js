import { View, Text, TextInput, Button, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SquircleView } from "react-native-figma-squircle";
import { useNavigation } from "@react-navigation/native";

export default function AccountMainScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-curawhite ">
      <StatusBar style="auto" />
      <View className="w-full flex-1 justify-center px-8">
        <Text className="text-2xl text-neutral-800 font-bold">
          Account Main Screen
        </Text>
      </View>
    </View>
  );
}
