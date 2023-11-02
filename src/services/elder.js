import { auth } from "../utils/FirebaseConfig";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

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
    console.log("error", error.message);
    return null;
  }
};

export const getElderEmailFromCaregiverEmail = async (caregiverEmail) => {
  // console.log("fetching elderEmail");

  try {
    const url = `${apiUrl}/caregiver/profile?email=${caregiverEmail}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data);
    console.log("Successfully fetching elderEmail");

    return data;
  } catch (error) {
    console.log("error", error.message);
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

    return response.json();
  } catch (error) {
    console.log("error", error.message);

    return null;
  }
};

//api/elder/heart-rate-detail
//http://192.168.56.1:3003/api/elder/heart-rate-details?email=trinapreet@gmail.com

export const getElderHeartRateDetail = async (email) => {
  // console.log("fetching elder heartrate detail");

  try {
    const response = await fetch(
      `${apiUrl}/elder/heart-rate-details?email=${email}`
    );

    const data = await response.json();
    // console.log(data);
    console.log("Successfully fetching elder heartrate detail");

    return data;
  } catch (error) {
    console.log("error", error.message);
    throw Error("Could not get elder heartrate detail");
  }
};

//http://192.168.56.1:3003/api/elder/heart-threshold?email=trinapreet@gmail.com

export const getElderHeartRateThreshold = async (email) => {
  // console.log("fetching elder heartrate threshold");

  try {
    const response = await fetch(
      `${apiUrl}/elder/heart-threshold?email=${email}`
    );

    const data = await response.json();
    // console.log(data);
    console.log("Successfully fetching elder heartrate threshold");

    return data;
  } catch (error) {
    console.log("error", error.message);
    throw Error("Could not get elder heartrate threshold");
  }
};

//weekly-heart-rate-data-visualisation
//http://10.0.0.113:3003/api/elder/weekly-heart-rate-data-visualisation?email=trinapreet@gmail.com

export const getElderWeeklyHeartRateDataVisualisation = async (email) => {
  // console.log("fetching elder weekly heart rate data visualisation");

  try {
    const response = await fetch(
      `${apiUrl}/elder/weekly-heart-rate-data-visualisation?email=${email}`
    );

    const data = await response.json();
    // console.log(data);
    console.log(
      "Successfully fetching elder weekly heart rate data visualisation"
    );

    return data;
  } catch (error) {
    console.log("error", error.message);
    throw Error("Could not get elder weekly heart rate data visualisation");
  }
};

export const setElderHeartRateDetail = async (body) => {
  try {
    if (body.email == null || body.email == undefined) {
      throw Error("Email is null");
    }

    const response = await fetch(`${apiUrl}/elder/heart-rate-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(response.json());
  } catch (error) {
    console.log("error", error.message);
    throw Error("Could not set elder heartrate detail");
  }
};
