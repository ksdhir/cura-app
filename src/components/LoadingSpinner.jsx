import { View } from "react-native";
import LottieView from "lottie-react-native";

const LoadingSpinner = () => {
  return (
    ///make it absolute and center it's position in the parent
    <View className="w-full flex-1 items-center justify-center bg-curaWhite pt-[80px]">
      <LottieView
        source={require("../assets/lottie/loading/loading.json")}
        autoPlay
        loop
        speed={0.8}
        style={{
          width: 300,
          height: 300,
        }}
      />
    </View>
  );
};

export default LoadingSpinner;
