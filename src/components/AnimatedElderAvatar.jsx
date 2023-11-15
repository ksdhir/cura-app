import Lottie from "lottie-react-native";
import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";


const AnimatedElderAvatar = ({ heartRateDetail, heartRateThreshold }) => {

  let { width, height } = useWindowDimensions();

  const [avatarSource, setAvatarSource] = useState(require("../assets/lottie/male/male_normalbpm.json"));
  const [avatarHeight, setAvatarHeight] = useState(160);

  const bpm = heartRateDetail?.latestHeartRateRecord?.[0]?.beatsPerMinute;
  const minThreshold = heartRateThreshold?.detail?.minimum;
  const maxThreshold = heartRateThreshold?.detail?.maximum;


  useEffect(() => {
    if (bpm < minThreshold || bpm > maxThreshold) {
      setAvatarSource(require("../assets/lottie/male/male_criticalbpm.json"));
    } else if (bpm >= minThreshold - 10 && bpm <= maxThreshold + 10) {
      setAvatarSource(require("../assets/lottie/male/male_normalbpm.json"));
    } else {
      setAvatarSource(require("../assets/lottie/male/male_normalbpm.json"));
    }
  }, [bpm, minThreshold, maxThreshold]);

  useEffect(() => {
    setAvatarHeight(getAvatarHeight(height));
  }, [height]);

  const getAvatarHeight = (height) => {
    let avatarHeight;

    if (height > 780) {
      avatarHeight = 220;
    } else if (height > 760) {
      avatarHeight = 190;
    } else if (height > 720) {
      avatarHeight = 160;
    }

    return avatarHeight;
  };


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
