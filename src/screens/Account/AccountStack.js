import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountMainScreen from "./AccountMainScreen";
import HeartRateThresholdScreen from "./HeartRateThresholdScreen";
import FallDetectionScreen from "./FallDetectionScreen";
import PushNotificationScreen from "./PushNotificationScreen";
import CaregiverProfile from "../Profile/CaregiverProfile";
import ElderProfile from "../Profile/ElderProfile";
import MovementStack from "../Movement/MovementStack";

// Fall Detection Screens
import ElderFallDetectedScreen from "./ElderFallDetectedScreen.jsx";
import ElderFallConfirmationScreen from "./ElderFallConfirmationScreen.jsx";
import ProfileEmergencyContacts from "../Profile/EmergencyContacts";
import DemoScreen from "./DemoScreen";

export default function AccountStack(props) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountMainScreen"
        component={AccountMainScreen}
        initialParams={{ profileType: props.route.params.profileType }}
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

      <Stack.Screen
        options={{ headerShown: false }}
        name="CaregiverProfile"
        component={CaregiverProfile}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ElderProfile"
        component={ElderProfile}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ProfileEmergencyContacts"
        component={ProfileEmergencyContacts}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ElderFallDetectedScreen"
        component={ElderFallDetectedScreen}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="DemoScreen"
        component={DemoScreen}
      />
    </Stack.Navigator>
  );
}
