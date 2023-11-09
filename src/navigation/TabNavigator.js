import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HeartRateStack from "../screens/HeartRate/HeartRateStack";
import AccountStack from "../screens/Account/AccountStack";
import MovementStack from "../screens/Movement/MovementStack";
import curaTheme from "../theme/theme";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="HeartRateStack"
      screenOptions={{
        tabBarActiveTintColor: curaTheme.lightColors.curaWhite,
        tabBarInactiveTintColor: curaTheme.lightColors.primaryDark,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          height: 80,
          paddingTop: 10,
          paddingBottom: 15,
          backgroundColor: curaTheme.lightColors.primary,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="MovementStack"
        component={MovementStack}
        options={{
          headerShown: false,
          tabBarLabel: "Movement",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pin" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="HeartRateStack"
        component={HeartRateStack}
        options={{
          headerShown: false,
          tabBarLabel: "Monitor",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: "Misc",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="menu" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
