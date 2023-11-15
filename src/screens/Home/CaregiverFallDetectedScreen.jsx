import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layouts/Header";
import ImgFallDetected from "../../assets/images/fall_detection.svg";

import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const CaregiverFallDetectedScreen = () => {
  const handleCallTouchable = () => {
    console.log("Call");
  };

  return (
    <SafeAreaView className="flex-1 p-4 items-center bg-curaWhite">
      {/* Header of the Page */}
      <Header />
      <View className="pt-8 px-6 flex w-full items-center gap-2">
        <ImgFallDetected style={{ width: 150, height: 150 }} />
        <View className="flex items-center">
          <Text className="text-5xl font-SatoshiBold">Rocky Balboa</Text>
          <Text className="text-5xl font-SatoshiBold">might have fallen!</Text>
          <Text className="text-center text-lg">
            We’ve detected a potential fall incident and is waiting for Rocky to
            prompt.
          </Text>
        </View>
      </View>
      <View className="flex w-full">
        <View className="flex items-center py-8">
          <CountdownCircleTimer
            isPlaying
            duration={15}
            strokeWidth={18}
            size={170}
            colors={["#09C1CB", "#EE754E"]}
            colorsTime={[15, 0]}
            onComplete={() => {
              // do your stuff here
              return console.log("Call"), { shouldRepeat: true, delay: 1.5 }; // repeat animation in 1.5 seconds
            }}
          >
            {({ remainingTime }) => (
              <>
                <Text className="font-SatoshiBold text-[60px]">
                  {remainingTime}
                </Text>
                <Text>seconds</Text>
              </>
            )}
          </CountdownCircleTimer>
        </View>
        <TouchableOpacity
          className="bg-primary rounded-xl py-2.5 px-4"
          onPress={() => {
            handleCallTouchable();
          }}
        >
          <Text className="text-curaWhite text-lg text-center font-SatoshiMedium">
            CALL
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CaregiverFallDetectedScreen;
