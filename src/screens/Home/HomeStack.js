import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import PushNotificationScreen from "./PushNotificationScreen";

export default function HomeStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: "push",
        animation: "slide_from_bottom",
        animationDurationForReplace: 2000,
        presentation: "card",
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
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
