import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovementMainScreen from "./MovementMainScreen";
import MovementHistoryScreen from "./MovementHistoryScreen";

export default function MovementStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MovementMainScreen"
        component={MovementMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovementHistoryScreen"
        component={MovementHistoryScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
