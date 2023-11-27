import Lottie from "lottie-react-native";
import { View } from "react-native";

const LoadingSpinner = () => {
  return (
    <View className="flex-1 items-center justify-center px-4 bg-curaWhite">
      <Lottie
        source={require("../assets/lottie/loading/loading.json")}
        autoPlay
        loop
        speed={0.8}
        delay={100}
        style={{
          width: 300,
          height: 300,
        }}
      />
    </View>
  );
};

export default LoadingSpinner;
