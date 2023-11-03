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

          const data = await getElderEmailFromCaregiverEmail(caregiverEmail);
          console.log("CAREGIVER EMAIL --- 3", caregiverEmail);

          elderEmail = data.caregiver?.elderEmails[0];
          console.log("ELDER EMAIL --- 4", elderEmail);
        } else {
          elderEmail = user.email;
        }

        setElderEmailData(elderEmail);
        // console.log("Elder Email====", elderEmail);

        // Now that you have elderEmail, you can make other async calls
        const profileData = await getElderProfile(elderEmail);
        setElderProfile(profileData);

        const heartRateDetailData = await getElderHeartRateDetail(elderEmail);
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
  }, [user]);

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

  const heartwidth = 150;
  const heartheight = 180;

  let speed;
  bpm >= minThreshold && bpm <= maxThreshold
    ? (speed = 1)
    : bpm < minThreshold
    ? (speed = 0.5)
    : (speed = 2);

  return (
    <SafeAreaView className="flex-1 items-center justify-center px-4 bg-curaWhite">
      <StatusBar style="auto" />
      {/* <Header /> */}
      <View className="w-full flex-row justify-between py-4">
        <View>
          {/* <Text className=" text-sm font-medium text-curaGray">Elder</Text> */}
          {userLoggedIn === "Caregiver" ? (
            <Text className=" text-xl text-curaBlack font-bold">
              {elderName}
            </Text>
          ) : (
            <Text className=" text-xl text-curaBlack font-bold">
              {elderName}
            </Text>
          )}
          <Text className=" text-base text-curaBlack font-medium ">
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
      {/* <Image
        className=" flex-1 justify-start w-full relative -z-10 top-4"
        source={require("../../assets/images/character/maleCharacter2.png")}
        style={{
          resizeMode: "contain",
        }}
      /> */}
      <Lottie
        source={require("../../assets/lottie/male/Avatar_mov1_FIN.json")}
        autoPlay
        speed={1}
        style={{
          width: 200,
          height: 160,
          // borderWidth: 1,
          // borderColor: "red",
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
            className=" bg-successDark px-4 py-1 rounded-full text-curaWhite text-sm font-medium"
            style={{
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
            }}
          />
        </View>
        {/* BPM */}
        <View className="flex flex-1 flex-col items-center justify-center pt-6 pb-2 ">
          <View className="flex flex-row items-baseline ">
            <Text className=" text-7xl text-secondaryDark font-black ">
              {bpm}
            </Text>
            <Text className="text-3xl text-curaBlack font-bold">BPM</Text>
          </View>
          <Text className="text-base  text-curaBlack/60 font-bold -mt-3">
            {timeAgo} MIN AGO
          </Text>
        </View>
        {/* Heart Wave */}
        {/* <View className="flex w-full items-center ">
          <Lottie
            source={require("../../assets/lottie/Animation.json")}
            autoPlay
            //slow down the animation
            speed={0.7}
            style={{
              width: 150,
              height: 100,
            }}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
}
