import { timeDifference } from "../../helpers";
import { View, Text, Dimensions, useWindowDimensions } from "react-native";
import Lottie from "lottie-react-native";


const HeartRateGraph = ({ heartRateDetail, heartRateThreshold }) => {

  let { width, height } = useWindowDimensions();


  const bpm = heartRateDetail?.latestHeartRateRecord?.[0]?.beatsPerMinute;
  const time = heartRateDetail?.latestHeartRateRecord?.[0]?.timestamp;
  const timeAgo = timeDifference(time);
  const minThreshold = heartRateThreshold?.detail?.minimum;
  const maxThreshold = heartRateThreshold?.detail?.maximum;



  // default and adjusted speeds
  let speed = 1;
  if (bpm < minThreshold) {
    speed = 0.5;
  } else if (bpm > maxThreshold) {
    speed = 2;
  }

  return (
    <>
      {/* Heart Icon */}
      <View className={height > 760 ? "flex flex-1 w-full items-center mb-6" : "flex flex-1 w-full items-center"}>
        <Lottie
          source={require("../../assets/lottie/heartbeat.json")}
          autoPlay
          speed={speed}
          style={{
            width: 180,
            height: height > 760 ? 210 : 180,
          }}
        />
      </View>

      {/* BPM */}
      <View className="flex flex-1 flex-col items-center justify-center pt-6 pb-2 ">
        <View className="flex flex-row items-baseline ">
          <Text
            className={height > 760 ? "text-8xl text-secondaryDark font-SatoshiBlack" : "text-7xltext-secondaryDark font-SatoshiBlack"}
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
