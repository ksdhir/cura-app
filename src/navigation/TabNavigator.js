import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeStack from "../screens/Home/HomeStack";
import HeartRateStack from "../screens/HeartRate/HeartRateStack";
import AccountStack from "../screens/Account/AccountStack";
import MovementStack from "../screens/Movement/MovementStack";

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#27272a",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          height: 65,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 25,
          shadowOpacity: 6,
          shadowOffset: {
            height: 8,
          },
          shadowRadius: 8,
          position: "absolute" /*This is for android*/,
          borderRadius: 25,
          marginBottom: 20,
          marginLeft: 20,
          marginRight: 20,
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
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
          tabBarLabel: "Heart Rate",
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
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
