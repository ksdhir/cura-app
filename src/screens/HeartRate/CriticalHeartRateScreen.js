import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import curaTheme from "../../theme/theme";
import {
  getAllNotificationLog,
  getSpecificNotificationLog,
} from "../../services/caregiver";
import { formatDateTime, timeDifference } from "../../helpers";
import Header from "../../components/layouts/Header";
import IconBtn from "../../components/IconBtn";
import PolyUp from "../../assets/icons/svg/polygonup.svg";
import PolyDown from "../../assets/icons/svg/polygondown.svg";
import { Icon } from "@rneui/base";
import Title from "../../components/layouts/ScreenTitle";

export default function CriticalHeartRateScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [heartrateLog, setHeartrateLog] = useState([]);

  const route = useRoute();

  const { bpm, elderEmail, minThreshold, maxThreshold } = route.params;

  useEffect(() => {
    getSpecificNotificationLog(elderEmail, "CRITICAL_HEART_RATE").then(
      (data) => {
        setHeartrateLog(data);
      }
    );
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-curaWhite px-4 space-y-4">
      <StatusBar />
      <Header />

      <View className="w-full">
        <Text className="text-5xl text-curaBlack font-SatoshiBold">
          Critical Heart Rate
        </Text>
      </View>
      <View className="flex flex-row w-full h-40  justify-between relative rounded-xl ">
        <Image
          source={require("../../assets/images/character/maleCritical.png")}
          style={{
            width: 120,
            height: 160,
            position: "absolute",
            zIndex: 10,

            transform: [
              {
                translateX: width / 2 - 80,
              },
            ],

            //crop the image to the size of the parent
            top: 5,

            resizeMode: "contain",
          }}
        />

        <View className="rounded-tl-xl rounded-bl-xl flex flex-1 flex-col justify-center items-center bg-primaryDark">
          <Text className="text-base text-curaWhite font-SatoshiMedium pr-16">
            Min
          </Text>
          <Text className="text-[42px]  text-curaWhite font-SatoshiBlack -mt-3 -mb-2 pr-16">
            {minThreshold}
          </Text>
          <Text className="text-base text-curaWhite font-SatoshiMedium pr-16">
            BPM
          </Text>
        </View>
        <View className="rounded-tr-xl rounded-br-xl flex flex-1 flex-col  justify-center items-center bg-errorDark">
          <Text className="text-base text-curaWhite font-SatoshiMedium pl-16">
            Max
          </Text>
          <Text className=" text-[42px]  text-curaWhite font-SatoshiBlack -mt-3 -mb-2 pl-16">
            {maxThreshold}
          </Text>
          <Text className="text-base text-curaWhite font-SatoshiMedium pl-16">
            BPM
          </Text>
        </View>
      </View>
      <View className="w-full flex-1 justify-center ">
        <Text className="text-lg text-curaBlack pb-4 ">History</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="w-full flex "
        >
          <View className="flex flex-1 flex-col space-y-4">
            {heartrateLog &&
            heartrateLog.notificationLog &&
            heartrateLog.notificationLog.length > 0 ? (
              heartrateLog.notificationLog.map((item, index) => (
                <View
                  key={item.id}
                  className="flex flex-row py-6 bg-curaWhite space-x-2 "
                >
                  <IconBtn
                    name={
                      item.payload?.detectedAbnormalHeartRate >
                      item.payload?.currentMaxHeartRate
                        ? "polygonup"
                        : "polygondown"
                    }
                    height={32}
                    width={32}
                    iconStyle={{
                      color: curaTheme.lightColors.errorDark,
                      marginHorizontal: 24,
                    }}
                  />
                  <View>
                    <Text className="text-xl text-curaBlack font-SatoshiBold">
                      {item.payload?.detectedAbnormalHeartRate} BPM
                    </Text>
                    <Text className="text-curaGray text-xs">
                      {item.payload?.detectedAbnormalHeartRate >
                      item.payload?.currentMaxHeartRate
                        ? item.payload?.detectedAbnormalHeartRate -
                          item.payload.currentMaxHeartRate +
                          "BPM higher than maximum threshold"
                        : item.payload?.currentMinHeartRate -
                          item.payload?.detectedAbnormalHeartRate +
                          "BPM lower than minimum threshold"}
                    </Text>
                    <Text className="text-curaGray text-xs">
                      {timeDifference(item.timestamp)}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>No data available</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
