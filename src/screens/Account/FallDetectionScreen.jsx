import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Accelerometer } from "expo-sensors";

const FallDetectionScreen = () => {
  const ACCELERATION_THRESHOLD = 5; // Adjust this value based on your needs
  const IMPACT_DURATION_THRESHOLD = 200; // Adjust this value based on your needs

  let isFallDetected = false;
  let fallStartTime = 0;

  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [magnitude, setMagnitude] = useState(0);

  const [subscription, setSubscription] = useState(null);
  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(({ x, y, z }) => {
        const magnitute = Math.sqrt(x * x + y * y + z * z);
        setData({ x, y, z });
        if (magnitute > ACCELERATION_THRESHOLD) {
          // console.log("Fall detected with magnitude: ", magnitute);
          setMagnitude(magnitute);
          isFallDetected = true;
        }
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const inactive = "mt-8 text-xl";
  const active = "mt-8 text-xl text-red-500";

  return (
    <View className="justify-center items-center h-full">
      <Text>Test Fall Detection</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Accelerometer: (in gs where 1g = 9.81 m/s^2)
        </Text>
        <Text style={styles.text}>x: {x}</Text>
        <Text style={styles.text}>y: {y}</Text>
        <Text style={styles.text}>z: {z}</Text>
        <Text
          style={styles.text}
          className={magnitude === 0 ? inactive : active}
        >
          Fall Magnitude: {magnitude}
        </Text>
        <Text style={styles.text}>
          Magnitute Threshold: {ACCELERATION_THRESHOLD}
        </Text>
        <Text style={styles.text}>
          (lowered for testing purposes, should be around 10)
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{subscription ? "On" : "Off"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textContainer: {},
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});

export default FallDetectionScreen;
