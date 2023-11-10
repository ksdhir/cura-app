import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "../screens/SignUpScreen";
import Login from "../screens/LogInScreen";
import ProfileTypeSelection from "../screens/Signup/ProfileTypeSelection";
import ElderProfileSetup from "../screens/Signup/ElderProfileSetup";
import ProfileSetupSuccess from "../screens/Signup/ProfileSetupSuccess";
import CaregiverProfileSetup from "../screens/Signup/CaregiverProfileSetup";

// Animated Tab Bar
import TabAnimated from "./TabAnimated";
import TabElder from "./TabElder";
import TabCaregiver from "./TabCaregiver";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import HistoryNotification from "../screens/Notifcation/HistoryNotification";
import { useEffect, useState } from "react";

import { getHealthData } from "../hooks/googlehealth";
import { useFallDetectionChecker } from "../hooks/falldetection";
import { backgroundsync } from "../services/backgroundsync";

// notification permission
import PushNotificationScreen from "../screens/Account/PushNotificationScreen";
import LocationProcess from "../screens/Account/LocationProcess";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();
  const { user, profileType, token, isLoaded } = useAuth();
  const [fallDetectionChecker, setFallDetectionChecker] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!profileType) {
      navigation.navigate("ProfileTypeSetup");
    } else {
      navigation.navigate("Home");
    }
  }, [user, profileType, isLoaded]);

  // return <PushNotificationScreen />

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user && profileType === "Elder") {
      getHealthData(user.email);
      setFallDetectionChecker(useFallDetectionChecker(user.email, token));
    }

    if (user) {
      backgroundsync(user.email);
    }
  }, [user]);

  // ========================> PERMISSIONS FOR ALL USERS (ELDER AND CAREGIVER)
  const [askNotifcationPermission, setAskNotifcationPermission] =
    useState(false);
  const [askLocationPermission, setAskLocationPermission] = useState(false); // [true, false, false]
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user && profileType === "Elder") {
      // elder permissions

      // call user profile function

      setUserEmail(user.email);
      setAskLocationPermission(true);
    } else if (user && profileType === "Caregiver") {
      setUserEmail(user.email);
      setAskNotifcationPermission(true);
    }
  }, [user]);

  // ========================> PERMISSIONS FOR ALL USERS (ELDER AND CAREGIVER) ENDS HERE

  return (
    <>
      {askLocationPermission && <LocationProcess userEmail={userEmail} />}
      {askNotifcationPermission && (
        <PushNotificationScreen userEmail={userEmail} />
      )}
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          //if profileType === Elder, component = TabElder, if profile = Caregiver, component = TabCaregiver
          component={profileType === "Elder" ? TabElder : TabCaregiver}
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
    </>
  );
};
export default AppNavigator;
