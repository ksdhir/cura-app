import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/HomeScreen";
import SignUp from "../screens/SignUpScreen";
import Login from "../screens/LogInScreen";
import Welcome from "../screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUp}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
export default AppNavigator;
