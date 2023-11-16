import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

import LocationSvg from "../assets/icons/svg/location.svg";

export default function MovementCard({ locationString, date_time }) {
  return (
    <View className="flex flex-row my-4">
      {/* Image */}
      <View className="flex-shrink px-3">
        {/* <Image source={require("../assets/images/movement/mdi_location.svg")} /> */}
        <LocationSvg
          style={{
            width: 24,
            height: 24,
            color: "#EF5B3B",
          }}
        />
      </View>
      {/* Text on the right side */}
      <View className="flex-1">
        <Text className="text-lg text-curaBlack font-SatoshiBold">{locationString}</Text>
        <Text className="text-xs font-SatoshiMedium text-curaGray">{date_time}</Text>
      </View>
    </View>
  );
}
