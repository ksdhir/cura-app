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

const careGiver = true;

export default function TabAnimated() {
  const { user, profileType } = useAuth();
  const profile = profileType;

  return (
    <>
      <Tab.Navigator
        //if profileType === Elder, intialRouteName = MovementStack, if profile = Caregiver, initialRouteName = HeartRateStack

        initialRouteName={
          profile === "Caregiver" ? "HeartRateStack" : "MovementStack"
        }
        tabBar={(props) => <AnimatedTabBar {...props} />}
      >
        {/* if profileType === Elder, hide movement stack, if profile = Caregiver, show movement stack*/}

        {profile === "Caregiver" ? (
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
        ) : null}

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
