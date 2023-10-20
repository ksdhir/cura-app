import { auth } from "../utils/FirebaseConfig";

export const testPushNotification = async () => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/elder/append-notification-record`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: auth.currentUser.email,
          type: "TEST_NOTIFICATION",
          location: ["48.2253215", "-123.0911397"],
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error.message);
    throw Error("Could not test notification");
  }
};
