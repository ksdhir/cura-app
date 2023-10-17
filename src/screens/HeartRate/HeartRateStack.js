import { View, Text } from "react-native";
import React from "react";
import HeartRateMainScreen from "./HeartRateMainScreen";
import HeartRateHistoryScreen from "./HeartRateHistoryScreen";
import GoogleHealthScreen from "./GoogleHealthScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function HeartRateStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HeartRateMainScreen"
        component={HeartRateMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GoogleHealthScreen"
        component={GoogleHealthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HeartRateHistory"
        component={HeartRateHistoryScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
