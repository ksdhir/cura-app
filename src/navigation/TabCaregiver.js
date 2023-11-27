import HeartRateStack from "../screens/HeartRate/HeartRateStack";
import AccountStack from "../screens/Account/AccountStack";
import MovementStack from "../screens/Movement/MovementStack";
import React from "react";
import AnimatedTabBar from "../helpers/AnimatedTabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../assets/icons/svg/avatar.svg";
import Movement from "../assets/icons/svg/monitoring.svg";
import Monitoring from "../assets/icons/svg/heartrate.svg";

const Tab = createBottomTabNavigator();
const PROFILE_TYPE = "CAREGIVER";

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

            tabBarIcon: ({ color, size, focused }) => (
              <Movement
                width={34}
                height={34}
                style={{
                  color: "#fff",
                }}
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

            tabBarIcon: ({ color, size, focused }) => (
              <Monitoring
                width={34}
                height={34}
                style={{
                  color: "#fff",
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AccountStack"
          component={AccountStack}
          initialParams={{ profileType: "Caregiver" }}
          options={{
            headerShown: false,
            tabBarLabel: "Profile", // Add this line for the label

            // MaterialCommunityIcons
            tabBarIcon: ({ color, size, focused }) => (
              <Profile
                width={34}
                height={34}
                style={{
                  color: "#fff",
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
