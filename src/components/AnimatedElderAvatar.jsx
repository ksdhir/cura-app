import Lottie from "lottie-react-native";
import { useWindowDimensions } from "react-native";


const AnimatedElderAvatar = ({ heartRateDetail, heartRateThreshold }) => {

  let { width, height } = useWindowDimensions();


  const bpm = heartRateDetail?.latestHeartRateRecord?.[0]?.beatsPerMinute;
  const minThreshold = heartRateThreshold?.detail?.minimum;
  const maxThreshold = heartRateThreshold?.detail?.maximum;

  let avatarSource;
  let indicator;

  if (bpm < minThreshold || bpm > maxThreshold) {
    indicator = "critical";
  } else if (bpm >= minThreshold - 10 && bpm <= maxThreshold + 10) {
    indicator = "nearCritical";
  } else {
    indicator = "normal";
  }

  //if indicator is normal, display male_normalbpm
  if (indicator === "normal") {
    avatarSource = require("../assets/lottie/male/male_normalbpm.json");
  } else if (indicator === "critical") {
    avatarSource = require("../assets/lottie/male/male_criticalbpm.json");
  } else if (indicator === "nearCritical") {
    // use normal avatar for now since it causes confusion
    avatarSource = require("../assets/lottie/male/male_normalbpm.json");
  }


  let avatarHeight;

  if (height > 760) {
    avatarHeight = 220;
  } else {
    avatarHeight = 160;
  }

  // console.log("screen height", height);

  return (
    <Lottie
      source={avatarSource}
      autoPlay
      speed={1}
      style={{
        width: 200,
        height: avatarHeight,
      }}
    />
  );
};

export default AnimatedElderAvatar;
