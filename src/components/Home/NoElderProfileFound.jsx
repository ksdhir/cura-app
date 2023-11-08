import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View, Dimensions, Text } from "react-native";
const { width, height } = Dimensions.get("window");

const NoElderProfileFound = () => {

  
  return (
    <SafeAreaView className="flex-1 items-center justify-center px-4 bg-curaWhite">
      <StatusBar style="auto" />

      <>
        <View
          className="mb-8 p-4 w-full flex items-center justify-center"
          style={{
            height: height * 0.5,
          }}
        >
          <Text className="text-xl text-center">
            Please add an Elder to monitor their profile.
          </Text>
        </View>
      </>
    </SafeAreaView>
  );
};

export default NoElderProfileFound;
