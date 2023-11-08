import { View, Text } from "react-native";
import React from "react";

export default function convertUTCtoVancouverTime(utcTimestamp) {
  const vancouverTimezone = "America/Vancouver";
  const vancouverDate = new Date(utcTimestamp);

  // Adjust the Vancouver date to the specified timezone
  const vancouverTime = vancouverDate.toLocaleString("en-US", {
    timeZone: vancouverTimezone,
    hour: "numeric",
    hour12: true, // Display in 12-hour format with am/pm
  });

  return vancouverTime;
}
