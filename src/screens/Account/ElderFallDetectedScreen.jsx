import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layouts/Header";
import ImgFallDetected from "../../assets/images/fall-detection.svg";

import { useRoute } from "@react-navigation/native";

const ElderFallDetectedScreen = () => {
  const handleCallTouchable = () => {
    console.log("Call");
  };

  const route = useRoute();

  const { elderPhoneNumber, elderName, location } = route.params;

  console.log(elderPhoneNumber, elderName, location);

  return (
    <SafeAreaView className="flex-1 p-4 items-center bg-curaWhite">
      {/* Header of the Page */}
      <Header />
      <View className="flex-1 flex flex-col items-center justify-between">
        <View className="pt-8 px-6 flex w-full items-center space-y-8">
          <View>
            <ImgFallDetected style={{ width: 150, height: 150 }} />
          </View>
          <View className="flex items-center">
            <Text className="text-5xl font-SatoshiBold">{elderName}</Text>
            <Text className="text-5xl font-SatoshiBold">
              might have fallen!
            </Text>
            <Text className="text-center text-lg mt-4">
              We’ve detected a potential fall incident at{" "}
              <Text className=" text-errorDark font-SatoshiBlack ">
                {location}
              </Text>
            </Text>
          </View>
        </View>
        <View className="flex px-4 min-w-full my-8">
          <TouchableOpacity
            className="bg-errorDark rounded-xl py-2.5 px-4"
            onPress={() => {
              handleCallTouchable();
            }}
          >
            <Text className="text-curaWhite text-lg text-center font-SatoshiMedium">
              CALL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ElderFallDetectedScreen;
