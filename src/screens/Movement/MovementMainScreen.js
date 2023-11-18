import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

// import components and screens
import LoadingSpinner from "../../components/LoadingSpinner";
import MovementHistoryScreen from "./MovementHistoryScreen";
import MovementStatus from "../../components/MovementStatus";

// import hooks
import useAuth from "../../hooks/useAuth";

// import services
import {
  getCaregiverProfile,
  getSpecificNotificationLog,
} from "../../services/caregiver";
import { getElderProfile } from "../../services/elder";
import ScreenTitle from "../../components/layouts/ScreenTitle";
import Header from "../../components/layouts/Header";

// util function
function parseLocationData(inputData) {
  const transformedData = inputData.notificationLog.map((item) => {
    const locationString =
      item.payload.location.address ??
      item.payload.location.latitude + " " + item.payload.location.longitude; // You can replace this with the actual location data
    const date = new Date(item.timestamp).toISOString();
    const latitude = item.payload.location.latitude;
    const longitude = item.payload.location.longitude;

    return {
      locationString,
      latitude,
      longitude,
      date,
    };
  });

  return transformedData;
}

export default function MovementMainScreen() {
  const navigation = useNavigation();
  const [isElderVisible, setIsElderVisible] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const { user, profileType, token } = useAuth();

  // const [homeCoords, setHomeCoords] = useState(null); // {latitude, longitude}
  const [movementLogs, setMovementLogs] = useState(null);
  const [elderEmail, setElderEmail] = useState(null);

  let homeCoords = null;

  useEffect(() => {
    if (!isFocused) {
      setIsLoading(true);
      return;
    }
    if (user) {
      getCaregiverProfile(user.email)
        .then((data) => {
          return data.caregiver.elderEmails[0];
        })
        .then((elderEmail) => {
          setElderEmail(elderEmail);
          return getElderProfile(elderEmail);
        })
        .then((elderProfile) => {
          // get home coords of elder
          const profile = elderProfile.profile;
          const latitude = profile.defaultLocation.latitude ?? 49.229033;
          const longitude = profile.defaultLocation.longitude ?? -123.0691669;
          return { latitude, longitude, email: profile.email };
        })
        .then((coords) => {
          homeCoords = coords;
          const elderEmail = coords.email;
          return getSpecificNotificationLog(elderEmail, "MOVEMENT_LOCATION");
        })
        .then((logs) => {
          const parsedLogs = parseLocationData(logs);
          setMovementLogs(parsedLogs);

          // compare last movement log with elder profile coords to set isElderVisible
          const lastLog = parsedLogs[0];
          const lastLatitude = lastLog.latitude;
          const lastLongitude = lastLog.longitude;
          const currentLatitude = homeCoords.latitude;
          const currentLongitude = homeCoords.longitude;

          if (
            lastLatitude == currentLatitude &&
            lastLongitude == currentLongitude
          ) {
            return setIsElderVisible(true);
          } else {
            return setIsElderVisible(false);
          }
        })
        .then(() => {
          setIsLoading(false);
        });
    }
  }, [isFocused, user]);

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-curaWhite px-4 space-y-4">
      <StatusBar />
      {/* Header of the Page */}
      <Header toHome={true} />
      <ScreenTitle title="Movement" />

      {/* Main Content of the page */}
      <View className="h-[75vh] w-full flex">
        {/* Dynamically Render the Image of the  */}
        {/* TODO: replace with lottie animation */}
        <View className="items-center ">
          {isElderVisible ? (
            <Image
              source={require("../../assets/images/movement/elder_visible.png")}
            />
          ) : (
            <Image
              source={require("../../assets/images/movement/elder_gone.png")}
            />
          )}
          {/* display status */}
          <View>
            <MovementStatus isActive={isElderVisible} />
          </View>
        </View>
        <Text className="text-lg text-curaBlack font-SatoshiMedium pb-4">
          History
        </Text>
        <ScrollView
          className="w-full flex"
          //hide scrollbar
          showsVerticalScrollIndicator={false}
        >
          <MovementHistoryScreen movements={movementLogs} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
