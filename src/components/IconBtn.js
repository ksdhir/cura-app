import React from "react";
import { TouchableOpacity, Image } from "react-native";
import BellIcon from "../assets/icons/svg/notification.svg";
import BackIcon from "../assets/icons/svg/back.svg";

// Define your icon mapping
const iconMapping = {
  back: BackIcon,
  bell: BellIcon,
};

const IconWithTouchableOpacity = ({
  name,
  onPress,
  width,
  height,
  iconStyle = {},
  bgStyle = {},
  bgClassName,
}) => {
  // Get the corresponding SVG source based on the name
  const IconSource = iconMapping[name];

  if (!IconSource) {
    console.error("No icon found for name:", name);

    // Handle unknown icon names
    return null; // You can return null or show a default icon
  }

  return (
    <TouchableOpacity
      className={`"bg-primary p-[6px] rounded-md" ${bgClassName}`}
      onPress={onPress}
      style={bgStyle}
    >
      <IconSource
        width={width ?? 28}
        height={height ?? 28}
        style={{
          color: "#000",
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default IconWithTouchableOpacity;
