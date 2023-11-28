import { Accelerometer } from "expo-sensors";
import useDebouce from "./debounce";

export const useFallDetectionChecker = (
  email: string,
  token: any,
  navigation: any
) => {
  const ACCELERATION_THRESHOLD = 5; // Adjust this value based on your needs
  // const IMPACT_DURATION_THRESHOLD = 200;
  // const IMPACT_MAGNITUDE_THRESHOLD = 3;
  // let fallStartTime: number = 0;

  let isFallDetected: boolean = false;
  let subscription: any = null;

  const debouncer = useDebouce((magnitude: number) => {
    // Reset fall detection
    isFallDetected = false;
    console.log("Fall Detected");

    // Nagivate to Fall Detected Screen
    navigation.navigate("Home", {
      screen: "AccountStack",
      params: { screen: "ElderFallConfirmationScreen" },
    });

    // For Testing
    // navigation.navigate("AccountStack", {
    //   screen: "ElderFallDetectedScreen",
    //   params: {
    //     elderPhoneNumber: "1234567890",
    //     elderName: "Rocky Balboa",
    //     location: "236 Main St, Vancouver, BC V6A 1A1",
    //   },
    // });
  }, 500);

  const _subscribe = () => {
    subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitute = Math.sqrt(x * x + y * y + z * z);
      if (!isFallDetected && magnitute > ACCELERATION_THRESHOLD) {
        isFallDetected = true;
        debouncer(magnitute);
      }
    });
  };
  return _subscribe;
};

export const unsubscribeFallDetectionChecker = (falldetection: any) => {
  falldetection.remove();
};
