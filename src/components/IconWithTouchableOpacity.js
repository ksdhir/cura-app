import React from "react";
import { TouchableOpacity, Image } from "react-native";

// Define your icon mapping
const iconMapping = {
  HeartNormal: require("../assets/icons/heart/heart-normal1x.svg"),
  HeartLow: require("../assets/icons/heart/heart-low1x.svg"),
  Graph: require("../assets/icons/svg/graph.svg"),
  Logout: require("../assets/icons/svg/logout.svg"),
  // Add more icons here
};

const IconWithTouchableOpacity = ({ name, onPress, width, height, style }) => {
  // Get the corresponding SVG source based on the name
  const iconSource = iconMapping[name];

  if (!iconSource) {
    // Handle unknown icon names
    return null; // You can return null or show a default icon
  }

  return (
    <TouchableOpacity
      className="bg-primary p-[6px] rounded-md"
      onPress={onPress}
    >
      <Image
        source={iconSource}
        style={{
          width,
          height,
          ...style,
        }}
      />
    </TouchableOpacity>
  );
};

export default IconWithTouchableOpacity;
