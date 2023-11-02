import HeartRateStack from "../screens/HeartRate/HeartRateStack";
import AccountStack from "../screens/Account/AccountStack";
import MovementStack from "../screens/Movement/MovementStack";
import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AnimatedTabBar from "../helpers/AnimatedTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// lottie
import Lottie from "lottie-react-native";
import curaTheme from "../theme/theme";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function TabAnimated() {
  return (
    <>
      <Tab.Navigator
        initialRouteName={"HeartRateStack"}
        tabBar={(props) => <AnimatedTabBar {...props} />}
      >
        <Tab.Screen
          name="MovementStack"
          component={MovementStack}
          options={{
            headerShown: false,
            tabBarLabel: "Movement",

            // MaterialCommunityIcons
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name={"walk"}
                size={40}
                color={curaTheme.lightColors.curaWhite}
              />
            ),
          }}
        />

        <Tab.Screen
          name="HeartRateStack"
          component={HeartRateStack}
          options={{
            headerShown: false,
            tabBarLabel: "Monitor", // Add this line for the label

            // MaterialCommunityIcons
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={"heart"}
                size={40}
                color={curaTheme.lightColors.curaWhite}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AccountStack"
          component={AccountStack}
          options={{
            headerShown: false,
            tabBarLabel: "Profile", // Add this line for the label

            // MaterialCommunityIcons
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={"account"}
                size={40}
                color={curaTheme.lightColors.curaWhite}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

// tabBarIcon: ({ ref }) => (
//   <Lottie
//     ref={ref}
//     loop={false}
//     source={require('../assets/lottie/settings.icon.json')}
//     style={styles.icon}
//   />
// ),
