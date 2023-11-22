import Lottie from "lottie-react-native";
import { View } from "react-native";

const LoadingSpinner = () => {
  return (
    <View className="flex-1 items-center justify-center px-4 bg-curaWhite">
      <Lottie
        source={require("../assets/lottie/cura_loading.json")}
        autoPlay
        loop
        speed={0.7}
        style={{
          width: 150,
          height: 150,
        }}
      />
    </View>
  );
};

export default LoadingSpinner;
