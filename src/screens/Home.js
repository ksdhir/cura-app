/// Apple Health Test Code
// import * as React from "react";
// import { useEffect, useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { StatusBar } from "expo-status-bar";

// import AppleHealthKit, {
//   HealthValue,
//   HealthKitPermissions,
// } from "react-native-health";

// const HealthMetrics = ({ label, value }) => {
//   return (
//     <View>
//       <Text>
//         {" "}
//         {label} of User: {value}{" "}
//       </Text>
//     </View>
//   );
// };

// const permissions = {
//   permissions: {
//     read: [
//       AppleHealthKit.Constants.Permissions.HeartRate,
//       AppleHealthKit.Constants.Permissions.Steps,
//     ],
//     write: [AppleHealthKit.Constants.Permissions.Steps],
//   },
// };

// export default function Home() {
//   const [hasPermissions, setHasPermissions] = useState(false);
//   const [steps, setSteps] = useState(0);

//   useEffect(() => {
//     AppleHealthKit.initHealthKit(permissions, (error) => {
//       /* Called after we receive a response from the system */

//       if (error) {
//         console.log("[ERROR] Cannot grant permissions!");
//       }

//       setHasPermissions(true);
//     });
//   }, []);

//   useEffect(() => {
//     if (hasPermissions) {
//       /* Can now read or write to HealthKit */

//       const options = {
//         startDate: new Date(2020, 1, 1).toISOString(),
//       };

//       // AppleHealthKit.getHeartRateSamples(
//       //   options,
//       //   (callbackError, results) => {
//       //     /* Samples are now collected from HealthKit */
//       //   },
//       // )

//       AppleHealthKit.getStepCount(options, (err, steps) => {
//         console.log("Steps", steps);
//         setSteps(steps.value);
//       });
//     }
//   }, [hasPermissions]);

//   return (
//     <View style={styles.container}>
//       <HealthMetrics label="Distance" value="4km" />
//       <HealthMetrics label="Steps" value={steps.toString()} />
//       <HealthMetrics label="Climb" value="456" />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "left",
//     justifyContent: "center",
//   },
// });

import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View
      View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <StatusBar style="auto" />
      <Text> Home Screen </Text>
      <Button
        title="Go to Second Screen"
        onPress={() => navigation.navigate("SecondScreen")}
      />
    </View>
  );
}
