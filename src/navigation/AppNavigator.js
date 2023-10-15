import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/HomeScreen";
import SignUp from "../screens/SignUpScreen";
import Login from "../screens/LogInScreen";
import Welcome from "../screens/WelcomeScreen";
import Test from "../screens/TestScreen";
import Test2 from "../screens/TestScreen2";
import TestGoogleHealth from "../screens/TestGoogleHealth";
import ProfileTypeSelection from "../screens/Signup/ProfileTypeSelection";
import ElderProfileSetup from "../screens/Signup/ElderProfileSetup";
import ProfileSetupSuccess from "../screens/Signup/ProfileSetupSuccess";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
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
        name="TestAccelerometer"
        component={Test}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TestGyro"
        component={Test2}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TestGoogleHealth"
        component={TestGoogleHealth}
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
    </Stack.Navigator>
  );
};
export default AppNavigator;
