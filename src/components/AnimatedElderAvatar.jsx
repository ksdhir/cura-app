import Lottie from "lottie-react-native";

const AnimatedElderAvatar = () => {
  const avatarSource = require("../assets/lottie/male/male_normalbpm.json");

  // let avatarSource;
  // let indicator;

  // if (bpm < minThreshold || bpm > maxThreshold) {
  //   indicator = "critical";
  // } else if (bpm >= minThreshold - 10 && bpm <= maxThreshold + 10) {
  //   indicator = "nearCritical";
  // } else {
  //   indicator = "normal";
  // }

  // //if indicator is normal, display male_normalbpm
  // if (indicator === "normal") {
  //   avatarSource = require("../../assets/lottie/male/male_normalbpm.json");
  // } else if (indicator === "critical") {
  //   avatarSource = require("../../assets/lottie/male/male_criticalbpm.json");
  // } else if (indicator === "nearCritical") {
  //   // use normal avatar for now since it causes confusion
  //   avatarSource = require("../../assets/lottie/male/male_normalbpm.json");
  // }

  return (
    <Lottie
      source={avatarSource}
      autoPlay
      speed={1}
      style={{
        width: 200,
        height: 160,
      }}
    />
  );
};

export default AnimatedElderAvatar;
