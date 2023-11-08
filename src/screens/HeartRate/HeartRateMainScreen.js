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
import curaTheme from "../../theme/theme";
import Graph from "../../assets/icons/svg/graph.svg";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/layouts/Header";
import IconBtn from "../../components/IconBtn";

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
  const [elderProfile, setElderProfile] = useState({});
  const [heartRateDetail, setHeartRateDetail] = useState({});
  const [heartRateThreshold, setHeartRateThreshold] = useState({});

  const { user, token } = useAuth();
  const userLoggedIn = profileType;

  useEffect(() => {
    if (!user) return;
    const caregiverEmail = user.email;
    let elderEmail;
    let caregiverName;

    (async () => {
      try {
        if (userLoggedIn === "Caregiver") {
          //get caregiverName

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
          elderEmail = user.email;
        }

        setElderEmailData(elderEmail);
        // console.log("Elder Email====", elderEmail);

        // Now that you have elderEmail, you can make other async calls
        const profileData = await getElderProfile(elderEmail);
        setElderProfile(profileData);

        const heartRateDetailData = await getElderHeartRateDetail(elderEmail);
        console.log("heartRateDetailData", heartRateDetailData);
        setHeartRateDetail(heartRateDetailData);

        const heartRateThresholdData = await getElderHeartRateThreshold(
          elderEmail
        );
        setHeartRateThreshold(heartRateThresholdData);
      } catch (error) {
        console.log("error", error.message);
        throw Error("Could not get elder profile");
      }
    })();
  }, [user, isFirstLoad]);

  // const caregiverName = user.preferredName;
  const elderEmail = elderEmailData;
  const elderName = elderProfile?.profile?.preferredName;
  const elderAge = elderProfile?.profile?.age;
  const bpm = heartRateDetail?.latestHeartRateRecord?.[0]?.beatsPerMinute;
  const time = heartRateDetail?.latestHeartRateRecord?.[0]?.timestamp;
  const timeAgo = timeDifference(time);
  const minThreshold = heartRateThreshold?.detail?.minimum;
  const maxThreshold = heartRateThreshold?.detail?.maximum;
  const bpmStatus =
    bpm >= minThreshold && bpm <= maxThreshold
      ? "Normal"
      : bpm < minThreshold
      ? "Low"
      : "High";

  const heartwidth = 180;
  const heartheight = 180;

  let speed;
  bpm >= minThreshold && bpm <= maxThreshold
    ? (speed = 1)
    : bpm < minThreshold
    ? (speed = 0.5)
    : (speed = 2);

  let avatarSource;
  let indicator;

  if (bpm < minThreshold || bpm > maxThreshold) {
    indicator = "critical";
  } else if (bpm >= minThreshold - 10 && bpm <= maxThreshold + 10) {
    indicator = "nearCritical";
  } else {
    indicator = "normal";
  }

  //if indicator is normal, display male_normalbpm

  if (indicator === "normal") {
    avatarSource = require("../../assets/lottie/male/male_normalbpm.json");
  } else if (indicator === "critical") {
    avatarSource = require("../../assets/lottie/male/male_criticalbpm.json");
  } else if (indicator === "nearCritical") {
    // use normal avatar for now since it causes confusion
    avatarSource = require("../../assets/lottie/male/male_normalbpm.json");
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center px-4 bg-curaWhite">
      <StatusBar style="auto" />

      {loading ? ( // If loading state is true, display loading screen
        <View className="flex-1 items-center justify-center px-4 bg-curaWhite">
          <Lottie
            source={require("../../assets/lottie/loading_demo.json")}
            autoPlay
            loop
            speed={0.7}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </View>
      ) : (
        // If loading state is false, display actual data
        <>
          <View className="w-full flex-row justify-between py-4">
            <View>
              {userLoggedIn === "Caregiver" ? (
                <Text className="text-xl text-curaBlack font-SatoshiBold">
                  {elderName}
                </Text>
              ) : (
                <Text className="text-xl text-curaBlack font-SatoshiBold">
                  {elderName}
                </Text>
              )}
              <Text className=" text-base text-curaBlack font-SatoshiMedium ">
                {elderAge} years old
              </Text>
            </View>
            <IconBtn
              name="bell"
              onPress={() => navigation.navigate("NotificationHistory")}
              iconStyle={{
                color: curaTheme.lightColors.primary,
              }}
            />
          </View>

          <Lottie
            source={avatarSource}
            autoPlay
            speed={1}
            style={{
              width: 200,
              height: 160,
            }}
          />

          <View
            className="mb-8 p-4 w-full flex items-center bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60  rounded-xl"
            style={{
              height: height * 0.5,
            }}
          >
            <View className="flex flex-row w-full justify-between  items-start">
              <Text
                className=" bg-successDark px-4 py-1 rounded-full text-curaWhite text-sm"
                style={{
                  fontFamily: curaTheme.fontFamilies.SatoshiMedium,
                  backgroundColor:
                    bpm >= minThreshold && bpm <= maxThreshold
                      ? curaTheme.lightColors.successDark
                      : curaTheme.lightColors.errorDark,
                }}
              >
                {bpmStatus}
              </Text>
              <TouchableOpacity
                className="bg-primary p-[6px] rounded-md"
                onPress={() =>
                  navigation.navigate("HeartRateHistoryScreen", {
                    bpm,
                    elderEmail,
                    minThreshold,
                    maxThreshold,
                  })
                }
              >
                <Graph
                  width={28}
                  height={28}
                  style={{
                    color: "#fff",
                  }}
                />
              </TouchableOpacity>
            </View>
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
      )}
    </SafeAreaView>
  );
}
