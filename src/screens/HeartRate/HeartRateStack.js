import { View, Text } from "react-native";
import React from "react";
import HeartRateMainScreen from "./HeartRateMainScreen";
import HeartRateHistoryScreen from "./HeartRateHistoryScreen";
import CriticalHeartRateScreen from "./CriticalHeartRateScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function HeartRateStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="HeartRateMainScreen">
      <Stack.Screen
        name="HeartRateMainScreen"
        component={HeartRateMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HeartRateHistoryScreen"
        component={HeartRateHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CriticalHeartRateScreen"
        component={CriticalHeartRateScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
