import Lottie from "lottie-react-native";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";


const AnimatedElderAvatar = ({ heartRateDetail, heartRateThreshold }) => {

  let { width, height } = useWindowDimensions();

  const [indicator, setIndicator] = useState("normal"); // ["normal", "critical", "nearCritical"]
  const [avatarSource, setAvatarSource] = useState(require("../assets/lottie/male/male_normalbpm.json"));

  const bpm = heartRateDetail?.latestHeartRateRecord?.[0]?.beatsPerMinute;
  const minThreshold = heartRateThreshold?.detail?.minimum;
  const maxThreshold = heartRateThreshold?.detail?.maximum;


  useEffect(() => {
    if (bpm < minThreshold || bpm > maxThreshold) {
      setIndicator("critical");
    } else if (bpm >= minThreshold - 10 && bpm <= maxThreshold + 10) {
      setIndicator("nearCritical");
    } else {
      setIndicator("normal");
    }
  }, [bpm, minThreshold, maxThreshold]);

  useEffect(() => {
    // Update avatar source based on the indicator
    switch (indicator) {
      case "normal":
        setAvatarSource(require("../assets/lottie/male/male_normalbpm.json"));
        break;
      case "critical":
        setAvatarSource(require("../assets/lottie/male/male_criticalbpm.json"));
        break;
      case "nearCritical":
        // Use normal avatar for now since it causes confusion
        setAvatarSource(require("../assets/lottie/male/male_normalbpm.json"));
        break;
      default:
        setAvatarSource(require("../assets/lottie/male/male_normalbpm.json"));
    }
  }, [indicator]);


  let avatarHeight;

  if (height > 780) {
    avatarHeight = 220;
  } else if (height > 760) {
    avatarHeight = 190;
  } else if (height > 720) {
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
