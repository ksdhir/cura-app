import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import Lottie from "lottie-react-native";

import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { timeDifference } from "../../helpers";
import {
  getElderEmailFromCaregiverEmail,
  getElderProfile,
  getElderHeartRateDetail,
  getElderHeartRateThreshold,
} from "../../services/elder";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../../hooks/useAuth";
import AnimatedElderAvatar from "../../components/AnimatedElderAvatar";
import HomeHeader from "../../components/Home/Header";
import LoadingSpinner from "../../components/LoadingSpinner";
import GraphHeader from "../../components/Home/GraphHeader";

//TODO:Fetching
//1. getElderEmail from caregiver profile by pass in user.email
//2. getElderProfile [name, age] from elder profile by pass in elderEmail
//3. getElderHeartRateDetail [latest BPM and time] from elder profile by pass in elderEmail
//4. getElderHeartRateThreshold [min and max BPM] from elder profile by pass in elderEmail

//NOTE:
//1. BPM is the latest BPM pass it to the HeartRateHistoryScreen
//2. ElderEmail is the elderEmail pass it to the HeartRateHistoryScreen
//3. Pass minThreshold and maxThreshold to the CriticalHeartRateScreen

const { width, height } = Dimensions.get("window");

export default function HeartRateMainScreen() {
  const navigation = useNavigation();
  const { profileType } = useAuth();

  const [loading, setLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [elderEmailData, setElderEmailData] = useState("");
  const [elderProfile, setElderProfile] = useState(null);
  const [heartRateDetail, setHeartRateDetail] = useState(null);
  const [heartRateThreshold, setHeartRateThreshold] = useState(null);

  const { user, token } = useAuth();
  const userLoggedIn = profileType;

  useEffect(() => {
    if (!user) return;
    const caregiverEmail = user.email;
    let elderEmail;

    const init = async () => {
      try {
        if (userLoggedIn === "Caregiver") {
          if (isFirstLoad) {
            setLoading(true); // Set loading to true only on the first app load
          }

          const data = await getElderEmailFromCaregiverEmail(caregiverEmail);
          // console.log("CAREGIVER EMAIL --- 3", caregiverEmail);

          elderEmail = data.caregiver?.elderEmails[0];
          // console.log("ELDER EMAIL --- 4", elderEmail);

          if (isFirstLoad) {
            setLoading(false); // Set loading to false on the first app load after data retrieval
            setIsFirstLoad(false); // Set isFirstLoad to false to prevent further loading
          }
        } else {
          //Elder flow
          elderEmail = user.email;
        }

        //

        setElderEmailData(elderEmail);

        // Now that you have elderEmail, you can make other async calls
        getElderProfile(elderEmail).then((profile) => {
          setElderProfile(profile);
          console.log(elderEmailData);
        });

        getElderHeartRateDetail(elderEmail).then((heartRateDetail) =>
          setHeartRateDetail(heartRateDetail)
        );

        getElderHeartRateThreshold(elderEmail).then((heartRateThreshold) =>
          setHeartRateThreshold(heartRateThreshold)
        );
      } catch (error) {
        console.log("error", error.message);
        throw Error("Could not get elder profile");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [user, isFirstLoad]);

  if (loading || !elderProfile || !heartRateDetail || !heartRateThreshold) {
    return <LoadingSpinner />;
  }

  const bpm = heartRateDetail?.latestHeartRateRecord?.[0]?.beatsPerMinute;
  const time = heartRateDetail?.latestHeartRateRecord?.[0]?.timestamp;
  const timeAgo = timeDifference(time);
  const minThreshold = heartRateThreshold?.detail?.minimum;
  const maxThreshold = heartRateThreshold?.detail?.maximum;
  const heartwidth = 180;
  const heartheight = 180;

  let speed;
  bpm >= minThreshold && bpm <= maxThreshold
    ? (speed = 1)
    : bpm < minThreshold
    ? (speed = 0.5)
    : (speed = 2);

  console.log("RENDER!");
  return (
    <SafeAreaView className="flex-1 items-center justify-center px-4 bg-curaWhite">
      <StatusBar style="auto" />

      <>
        <HomeHeader userLoggedIn={userLoggedIn} profile={elderProfile} />

        <AnimatedElderAvatar />

        <View
          className="mb-8 p-4 w-full flex items-center bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60  rounded-xl"
          style={{
            height: height * 0.5,
          }}
        >
          <GraphHeader data={heartRateDetail} threshold={heartRateThreshold} />

          {/* Heart Icon */}
          <View className="flex flex-1 w-full items-center ">
            <Lottie
              source={require("../../assets/lottie/heartbeat.json")}
              autoPlay
              speed={speed}
              style={{
                width: heartwidth,
                height: heartheight,
                // borderWidth: 1,
              }}
            />
          </View>

          {/* BPM */}
          <View className="flex flex-1 flex-col items-center justify-center pt-6 pb-2 ">
            <View className="flex flex-row items-baseline ">
              <Text className=" text-7xl text-secondaryDark font-SatoshiBlack">
                {bpm}
              </Text>
              <Text className="text-3xl text-curaBlack font-SatoshiBold">
                BPM
              </Text>
            </View>
            <Text className="text-base  text-curaBlack/60 font-SatoshiBold -mt-3">
              {timeAgo} MIN AGO
            </Text>
          </View>
        </View>
      </>
    </SafeAreaView>
  );
}
