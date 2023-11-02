import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountMainScreen from "./AccountMainScreen";
import GoogleHealthScreen from "../HeartRate/GoogleHealthScreen";
import HeartRateThresholdScreen from "./HeartRateThresholdScreen";
import FallDetectionScreen from "./FallDetectionScreen";
import PushNotificationScreen from "./PushNotificationScreen";

export default function AccountStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountMainScreen"
        component={AccountMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GoogleHealthScreen"
        component={GoogleHealthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HeartRateThresholdScreen"
        component={HeartRateThresholdScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FallDetectionScreen"
        component={FallDetectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PushNotificationScreen"
        component={PushNotificationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
