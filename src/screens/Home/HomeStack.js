import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import AccelScreen from "./AccelScreen";
import GyroScreen from "./GyroScreen";
import PushNotificationScreen from "./PushNotificationScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function HomeStack() {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccelScreen"
        component={AccelScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GyroScreen"
        component={GyroScreen}
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
