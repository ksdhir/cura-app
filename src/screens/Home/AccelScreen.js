// import React, { useState, useEffect } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Accelerometer } from "expo-sensors";
// import { useNavigation } from "@react-navigation/native";

// export default function AccelScreen() {
//   const navigation = useNavigation();

//   const [{ x, y, z }, setData] = useState({
//     x: 0,
//     y: 0,
//     z: 0,
//   });
//   const [subscription, setSubscription] = useState(null);

//   const _slow = () => Accelerometer.setUpdateInterval(1000);
//   const _fast = () => Accelerometer.setUpdateInterval(16);

//   const _subscribe = () => {
//     setSubscription(Accelerometer.addListener(setData));
//   };

//   const _unsubscribe = () => {
//     subscription && subscription.remove();
//     setSubscription(null);
//   };

//   useEffect(() => {
//     _subscribe();
//     return () => _unsubscribe();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>
//         Accelerometer: (in gs where 1g = 9.81 m/s^2)
//       </Text>
//       <Text style={styles.text}>x: {x}</Text>
//       <Text style={styles.text}>y: {y}</Text>
//       <Text style={styles.text}>z: {z}</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           onPress={subscription ? _unsubscribe : _subscribe}
//           style={styles.button}
//         >
//           <Text>{subscription ? "On" : "Off"}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={_slow}
//           style={[styles.button, styles.middleButton]}
//         >
//           <Text>Slow</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={_fast} style={styles.button}>
//           <Text>Fast</Text>
//         </TouchableOpacity>
//       </View>
//       <View className="flex-col justify-center items-center w-full p-8 space-y-3">
//         <TouchableOpacity
//           className="w-full bg-slate-300 p-4 rounded-lg flex justify-center items-center "
//           onPress={() => navigation.navigate("HomeScreen")}
//         >
//           <Text className=" text-slate-800 text-base font-bold">
//             Go Back To Home
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 20,
//   },
//   text: {
//     textAlign: "center",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     alignItems: "stretch",
//     marginTop: 15,
//   },
//   button: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#eee",
//     padding: 10,
//   },
//   middleButton: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: "#ccc",
//   },
// });

import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Accelerometer } from "expo-sensors";
// import {
//   FallDetectionEmitter,
//   start,
// } from "react-native-fall-detection-module";

const AccelScreen = () => {
  // Constants for defining fall thresholds
  const ACCELERATION_THRESHOLD = 9.8; // Adjust this value based on your needs
  const IMPACT_DURATION_THRESHOLD = 200; // Adjust this value based on your needs

  // Variables to track fall detection
  let isFallDetected = false;
  let fallStartTime = 0;

  Accelerometer.addListener(({ x, y, z }) => {
    // Calculate acceleration magnitude
    const acceleration = Math.sqrt(x * x + y * y + z * z);

    if (acceleration > ACCELERATION_THRESHOLD) {
      if (!isFallDetected) {
        // A high acceleration is detected, possibly the start of a fall
        isFallDetected = true;
        fallStartTime = Date.now();
      } else {
        // A fall is still detected, check for impact duration
        const currentTime = Date.now();
        if (currentTime - fallStartTime >= IMPACT_DURATION_THRESHOLD) {
          // Impact duration threshold exceeded, consider it a fall
          handleFallDetected();
        }
      }
    } else {
      // Reset fall detection if acceleration drops below the threshold
      isFallDetected = false;
      fallStartTime = 0;
    }
  });

  function handleFallDetected() {
    // Implement your fall detection response here
    // You can trigger notifications or take other actions.
    console.log("Fall detected");
  }
  return (
    <View>
      <Text>Test Fall Detection</Text>
    </View>
  );
};

export default AccelScreen;
