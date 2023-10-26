import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getElderProfile, getElderHeartRateDetail } from "../../services/elder";
import { Button } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import curaTheme from "../../theme/theme";

//TODO:Fetching
//1. getElderProfile [dailyAverage, dailyMin, dailyMax] from elder profile by pass in elderEmail
//2. Also get the average bpm per hour of today since 12am (Max data is 24)
//3. getElderHeartRateDetail [weekAverage, weekMin, weekMax] from elder profile by pass in elderEmail
//4. Also get the average bpm per day of this week (Max data is 7)

export default function HeartRateHistoryScreen() {
  const { width, height } = useWindowDimensions();

  const navigation = useNavigation();
  const [detail, setDetail] = useState({});
  const [heartRateDetail, setHeartRateDetail] = useState({});
  const [daily, setDaily] = useState(true);

  const route = useRoute();

  const { bpm, elderEmail, minThreshold, maxThreshold } = route.params;

  useEffect(() => {
    getElderProfile(elderEmail).then((data) => {
      setDetail(data);
    });

    getElderHeartRateDetail(elderEmail).then((data) => {
      setHeartRateDetail(data);
      // console.log(data);
    });
  }, []);

  const weekMin = heartRateDetail?.heartRateRecords?.[0]?.weekMin;
  const weekMax = heartRateDetail?.heartRateRecords?.[0]?.weekMax;
  const weekAverage = heartRateDetail?.heartRateRecords?.[0]?.weekAverage;

  const dailyMin = detail.profile?.heartRateThreshold.minimum;
  const dailyMax = detail.profile?.heartRateThreshold.maximum;
  const dailyAverage = 95;

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-curaWhite px-4  ">
      <StatusBar style="auto" />
      <View
        className="flex w-full justify-between rounded-t-xl pt-4 pb-8  mt-8 absolute -z-10 items-center bg-primary/20"
        style={{ top: height - height }}
      >
        <Text className=" text-base text-primaryDark font-bold">
          Current Heart Rate
        </Text>
        <Text className="text-base text-primaryDark font-bold">{bpm} BPM</Text>
      </View>

      {/*  CARD  */}
      <View className="flex-1 mb-8 mt-20 pb-2 pt-8 px-4 w-full flex space-y-4 items-center bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60 justify-center rounded-xl">
        <View className="flex flex-row w-full justify-around  px-14 ">
          <Text
            className="text-base flex-1 text-center py-2 bg-primary font-medium rounded-l-full"
            style={{
              color:
                daily === true
                  ? curaTheme.lightColors.white
                  : curaTheme.lightColors.curaDark,
              backgroundColor:
                daily === true
                  ? curaTheme.lightColors.primary
                  : curaTheme.lightColors.curaGray,
            }}
            onPress={() => setDaily(true)}
          >
            Daily
          </Text>
          <Text
            className="text-base flex-1 text-center py-2  font-medium rounded-r-full"
            style={{
              color:
                daily === false
                  ? curaTheme.lightColors.white
                  : curaTheme.lightColors.curaDark,
              backgroundColor:
                daily === false
                  ? curaTheme.lightColors.primary
                  : curaTheme.lightColors.curaGray,
            }}
            onPress={() => setDaily(false)}
          >
            Weekly
          </Text>
        </View>

        <View className="w-full px-8 flex items-center justify-center">
          <Text className="text-3xl text-curaBlack font-bold">AVERAGE</Text>
          <View className="flex flex-row items-baseline -mt-6 ">
            <Text className="text-black text-secondaryDark font-black ">
              {daily === true ? dailyAverage : weekAverage}
            </Text>
            <Text className="text-4xl text-curaBlack font-bold">BPM</Text>
          </View>
        </View>

        {/* =======START GRAPH======= */}

        {daily === true ? (
          <View className="flex flex-1 p-4 items-center w-full bg-curaGray/20">
            <Text className="text-2xl text-curaBlack  font-bold">
              GRAPH Daily
            </Text>
          </View>
        ) : (
          <View className="flex flex-1 p-4 items-center w-full bg-curaGray/20">
            <Text className="text-2xl text-curaBlack  font-bold">
              GRAPH Weekly
            </Text>
          </View>
        )}

        {/* =======END GRAPH======= */}

        <View className="flex w-full flex-row justify-around">
          <Text className="text-lg text-neutral-800 font-normal">
            Min {daily === true ? dailyMin : weekMin} bpm
          </Text>
          <Text className="text-lg text-neutral-800 font-normal">
            Max {daily === true ? dailyMax : weekMax}bpm
          </Text>
        </View>
        <View className="flex w-full">
          <Button
            title="Critical Heart Rate"
            titleStyle={{
              fontSize: 22,
              fontWeight: "medium",
            }}
            onPress={() =>
              navigation.navigate("CriticalHeartRateScreen", {
                elderEmail,
                bpm,
                minThreshold,
                maxThreshold,
              })
            }
          />
        </View>
      </View>
      {/*  CARD  */}
    </SafeAreaView>
  );
}
