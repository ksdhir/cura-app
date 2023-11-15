import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layouts/Header";

import ImgFallDetected from "../../assets/images/fall-detected.svg";

import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const ElderFallDetectedScreen = () => {
  const handleOKTouchable = () => {
    console.log("OK");
  };
  const handleCallTouchable = () => {
    console.log("Call");
  };

  return (
    <SafeAreaView className="flex-1 p-4 items-center bg-curaWhite">
      {/* Header of the Page */}
      <Header />
      <View className="pt-12 px-6 flex w-full items-center gap-2">
        <ImgFallDetected style={{ width: 150, height: 150 }} />
        <Text className="text-4xl font-SatoshiBold">We detected a fall</Text>
      </View>
      <View className="flex w-full mt-6">
        <TouchableOpacity
          className="bg-success rounded-xl py-2.5 px-4"
          onPress={() => {
            handleOKTouchable();
          }}
        >
          <Text className="text-curaWhite text-lg text-center font-SatoshiMedium">
            I'M OK
          </Text>
        </TouchableOpacity>
        <View className="flex items-center py-10">
          <CountdownCircleTimer
            isPlaying
            duration={15}
            strokeWidth={18}
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
          className="bg-error rounded-xl py-2.5 px-4"
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

export default ElderFallDetectedScreen;
