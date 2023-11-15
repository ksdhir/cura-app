import { auth } from "../utils/FirebaseConfig";

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

    const url = `${process.env.EXPO_PUBLIC_API_URL}/caregiver/store-push-notification-token?email=${email}&token=${expoToken}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
  const allValidTypes = ["CRITICAL_HEART_RATE", "FALL_DETECTED", "MOVEMENT_LOCATION"];

  try {
    if (allValidTypes.includes(type) === false) {
      throw new Error("Invalid type");
    }

    const url = `${process.env.EXPO_PUBLIC_API_URL}/caregiver/all-notification-log?elderEmail=${elderEmail}&type=${type}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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



// /api/caregiver/all-notification-log

// http://192.168.56.1:3003/api/caregiver/all-notification-log?elderEmail=trinapreet@gmail.com&type=CRITICAL_HEART_RATE

//pass in elderEmail
export const getAllNotificationLog = async (elderEmail) => {

  try {
    return {
      notificationLog: [
        {
          id: "65371ac2a8de82acefb6073c",
          timestamp: "2023-10-24T01:15:46.570Z",
          type: "CRITICAL_HEART_RATE",
          location: ["48.2253215", "-123.0911397"],
          elderProfileId: "652b1db7987df94e5d394d2b",
        },
        {
          id: "65371abfa8de82acefb6073b",
          timestamp: "2023-10-24T01:15:43.087Z",
          type: "CRITICAL_HEART_RATE",
          location: ["48.2253215", "-123.0911397"],
          elderProfileId: "652b1db7987df94e5d394d2b",
        },
        {
          id: "65371a2ea8de82acefb6073a",
          timestamp: "2023-10-24T01:13:18.400Z",
          type: "CRITICAL_HEART_RATE",
          location: ["48.2253215", "-123.0911397"],
          elderProfileId: "652b1db7987df94e5d394d2b",
        },
      ],
    };
    const url = `${process.env.EXPO_PUBLIC_API_URL}/caregiver/all-notification-log?elderEmail=${elderEmail}&type=CRITICAL_HEART_RATE`;
    console.log(url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
