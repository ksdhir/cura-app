import auth from "@react-native-firebase/auth";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const testPushNotification = async (email, token) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/elder/append-notification-record`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          type: "TEST_NOTIFICATION",
          location: ["48.2253215", "-123.0911397"],
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error.message);
    throw Error("Could not test notification");
  }
};

export const elderSignUp = async (body, token) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/elder/profile`,
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
    return null;
  }
};

export const getElderEmailFromCaregiverEmail = async (caregiverEmail) => {
  try {
    const token = await auth().currentUser.getIdToken();
    const url = `${apiUrl}/caregiver/profile?email=${caregiverEmail}`;

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
    console.error("error", error.message);
    throw Error("Could not get elder profile");
  }
};

export const getElderProfile = async (email, token) => {
  try {
    const response = await fetch(`${apiUrl}/elder/profile?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
    });
    const x = await response.json();
    return x;
  } catch (error) {
    console.error("error", error.message);

    return null;
  }
};

//api/elder/heart-rate-detail
//http://192.168.56.1:3003/api/elder/heart-rate-details?email=trinapreet@gmail.com

export const getElderHeartRateDetail = async (email) => {
  try {
    const token = await auth().currentUser.getIdToken();
    const response = await fetch(
      `${apiUrl}/elder/heart-rate-details?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error", error.message);
    throw Error("Could not get elder heartrate detail");
  }
};

//http://192.168.56.1:3003/api/elder/heart-threshold?email=trinapreet@gmail.com

export const getElderHeartRateThreshold = async (email) => {
  try {
    const token = await auth().currentUser.getIdToken();
    const response = await fetch(
      `${apiUrl}/elder/heart-threshold?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error.message);
    throw Error("Could not get elder heartrate threshold");
  }
};

export const updateElderHeartRateThreshold = async (body, token) => {
  try {
    const response = await fetch(`${apiUrl}/elder/heart-threshold`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: JSON.stringify(body),
    });

    return response.json();
  } catch (error) {
    console.error("error", error.message);
    throw Error("Could not set elder heartrate threshold");
  }
};

//weekly-heart-rate-data-visualisation
//http://10.0.0.113:3003/api/elder/weekly-heart-rate-data-visualisation?email=trinapreet@gmail.com

export const getElderWeeklyHeartRateDataVisualisation = async (email) => {
  try {
    const token = await auth().currentUser.getIdToken();
    const response = await fetch(
      `${apiUrl}/elder/weekly-heart-rate-data-visualisation?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error", error.message);
    throw Error("Could not get elder weekly heart rate data visualisation");
  }
};

export const setElderHeartRateDetail = async (body) => {
  try {
    if (body.email == null || body.email == undefined) {
      throw Error("Email is null");
    }

    const token = await auth().currentUser.getIdToken();

    const response = await fetch(`${apiUrl}/elder/heart-rate-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ?? ""}`,
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("error", error.message);
    throw Error("Could not set elder heartrate detail");
  }
};

//daily-heart-rate-data-visualisation
//http://10.0.0.113:3003/api/elder/daily-heart-rate-data-visualisation?email=trinapreet@gmail.com

export const getElderDailyHeartRateDataVisualisation = async (email) => {
  try {
    const token = await auth().currentUser.getIdToken();
    const response = await fetch(
      `${apiUrl}/elder/daily-heart-rate-data-visualisation?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token ?? ""}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("error", error.message);
    throw Error("Could not get elder daily heart rate data visualisation");
  }
};

// ============================> PUSH NOTIFICATIONS APIS

export const fallDetectedPushNotification = async (email, token, payload) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/elder/append-notification-record`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          type: "FALL_DETECTED",
          payload: payload,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error.message);
    throw Error("Could not test notification");
  }
};

export const movementPushNotification = async (
  email,
  latitude,
  longitude,
  token
) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/elder/append-notification-record`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          type: "MOVEMENT_LOCATION",
          payload: {
            location: {
              latitude: latitude,
              longitude: longitude,
            },
          },
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error.message);
    throw Error("Could not test notification");
  }
};

export const heartRatePushNotification = async (email, token, payload) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/elder/append-notification-record`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          type: "CRITICAL_HEART_RATE",
          payload,
        }),
      }
    );

    return response.json();
  } catch (error) {
    console.error("error", error.message);
    throw Error("Could not test notification");
  }
};

export const criticalHeartRateNotification = async (email, token, payload) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/elder/append-notification-record`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          type: "CRITICAL_HEART_RATE",
          payload: payload,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error", error.message);
    throw Error("Could not test notification");
  }
};

// ============================> PUSH NOTIFICATIONS APIS ENDS

export const addEmergencyContact = async (body, token) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/elder/add-emergency-contact`,
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

    if (response.status === 400) {
      throw Error(data.detail);
    }

    return data;
  } catch (error) {
    throw Error(error.message);
  }
};
