import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function HeartRateThresholdScreen() {
  const navigation = useNavigation();

  const [minHeartRate, setMinHeartRate] = useState(80);
  const [maxHeartRate, setMaxHeartRate] = useState(110);
  const [data, setData] = useState();

  const handleMinHeartRate = (method) => {
    switch (method) {
      case "increment":
        setMinHeartRate(minHeartRate + 1);
        break;
      case "decrement":
        setMinHeartRate(minHeartRate - 1);
        break;
    }
  };

  const handleMaxHeartRate = (method) => {
    switch (method) {
      case "increment":
        setMaxHeartRate(maxHeartRate + 1);
        break;
      case "decrement":
        setMaxHeartRate(maxHeartRate - 1);
        break;
    }
  };

  const handleChangeThreshold = () => {
    console.log("change threshold");
  };

  return (
    <View className="flex-1 items-center justify-center white ">
      <StatusBar style="auto" />
      <View className="w-full flex-1 justify-center px-8">
        <Text className="text-2xl text-neutral-800 font-bold">
          HeartRate History
        </Text>
      </View>
      <View className="flex justify-center items-center">
        <Text className="">Minimum</Text>
        <View className="flex flex-row gap-6 justify-center items-center">
          <TouchableOpacity
            className="flex justify-center items-center"
            onPress={() => handleMinHeartRate("decrement")}
          >
            <Text className="text-2xl bg-[#09C1CB] rounded-full px-2">-</Text>
          </TouchableOpacity>
          <Text className="text-4xl">{minHeartRate}</Text>
          <TouchableOpacity
            className="flex justify-center items-center"
            onPress={() => handleMinHeartRate("increment")}
          >
            <Text className="text-2xl bg-[#09C1CB] rounded-full px-2">+</Text>
          </TouchableOpacity>
        </View>
        <Text>BPM</Text>
      </View>
      <View className="flex justify-center items-center">
        <Text className="">Maximum</Text>
        <View className="flex flex-row gap-6 justify-center items-center">
          <TouchableOpacity
            className="flex justify-center items-center"
            onPress={() => handleMaxHeartRate("decrement")}
          >
            <Text className="text-2xl bg-[#09C1CB] rounded-full px-2">-</Text>
          </TouchableOpacity>
          <Text className="text-4xl">{maxHeartRate}</Text>
          <TouchableOpacity
            className="flex justify-center items-center"
            onPress={() => handleMaxHeartRate("increment")}
          >
            <Text className="text-2xl bg-[#09C1CB] rounded-full px-2">+</Text>
          </TouchableOpacity>
        </View>
        <Text>BPM</Text>
      </View>
      <View>
        <TouchableOpacity
          className="bg-[#09C1CB] p-2 rounded-lg"
          onPress={() => handleChangeThreshold()}
        >
          <Text className="text-white text-lg">Change Threshold</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
