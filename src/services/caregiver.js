import { auth } from "../utils/FirebaseConfig";

export const caregiverSignup = async (body, token) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/caregiver/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error.message);
    return null;
  }
};

export const saveNotificationToken = async (expoToken) => {
  try {
    const email = auth.currentUser.email;

    const url = `${process.env.EXPO_PUBLIC_API_URL}/caregiver/store-push-notification-token?email=${email}&token=${expoToken}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
