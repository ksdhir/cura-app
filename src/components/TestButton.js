import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function TestButton({ onPress, title }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="py-2 px-4 my-3 w-5/6 border border-transparent rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
    >
      <Text className="text-base text-center font-SatoshiBold text-curaBlack">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
