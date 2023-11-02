import React from "react";
import { View, Text } from "react-native";
import Lottie from "lottie-react-native";

const MovementStatus = ({ isActive = false }) => {
  return (
    <View className="flex flex-row justify-center items-center">
      <View>
        {isActive ? (
          <Lottie
            source={require("../assets/images/movement/movement_active_status.json")}
            autoPlay
            style={{
              width: 25,
              height: 25,
            }}
          />
        ) : (
          <Lottie
            source={require("../assets/images/movement/movement_inactive_status.json")}
            autoPlay
            style={{
              width: 25,
              height: 25,
            }}
          />
        )}
      </View>
      <View>
        <Text>{isActive ? "Currently Home" : "Away"} </Text>
      </View>
    </View>
  );
};

export default MovementStatus;
