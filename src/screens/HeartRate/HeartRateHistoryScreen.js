import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getElderProfile,
  getElderHeartRateDetail,
  getElderDailyHeartRateDataVisualisation,
  getElderWeeklyHeartRateDataVisualisation,
} from "../../services/elder";
import { Button } from "@rneui/themed";
import { BarChart } from "react-native-gifted-charts";
import getDayName from "../../helpers/getDayName";
import convertUTCtoVancouverTime from "../../helpers/convertUTCtoVancouverTime";
import curaTheme from "../../theme/theme";

import { useFonts } from "expo-font";
import Header from "../../components/layouts/Header";

// import components
import LoadingSpinner from "../../components/LoadingSpinner";

//TODO:Fetching
//1. getElderProfile [dailyAverage, dailyMin, dailyMax] from elder profile by pass in elderEmail
//2. Also get the average bpm per hour of today since 12am (Max data is 24)
//3. getElderHeartRateDetail [weekAverage, weekMin, weekMax] from elder profile by pass in elderEmail
//4. Also get the average bpm per day of this week (Max data is 7)

export default function HeartRateHistoryScreen() {
  const { width, height } = Dimensions.get("window");

  const navigation = useNavigation();
  const [detail, setDetail] = useState(null);
  const [heartRateDetail, setHeartRateDetail] = useState(null);
  const [daily, setDaily] = useState(true);
  const [dailyRawData, setDailyRawData] = useState(null);
  const [weeklyRawData, setWeeklyRawData] = useState(null);

  const route = useRoute();

  const { bpm, elderEmail, minThreshold, maxThreshold } = route.params;

  useEffect(() => {
    
    getElderProfile(elderEmail).then((data) => {
      // console.log(data)
      setDetail(data);
    });

    getElderHeartRateDetail(elderEmail).then((data) => {
      // console.log(data)
      setHeartRateDetail(data);
      // console.log(data);
    });

    getElderDailyHeartRateDataVisualisation(elderEmail).then((data) => {
      // console.log(data)
      setDailyRawData(data?.consolidatedData);
    });

    getElderWeeklyHeartRateDataVisualisation(elderEmail).then((data) => {
      // console.log(data)
      setWeeklyRawData(data?.consolidatedData);
    });

  }, []);



  if (!detail || !heartRateDetail || !dailyRawData || !weeklyRawData) {
    return <LoadingSpinner />;
  }


  const weekMin = heartRateDetail?.latestHeartRateRecord?.[0]?.weekMin;
  const weekMax = heartRateDetail?.latestHeartRateRecord?.[0]?.weekMax;
  const weekAverage = heartRateDetail?.latestHeartRateRecord?.[0]?.weekAverage;

  const dailyMin = heartRateDetail?.latestHeartRateRecord?.[0]?.todayMin;
  const dailyMax = heartRateDetail?.latestHeartRateRecord?.[0]?.todayMax;
  const dailyAverage =
    heartRateDetail?.latestHeartRateRecord?.[0]?.todayAverage;

  const weeklyData = Object.entries(weeklyRawData)
    .slice(-7)
    .map(([dateString, value], index, arr) => ({
      value: value,
      label: getDayName(dateString),
    }));

  const dailyData = Object.entries(dailyRawData).map(
    ([dateString, value], index, arr) => ({
      value: value,
      label: convertUTCtoVancouverTime(dateString)
        .toLowerCase()
        ?.replace(/\s/g, ""),
    })
  );

  return (
    <SafeAreaView className="flex flex-1 w-full items-center justify-center bg-curaWhite px-4">
      <StatusBar style="auto" />
      <View className="flex flex-1 w-full">
        <View className="flex w-full justify-between rounded-t-xl pt-4 pb-8 relative -z-10 items-center bg-primary/20">
          <Text className=" text-base text-primaryDark font-SatoshiBold">
            Current Heart Rate
          </Text>
          <Text className="text-base text-primaryDark font-SatoshiBold">
            {bpm} BPM
          </Text>
        </View>

        {/*  CARD  */}
        <View className="flex flex-1 mb-8 -mt-4 px-4 py-3 w-full bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60 justify-between rounded-xl">
          <View className="flex flex-row w-full justify-around px-14 ">
            <Text
              className="text-base flex-1 text-center py-2 bg-primary font-SatoshiMedium rounded-l-full"
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
              className="text-base flex-1 text-center py-2 font-SatoshiMedium rounded-r-full"
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

          <View
            className="w-full px-8 flex h-fit items-center justify-center "
            contentContainerStyle={{
              borderRadius: 50,
            }}
          >
            <Text className="text-3xl text-curaBlack font-SatoshiBold">
              AVERAGE
            </Text>
            <View className="flex flex-row items-baseline -mt-1 ">
              <Text className="text-7xl text-secondaryDark font-SatoshiBlack ">
                {daily === true ? dailyAverage : weekAverage}
              </Text>
              <Text className="text-3xl text-curaBlack font-SatoshiBold">
                BPM
              </Text>
            </View>
          </View>

          {/* =======START GRAPH======= */}

          {daily === true ? (
            <View
              className="flex h-fit justify-end pb-4 "
              style={{
                width: width - 64,
              }}
            >
              <BarChart
                width={width * 0.65}
                maxValue={200}
                barWidth={width / 20}
                noOfSections={4}
                barBorderTopLeftRadius={50}
                barBorderTopRightRadius={50}
                frontColor="#FCD3DF"
                data={dailyData}
                yAxisThickness={0}
                xAxisThickness={0}
                dashGap={0}
                initialSpacing={width / 32}
                scrollToEnd={false}
                isAnimated={true}
              />
            </View>
          ) : (
            <View
              className="flex  h-fit justify-end pb-4 "
              style={{
                width: width - 64,
              }}
            >
              <BarChart
                width={width * 0.65}
                maxValue={200}
                barWidth={width / 24}
                noOfSections={4}
                barBorderTopLeftRadius={50}
                barBorderTopRightRadius={50}
                frontColor="#FCD3DF"
                data={weeklyData}
                yAxisThickness={0}
                xAxisThickness={0}
                dashGap={0}
                initialSpacing={width / 40}
                disableScroll={true}
                isAnimated={true}
              />
            </View>
          )}

          {/* =======END GRAPH======= */}

          <View className="flex w-full flex-row justify-around ">
            <Text className="text-lg text-neutral-800 font-normal">
              Min {daily === true ? dailyMin : weekMin} bpm
            </Text>
            <Text className="text-lg text-neutral-800 font-normal">
              Max {daily === true ? dailyMax : weekMax}bpm
            </Text>
          </View>
          <TouchableOpacity
            className="w-full h-12 bg-primary rounded-xl flex items-center justify-center"
            onPressIn={() =>
              navigation.navigate("CriticalHeartRateScreen", {
                elderEmail,
                bpm,
                minThreshold,
                maxThreshold,
              })
            }
          >
            <Text className="font-SatoshiMedium text-white text-xl text">
              Critical Heart Rate
            </Text>
          </TouchableOpacity>
        </View>
        {/*  CARD  */}
      </View>
    </SafeAreaView>
  );
}

// Button: {
//   containerStyle: {
//     height: 48,
//     width: "100%",
//     borderRadius: 12,
//     marginVertical: 8,
//   },
//   buttonStyle: {
//     height: 48,
//     borderRadius: 12,
//   },
//   titleStyle: {
//     color: "#F8FFFE",
//   },
// },
