import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import curaTheme from "../theme/theme"; // Assuming you're using React Native

const Icon = ({ icon, width = 28, height = 28, style, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: curaTheme.lightColors.primary, // Replace with your desired background color
          color: "#fff", // Replace with your desired color
          padding: 6,
          borderRadius: 8,
        },
        style, // Merge the provided style
      ]}
      onPress={onPress}
    >
      {icon} {/* Render the provided icon */}
    </TouchableOpacity>
  );
};

Icon.propTypes = {
  icon: PropTypes.element, // Pass your custom icon component here
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  onPress: PropTypes.func,
};

export default Icon;
