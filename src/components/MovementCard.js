import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import IconBtn from "../components/IconBtn";
import curaTheme from "../theme/theme";

export default function MovementCard({ locationString, date_time }) {
  return (
    <View className="flex flex-row py-4 mb-4 w-full items-center bg-curaWhite border border-curaGray/20 shadow-sm shadow-curaBlack/60  rounded-xl">
      {/* Image */}
      <IconBtn
        name="location"
        iconStyle={{
          color: curaTheme.lightColors.errorDark,
          marginHorizontal: 24,
        }}
        height={32}
        width={32}
      />
      {/* Text on the right side */}
      <View className="pr-24">
        <Text className="text-lg text-curaBlack font-SatoshiBold">
          {locationString}
        </Text>
        <Text className="text-xs font-SatoshiMedium text-curaGray">
          {date_time}
        </Text>
      </View>
    </View>
  );
}
