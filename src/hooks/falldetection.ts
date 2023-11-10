import { Accelerometer } from "expo-sensors";
import { fallDetectedPushNotification } from "../services/elder";
import currentLocation from "../utils/getCurrentLocation";

export const useFallDetectionChecker = (email: string, token: any) => {
  const ACCELERATION_THRESHOLD = 5; // Adjust this value based on your needs
  const IMPACT_DURATION_THRESHOLD = 200;
  const IMPACT_MAGNITUDE_THRESHOLD = 3;

  let isFallDetected: boolean = false;
  let fallStartTime: number = 0;
  let subscription: any = null;

  const _subscribe = () => {
    subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitute = Math.sqrt(x * x + y * y + z * z);
      if (magnitute > ACCELERATION_THRESHOLD) {
        console.log("Fall detected with magnitude: ", magnitute);
        isFallDetected = true;
        // Call Push Notification
        // get locatioon
        currentLocation().then((location) => {
          const payload = {
            location: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          };
          fallDetectedPushNotification(email, token, payload);
        });
      }
    });
  };

  return _subscribe;
};

export const unsubscribeFallDetectionChecker = (falldetection: any) => {
  falldetection.remove();
};
