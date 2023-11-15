import { useEffect, useState, useCallback } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Linking from "expo-linking";

import useAuth from "../../hooks/useAuth";
import Header from "../../components/layouts/Header";
import ImgFallDetected from "../../assets/images/fall-detected.svg";
import {
  fallDetectedPushNotification,
  getElderProfile,
} from "../../services/elder";
import currentLocation from "../../utils/getCurrentLocation";

const ElderFallDetectedScreen = ({ route }) => {
  const { user, token } = useAuth();
  const { userDetail, setUserDetail } = useState();
  const navigation = useNavigation();
  const [key, setKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if (!user) return;

      // Push Notification when loaded
      sendPushNotification();

      // Screen Clean up
      return () => {
        // Code to run when the screen is unfocused (cleanup)
        resetComponent();
      };
    }, [user]) // Dependencies array
  );

  const resetComponent = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const sendPushNotification = () => {
    currentLocation().then((param_location) => {
      const payload = {
        location: {
          latitude: param_location.latitude,
          longitude: param_location.longitude,
        },
      };
      console.log("Fall Detected: ", user.email, payload);
      // fallDetectedPushNotification(user.email, token, payload);
    });
  };

  const handleOKTouchable = () => {
    navigation.goBack();
    // navigation.navigate("Home", { screen: "HeartRateStack" });
  };
  const handleCallTouchable = () => {
    Linking.openURL(`tel:${+1234567890}`);
    navigation.goBack();
    // navigation.navigate("Home", { screen: "HeartRateStack" });
  };

  const handleComplete = () => {
    // Send Push Notification to caregiver before calling
    sendPushNotification();
    Linking.openURL(`tel:${+1234567890}`);
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 p-4 items-center bg-curaWhite">
      {/* Header of the Page */}
      <Header />
      <View className="pt-12 px-6 flex w-full items-center gap-2">
        <ImgFallDetected style={{ width: 150, height: 150 }} />
        <Text className="text-4xl font-SatoshiBold">We detected a fall</Text>
      </View>
      <View className="flex w-full mt-6">
        <TouchableOpacity
          className="bg-success rounded-xl py-2.5 px-4"
          onPress={() => {
            handleOKTouchable();
          }}
        >
          <Text className="text-curaWhite text-lg text-center font-SatoshiMedium">
            I'M OK
          </Text>
        </TouchableOpacity>
        <View className="flex items-center py-10">
          <CountdownCircleTimer
            isPlaying
            key={key}
            initialRemainingTime={15}
            duration={15}
            strokeWidth={18}
            colors={["#09C1CB", "#EE754E"]}
            colorsTime={[15, 0]}
            onComplete={handleComplete}
          >
            {({ remainingTime }) => (
              <>
                <Text className="font-SatoshiBold text-[60px]">
                  {remainingTime}
                </Text>
                <Text>seconds</Text>
              </>
            )}
          </CountdownCircleTimer>
        </View>
        <TouchableOpacity
          className="bg-error rounded-xl py-2.5 px-4"
          onPress={() => {
            handleCallTouchable();
          }}
        >
          <Text className="text-curaWhite text-lg text-center font-SatoshiMedium">
            CALL
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ElderFallDetectedScreen;
