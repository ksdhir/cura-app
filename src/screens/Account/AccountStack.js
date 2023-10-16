import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountMainScreen from "./AccountMainScreen";

export default function AccountStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountMainScreen"
        component={AccountMainScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
