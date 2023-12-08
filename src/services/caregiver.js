import auth from "@react-native-firebase/auth";

export const getCaregiverProfile = async (email, token) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/caregiver/profile?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    console.error("error", error.message);
    return null;
  }
};

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
    console.error("error", error.message);
    return null;
  }
};

export const saveNotificationToken = async (expoToken, email) => {
  try {
    const token = await auth().currentUser.getIdToken();
    const url = `${process.env.EXPO_PUBLIC_API_URL}/caregiver/store-push-notification-token?email=${email}&token=${expoToken}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    });

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

// =============================> SPECIFIC TYPE NOTIFICATION LOGS

export const getSpecificNotificationLog = async (elderEmail, type) => {
  const allValidTypes = [
    "CRITICAL_HEART_RATE",
    "FALL_DETECTED",
    "MOVEMENT_LOCATION",
  ];

  try {
    if (allValidTypes.includes(type) === false) {
      throw new Error("Invalid type");
    }

    const token = await auth().currentUser.getIdToken();
    const url = `${process.env.EXPO_PUBLIC_API_URL}/caregiver/all-notification-log?elderEmail=${elderEmail}&type=${type}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

// =============================> SPECIFIC TYPE NOTIFICATION LOGS ENDS

// ================================= get all notification logs

// As of now make it simple, the name of the event and timestamp, example Fall Detected at human_readable_time
// This will returns notification logs.
// /api/caregiver/all-notification-log?elderEmail=elder@cura-app.ca&type=ALL

export const getAllNotificationLog = async (elderEmail, type) => {
  const allValidTypes = [
    "CRITICAL_HEART_RATE",
    "FALL_DETECTED",
    "MOVEMENT_LOCATION",
    "ALL",
  ];

  try {
    if (allValidTypes.includes(type) === false) {
      throw new Error("Invalid type");
    }

    const token = await auth().currentUser.getIdToken();
    const url = `${process.env.EXPO_PUBLIC_API_URL}/caregiver/all-notification-log?elderEmail=${elderEmail}&type=${type}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
