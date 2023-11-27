import { timeDifference } from "../../helpers";
import { View, Text, Dimensions, useWindowDimensions } from "react-native";
import Lottie from "lottie-react-native";
import { useEffect, useState } from "react";


const HeartRateGraph = ({ heartRateDetail, heartRateThreshold }) => {

  let { width, height } = useWindowDimensions();

  const [speed, setSpeed] = useState(1);
  const [heartSource, setHeartSource] = useState(require("../../assets/lottie/heart/normal.json"));

  const bpm = heartRateDetail?.latestHeartRateRecord?.[0]?.beatsPerMinute;
  const time = heartRateDetail?.latestHeartRateRecord?.[0]?.timestamp;
  const timeAgo = timeDifference(time);
  const minThreshold = heartRateThreshold?.detail?.minimum;
  const maxThreshold = heartRateThreshold?.detail?.maximum;

  useEffect(() => {
    if (bpm < minThreshold) {
      setSpeed(0.5);
      setHeartSource(require("../../assets/lottie/heart/low.json"));
    } else if (bpm > maxThreshold) {
      setSpeed(4);
      setHeartSource(require("../../assets/lottie/heart/critical.json"));
    } else {
      setSpeed(1);
      setHeartSource(require("../../assets/lottie/heart/normal.json"));
    }
  }, [bpm, minThreshold, maxThreshold]);


  return (
    <>
      {/* Heart Icon */}
      <View className={height > 780 ? "flex flex-1 w-full items-center mb-6" : "flex flex-1 w-full items-center"}>
        <Lottie
          source={heartSource}
          autoPlay
          speed={speed}
          style={{
            width: 260,
            height: height > 780 ? 260 : 230,
            position: "relative",
            bottom: 15,
          }}
        />
      </View>

      {/* BPM */}
      <View className="flex flex-1 flex-col items-center justify-center pt-6 pb-2 ">
        <View className="flex flex-row items-baseline ">
          <Text
            className={height > 780 ? "text-8xl text-secondaryDark font-SatoshiBlack" : "text-7xl text-secondaryDark font-SatoshiBlack"}
          >
            {bpm}
          </Text>
          <Text className="text-3xl text-curaBlack font-SatoshiBold">{""}BPM</Text>
        </View>
        <Text className="text-base text-curaBlack/60 font-SatoshiBold -mt-4">
          {timeAgo}
        </Text>
      </View>
    </>
  );
};

export default HeartRateGraph;
