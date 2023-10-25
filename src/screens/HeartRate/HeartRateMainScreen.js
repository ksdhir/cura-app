import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../utils/FirebaseConfig";
import { formatDateTime } from "../../helpers";
import { getElderProfile, getElderHeartRateDetail } from "../../services/elder";
import { SafeAreaView } from "react-native-safe-area-context";
import curaTheme from "../../theme/theme";

//TODO:
//1. create NEW api getElderEmail from caregiver profile by pass in user.email
//2. getElderProfile from elder profile by pass in elderEmail
//3. A way to check if the latest BPM is normal or not
// compare with their threshold

export default function HeartRateMainScreen() {
  const navigation = useNavigation();
  const [detail, setDetail] = useState({});
  const [heartRateDetail, setHeartRateDetail] = useState({});
  const [bpm, setBpm] = useState(null); // Initialize bpm with null

  const user = auth.currentUser;
  // console.log("For fetching actual user :" + user.email);
  const staticEmail = "trinapreet@gmail.com";
  // const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    console.log("before getElderProfile");
    console.log("testsalkdjflsfds");
    getElderProfile(staticEmail).then((data) => {
      setDetail(data);
      console.log(data);
    });

    getElderHeartRateDetail(staticEmail).then((data) => {
      setHeartRateDetail(data);
      // console.log(data);
      if (
        data &&
        data["heartRateRecords"] &&
        data["heartRateRecords"].length > 0
      ) {
        setBpm(data["heartRateRecords"][0]["beatsPerMinute"]);
      }
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center px-4 bg-curaWhite">
      <StatusBar style="auto" />
      <View className="w-full justify-center mt-3">
        <Text className=" text-xl text-curaBlack font-bold">
          {detail.profile?.preferredName}
        </Text>
        <Text className=" text-base text-curaBlack font-medium">
          {detail.profile?.age} years old
        </Text>
      </View>
      <View className="w-full flex-1 justify-center items-center ">
        <Text className="text-xl text-curaBlack font-bold">
          Image placeholder
        </Text>
      </View>
      <View className="h-[382px] mb-8 w-full flex items-center bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60 justify-center rounded-xl">
        <View className="flex flex-row w-full justify-between space-x-4 p-4">
          <Text className=" bg-successDark px-4 py-1 rounded-full text-curaWhite text-sm font-medium">
            Normal
          </Text>
          <Text
            className="text-primary text-base font-bold  active:text-primaryDark"
            onPress={() =>
              navigation.navigate("HeartRateHistoryScreen", {
                bpm,
                staticEmail,
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
            10 MIN AGO
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
