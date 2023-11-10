import * as Location from "expo-location";

export default currentLocation = async () => {
  try {
    const { status: foregroundStatus } =
      await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== "granted") {
      throw new Error("Foreground permission not granted");
    }

    const location_now = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });

    const latitude = location_now?.coords?.latitude;
    const longitude = location_now?.coords?.longitude;

    if (latitude && longitude) {
      return { latitude, longitude };
    } else {
      throw new Error("Could not get location coords");
    }
  } catch (error) {
    throw Error("Could not get location coords");
  }
};
