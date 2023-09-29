import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function TestButton({ onPress, title }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 my-2"
    >
      <Text className="text-neutral-200">{title}</Text>
    </TouchableOpacity>
  );
}
