import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

export default function MovementCard({ locationString, date_time }) {
  return (
    <View className="flex flex-row my-4">
      {/* Image */}
      <View className="flex-shrink">
        <Image source={require("../assets/images/movement/mdi_location.png")} />
      </View>
      {/* Text on the right side */}
      <View className="flex-1">
        <Text className="text-base font-semibold">{locationString}</Text>
        <Text className="text-sm text-gray-500">{date_time}</Text>
      </View>
    </View>
  );
}
