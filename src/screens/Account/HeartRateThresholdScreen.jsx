import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layouts/Header";
import ThresholdItem from "../../components/Account/ThresholdItem";
import {
  getElderHeartRateThreshold,
  updateElderHeartRateThreshold,
} from "../../services/elder";
import useAuth from "../../hooks/useAuth";
import ScreenTitle from "../../components/layouts/ScreenTitle";

export default function HeartRateThresholdScreen() {
  const [minHeartRate, setMinHeartRate] = useState(80);
  const [maxHeartRate, setMaxHeartRate] = useState(110);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { user, token } = useAuth();

  const handleChangeThreshold = async () => {
    try {
      if (minHeartRate > maxHeartRate) {
        alert("Minimum threshold cannot be greater than maximum threshold!");
        return;
      }

      if (minHeartRate === maxHeartRate) {
        alert("Minimum threshold cannot be equal to maximum threshold!");
        return;
      }

      if (maxHeartRate < minHeartRate) {
        alert("Maximum threshold cannot be less than minimum threshold!");
        return;
      }

      const result = await updateElderHeartRateThreshold(
        {
          email: user.email,
          minimum: minHeartRate,
          maximum: maxHeartRate,
        },
        token
      );

      const newDate = new Date(result.detail.lastUpdated);
      setLastUpdated(newDate.toLocaleString());

      alert("Threshold updated successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchThreshold = async () => {
      try {
        const result = await getElderHeartRateThreshold(user.email);
        setMinHeartRate(result.detail.minimum);
        setMaxHeartRate(result.detail.maximum);

        const newDate = new Date(result.detail.lastUpdated);
        setLastUpdated(newDate.toLocaleString());
      } catch (error) {
        alert(error.message);
      }
    };

    fetchThreshold();
  }, [user]);

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 bg-curaWhite">
      <View className="flex flex-column flex-1">
        <Header />

        <View className="mb-8 p-4 w-full flex-1 bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60  rounded-xl">
          <ScreenTitle title="Heart Rate Threshold" />

          <Text className=" text-base font-SatoshiMedium  text-curaBlack leading-5  text-left">
            Adjust preferred minimum and maximum threshold. The values indicated
            below is the average range of BPM based on the elderly’s age.
          </Text>
          <View className="flex-1 p-4">
            <View className="py-4">
              <ThresholdItem
                title="Minimum"
                value={minHeartRate}
                onChange={setMinHeartRate}
              />
            </View>

            <View className="py-4">
              <ThresholdItem
                title="Maximum"
                value={maxHeartRate}
                onChange={setMaxHeartRate}
              />
            </View>

            {lastUpdated && (
              <Text className="text-[18px] font-SatoshiMedium text-center mt-4">
                Last Updated: {lastUpdated}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className="px-4 py-3 rounded-xl w-full mb-4 bg-primary"
            onPress={handleChangeThreshold}
          >
            <Text className="text-[18px] text-center font-SatoshiBold text-white">
              Change Threshold
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
