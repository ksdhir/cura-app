import { View, Text } from "react-native";
import React from "react";
import HeartRateMainScreen from "./HeartRateMainScreen";
import HeartRateHistoryScreen from "./HeartRateHistoryScreen";
import GoogleHealthScreen from "./GoogleHealthScreen";
import CriticalHeartRateScreen from "./CriticalHeartRateScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { getHealthData } from "../../services/googlehealth";

export default function HeartRateStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HeartRateMainScreen"
        component={HeartRateMainScreen}
        options={{ headerShown: false }}
      >
        {getHealthData()}
      </Stack.Screen>
      <Stack.Screen
        name="GoogleHealthScreen"
        component={GoogleHealthScreen}
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
