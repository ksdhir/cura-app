import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/SignUpScreen";
import Login from "../screens/LogInScreen";
import Welcome from "../screens/WelcomeScreen";
import TestGoogleHealth from "../screens/HeartRate/GoogleHealthScreen";
import ProfileTypeSelection from "../screens/Signup/ProfileTypeSelection";
import ElderProfileSetup from "../screens/Signup/ElderProfileSetup";
import ProfileSetupSuccess from "../screens/Signup/ProfileSetupSuccess";
import TabNavigator from "./TabNavigator";
import CaregiverProfileSetup from "../screens/Signup/CaregiverProfileSetup";

// Animated Tab Bar
import TabAnimated from "./TabAnimated";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import HistoryNotification from "../screens/Notifcation/HistoryNotification";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();
  const { user, profileType } = useAuth();

  if (user) {
    if (!profileType) {
      navigation.navigate("ProfileTypeSetup");
    } else {
      navigation.navigate("Home");
    }
  }

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={TabAnimated}
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
        name="CaregiverProfileSetup"
        component={CaregiverProfileSetup}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="NotificationHistory"
        component={HistoryNotification}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
