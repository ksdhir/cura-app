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

export default function HeartRateThresholdScreen() {
  const [minHeartRate, setMinHeartRate] = useState(80);
  const [maxHeartRate, setMaxHeartRate] = useState(110);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { user, token } = useAuth();

  const handleChangeThreshold = async () => {
    try {
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
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4 bg-curaWhite">
      <Header />

      <View className="shadow-2xl p-4 bg-white flex-1 mb-4 justify-between">
        <View>
          <Text className="text-[20px] font-SatoshiBold text-[#263130] leading-5 mb-2 font-bold">
            Heart Rate Threshold
          </Text>

          <Text className="text-[16px] font-SatoshiMedium text-[#263130] leading-5">
            Adjust preferred minimum and maximum threshold. The values indicated
            below is the average range of BPM based on the elderly’s age.
          </Text>
        </View>

        <View className="flex-1">
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
    </SafeAreaView>
  );
}
