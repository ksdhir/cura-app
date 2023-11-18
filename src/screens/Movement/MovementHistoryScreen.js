import { View, Text } from "react-native";
import React from "react";

// import components
import MovementCard from "../../components/MovementCard";

export default function MovementHistoryScreen({ movements }) {
  return (
    <View>
      <View>{!movements.length && <Text>No Data Found</Text>}</View>
      {movements.map((movement, idx) => (
        <MovementCard
          key={idx}
          locationString={movement.locationString}
          date_time={new Date(movement.date).toLocaleString("en-US")}
        ></MovementCard>
      ))}
    </View>
  );
}
