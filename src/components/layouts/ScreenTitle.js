import { View, Text } from "react-native";
import React from "react";

export default function ScreenTitle({ title }) {
  return (
    <View className="w-full ">
      <Text className=" w-full text-5xl text-curaBlack font-SatoshiBold text-left ">
        {title}
      </Text>
    </View>
  );
}
