import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SquircleView } from "react-native-figma-squircle";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../utils/FirebaseConfig";
import { formatDateTime } from "../../helpers";

export default function HeartRateMainScreen() {
  const navigation = useNavigation();
  const [detail, setDetail] = useState({});

  // console.log("@@", auth.currentUser);

  const staticEmail = "trinapreet@gmail.com";

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const sampleFetch = async () => {
      // console.log("fetching");

      //1.fetch the response from the api
      const response = await fetch(
        `${apiUrl}/elder/profile?email=trinapreet@gmail.com`
      );

      const data = await response.json();
      setDetail(data);
      // console.log(detail.profile.name);
      console.log("fetching");
    };

    sampleFetch();
  }, []);

  const bpm = 80;

  const formattedDateTime = formatDateTime(
    detail.profile?.heartRateThreshold.lastUpdated
  );

  return (
    <View className="flex-1 items-center justify-center white ">
      <StatusBar style="auto" />
      <View className="w-full flex-1 justify-center px-8">
        <Text className="text-xl text-neutral-800 font-normal">
          HeartRate Home
        </Text>
        <Text className="text-2xl text-neutral-800 font-bold">
          Hello {detail.profile?.name}
        </Text>
      </View>
      <SquircleView
        className=" h-[75vh] w-full px-8 flex items-center justify-center rounded-tl-[120px] space-y-8"
        squircleParams={{
          cornerSmoothing: 1,
          topLeftCornerRadius: 120,
          fillColor: "#d9f99d",
        }}
      >
        <View className="flex flex-col items-center justify-center space-y-4">
          <Text className="text-4xl text-neutral-800 font-bold">
            HeartRate {bpm} bpm
          </Text>
          <Text className="text-lg text-neutral-800 font-normal">
            Latest Update: {formattedDateTime}
          </Text>
        </View>

        <View className="flex w-full flex-col items-center justify-center space-y-4 border border-lime-900 rounded-lg p-4 ">
          <Text className="text-2xl text-neutral-800 font-bold">
            Critical Heart Rate
          </Text>
          <Text className="text-lg text-neutral-800 font-normal">
            Min HeartRate: {detail.profile?.heartRateThreshold.minimum} bpm
          </Text>
          <Text className="text-lg text-neutral-800 font-normal">
            Max HeartRate: {detail.profile?.heartRateThreshold.maximum} bpm
          </Text>
          <TouchableOpacity
            className="w-full bg-lime-400 p-4 rounded-lg flex justify-center items-center "
            onPress={() => navigation.navigate("HeartRateHistory")}
          >
            <Text className=" text-slate-800 text-base font-bold">
              Adjust Threshold
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex items-center justify-center flex-row space-x-4 ">
          <TouchableOpacity
            className=" bg-lime-400 p-4 rounded-lg flex justify-center items-center "
            onPress={() => navigation.navigate("GoogleHealthScreen")}
          >
            <Text className=" text-slate-800 text-base font-bold">
              Google Health
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className=" bg-lime-400 p-4 rounded-lg flex justify-center items-center "
            onPress={() => navigation.navigate("HeartRateHistory")}
          >
            <Text className=" text-slate-800 text-base font-bold">
              HeartRate History
            </Text>
          </TouchableOpacity>
        </View>
      </SquircleView>
    </View>
  );
}
