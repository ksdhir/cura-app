import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import SignUp from "../screens/SignUpScreen";
import Login from "../screens/LogInScreen";
import Welcome from "../screens/WelcomeScreen";
import Test from "../screens/Home/AccelScreen";
import Test2 from "../screens/Home/GyroScreen";
import TestGoogleHealth from "../screens/HeartRate/GoogleHealthScreen";
import ProfileTypeSelection from "../screens/Signup/ProfileTypeSelection";
import ElderProfileSetup from "../screens/Signup/ElderProfileSetup";
import ProfileSetupSuccess from "../screens/Signup/ProfileSetupSuccess";
import CaregiveProfileSetup from "../screens/Signup/CaregiverProfileSetup";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={TabNavigator}
      />
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

      <Stack.Screen
        options={{ headerShown: false }}
        name="ProfileTypeSetup"
        component={ProfileTypeSelection}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ElderProfileSetup"
        component={ElderProfileSetup}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ProfileSetupSuccess"
        component={ProfileSetupSuccess}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="CaregiveProfileSetup"
        component={CaregiveProfileSetup}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
