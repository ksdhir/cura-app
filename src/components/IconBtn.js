import React from "react";
import { TouchableOpacity, Image } from "react-native";
import BellIcon from "../assets/icons/svg/notification.svg";
import BackIcon from "../assets/icons/svg/back.svg";
import EditIcon from "../assets/icons/svg/edit.svg";
import LocationIcon from "../assets/icons/svg/location.svg";
import MonitoringIcon from "../assets/icons/svg/monitoring.svg";
import AvatarIcon from "../assets/icons/svg/avatar.svg";
import AddIcon from "../assets/icons/svg/add.svg";
import SubtractIcon from "../assets/icons/svg/subtract.svg";
import ElderlyIcon from "../assets/icons/svg/elderly.svg";
import CaregiverIcon from "../assets/icons/svg/caregiver.svg";
import PolygonUp from "../assets/icons/svg/polygonup.svg";
import PolygonDown from "../assets/icons/svg/polygondown.svg";
import CriticalHeartrate from "../assets/icons/svg/criticalheartrate.svg";
import FallDetected from "../assets/icons/svg/falldetection.svg";
import ElderFarFromHome from "../assets/icons/svg/monitoring.svg";
import Location from "../assets/icons/svg/location.svg";

// Define your icon mapping
const iconMapping = {
  back: BackIcon,
  bell: BellIcon,
  edit: EditIcon,
  location: LocationIcon,
  monitoring: MonitoringIcon,
  avatar: AvatarIcon,
  add: AddIcon,
  subtract: SubtractIcon,
  caregiver: CaregiverIcon,
  elderly: ElderlyIcon,
  polygonup: PolygonUp,
  polygondown: PolygonDown,
  criticalHeartrate: CriticalHeartrate,
  fallDetected: FallDetected,
  elderFarFromHome: ElderFarFromHome,
  location: Location,
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
    // console.error("No icon found for name:", name);

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
