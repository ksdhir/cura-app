import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/layouts/Header";
import {
  heartRatePushNotification,
  movementPushNotification,
} from "../../services/elder";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner";

const DemoScreen = () => {
  const { user, token } = useAuth();

  const handleTestCriticalHeartRate = () => {
    console.log("CRITICAL HEART RATE");

    heartRatePushNotification(user.email, token, {
      message: "Critical Heart Rate Detected",
      currentMaxHeartRate: 110,
      currentMinHeartRate: 80,
      detectedAbnormalHeartRate: 188,
    });

    // {"message":null,"currentMaxHeartRate":null,"currentMinHeartRate":null,"detectedAbnormalHeartRate":null,"location":{"address":"Langara College","latitude":49.225693,"longitude":-123.107326}}
  };

  const handleTestMovementTracking = () => {
    console.log("TEST MOVEMENT RATE");
    movementPushNotification("elder@cura-app.ca", 49.225693, -123.107326);
  };

  if (!user) return <LoadingSpinner />;

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4 bg-white">
      <Header />

      <View className="flex flex-column flex-1 justify-center items-center space-y-8">
        <TouchableOpacity
          className="w-full flex justify-center items-center"
          onPress={handleTestCriticalHeartRate}
        >
          <Text className="font-SatoshiBold text-2xl bg-secondaryDark rounded-xl p-4 text-white">
            Test Critical Heart Rate
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full flex justify-center items-center"
          onPress={handleTestMovementTracking}
        >
          <Text className="font-SatoshiBold text-2xl bg-primary rounded-xl p-4 text-white">
            Test Movement Tracking
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DemoScreen;
