import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../utils/FirebaseConfig";
import { formatDateTime, timeDifference } from "../../helpers";
import {
  getElderEmailFromCaregiverEmail,
  getElderProfile,
  getElderHeartRateDetail,
  getElderHeartRateThreshold,
} from "../../services/elder";
import { SafeAreaView } from "react-native-safe-area-context";
import curaTheme from "../../theme/theme";

//TODO:Fetching
//1. getElderEmail from caregiver profile by pass in user.email
//2. getElderProfile [name, age] from elder profile by pass in elderEmail
//3. getElderHeartRateDetail [latest BPM and time] from elder profile by pass in elderEmail
//4. getElderHeartRateThreshold [min and max BPM] from elder profile by pass in elderEmail

//NOTE:
//1. BPM is the latest BPM pass it to the HeartRateHistoryScreen
//2. ElderEmail is the elderEmail pass it to the HeartRateHistoryScreen
//3. Pass minThreshold and maxThreshold to the CriticalHeartRateScreen

export default function HeartRateMainScreen() {
  const navigation = useNavigation();
  const [elderEmailData, setElderEmailData] = useState("");
  const [elderProfile, setElderProfile] = useState({});
  const [heartRateDetail, setHeartRateDetail] = useState({});
  const [heartRateThreshold, setHeartRateThreshold] = useState({});

  const caregiverEmail = auth.currentUser.email;

  useEffect(() => {
    (async () => {
      try {
        // Use await to get the elderEmail from the Promise
        const data = await getElderEmailFromCaregiverEmail(caregiverEmail);
        const elderEmail = data.caregiver?.elderEmails[0];

        setElderEmailData(elderEmail);
        console.log("====Elder Email====");
        console.log(elderEmail);

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
  }, []);

  const elderEmail = elderEmailData;
  const elderName = elderProfile?.profile?.preferredName;
  const elderAge = elderProfile?.profile?.age;
  const bpm = heartRateDetail?.latestHeartRateRecord?.[0]?.beatsPerMinute;
  const time = heartRateDetail?.latestHeartRateRecord?.[0]?.timestamp;
  const timeAgo = timeDifference(time);
  const minThreshold = heartRateThreshold?.detail?.minimum;
  const maxThreshold = heartRateThreshold?.detail?.maximum;
  const bpmStatus =
    bpm >= minThreshold && bpm <= maxThreshold ? "Normal" : "Critical";

  return (
    <SafeAreaView className="flex-1 items-center justify-center px-4 bg-curaWhite">
      <StatusBar style="auto" />
      <View className="w-full justify-center mt-3">
        <Text className=" text-xl text-curaBlack font-bold">{elderName}</Text>
        <Text className=" text-base text-curaBlack font-medium">
          {elderAge} years old
        </Text>
      </View>
      <View className="w-full flex-1 justify-center items-center ">
        <Text className="text-xl text-curaBlack font-bold">
          Image placeholder
        </Text>
      </View>
      <View className="h-[382px] mb-8 w-full flex items-center bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60 justify-center rounded-xl">
        <View className="flex flex-row w-full justify-between space-x-4 p-4">
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
          <Text
            className="text-primary text-base font-bold  active:text-primaryDark"
            onPress={() =>
              navigation.navigate("HeartRateHistoryScreen", {
                bpm,
                elderEmail,
                minThreshold,
                maxThreshold,
              })
            }
          >
            HeartRate History
          </Text>
        </View>
        <View className="flex flex-col flex-1 items-center justify-center mb-16">
          {bpm !== null ? ( // Check if bpm is not null
            <View className="flex flex-row items-baseline ">
              <Text className="text-black text-secondaryDark font-black ">
                {bpm}
              </Text>
              <Text className="text-4xl text-curaBlack font-bold">BPM</Text>
            </View>
          ) : (
            <Text className="text-base text-curaBlack/80 font-bold">
              Loading...
            </Text>
          )}
          <Text className="text-base  text-curaBlack/80 font-bold -mt-4">
            {timeAgo} MIN AGO
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
