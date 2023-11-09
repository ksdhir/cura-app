import { timeDifference } from "../../helpers";
import { View, Text, Dimensions } from "react-native";
import Lottie from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const HeartRateGraph = ({ heartRateDetail, heartRateThreshold }) => {

  const bpm = heartRateDetail?.latestHeartRateRecord?.[0]?.beatsPerMinute;
  const time = heartRateDetail?.latestHeartRateRecord?.[0]?.timestamp;
  const timeAgo = timeDifference(time);
  const minThreshold = heartRateThreshold?.detail?.minimum;
  const maxThreshold = heartRateThreshold?.detail?.maximum;
  const heartwidth = 180;
  const heartheight = 180;

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
          <Text className="text-7xl text-secondaryDark font-SatoshiBlack">
            {bpm}
          </Text>
          <Text className="text-3xl text-curaBlack font-SatoshiBold">BPM</Text>
        </View>
        <Text className="text-base text-curaBlack/60 font-SatoshiBold -mt-3">
          {timeAgo} MIN AGO
        </Text>
      </View>
    </>
  );
};

export default HeartRateGraph;
