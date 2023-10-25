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

export const elderSignUp = async (body, token) => {
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

export const getElderProfile = async (elderEmail) => {
  console.log("fetching elderProfile");

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log("sssdsddgdggddg" + apiUrl);

  try {
    //return from postman
    return {
      message: "Successfully fetched elder profile",
      profile: {
        emergencyContactRelationships: [],
        heartRateThreshold: {
          minimum: 95,
          maximum: 162,
          lastUpdated: "2023-10-14T23:01:11.410Z",
        },
        id: "652b1db7987df94e5d394d2b",
        name: "Trina Preet",
        preferredName: "Kat",
        age: 29,
        email: "trinapreet@gmail.com",
        phoneNumber: "5678987654",
        sex: "PREFER_NOT_TO_SAY",
        medicalConditions: null,
        medications: null,
        bloodType: null,
        allergies: null,
        notes: null,
        defaultLocation: ["49.2244201", "-123.1088805"],
        careGiverIds: ["652784a3e434ce7c4a569826", "653097a31b064b20f60c3a3f"],
        careGiverRelationships: {
          "ksinghdhir1@gmail.com": "friend",
        },
      },
    };

    const url = `${process.env.EXPO_PUBLIC_API_URL}/caregiver/profile?email=${elderEmail}`;
    console.log(url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("error", error.message);
    throw Error("Could not get elder profile");
  }
};

// /api/elder/heart-rate-detail

export const getElderHeartRateDetail = async (email) => {
  console.log("fetching elder heartrate detail");

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log(apiUrl);

  try {
    ///return from postman
    return {
      heartRateRecords: [
        {
          id: "653712ba0d5cf25e49273bc2",
          elderProfileId: "652b1db7987df94e5d394d2b",
          beatsPerMinute: 90,
          timestamp: "2023-10-24T00:27:47.621Z",
          weekAverage: 90,
          weekMin: 90,
          weekMax: 90,
        },
        {
          id: "6537131c0d5cf25e49273bc3",
          elderProfileId: "652b1db7987df94e5d394d2b",
          beatsPerMinute: 95,
          timestamp: "2023-10-23T00:27:47.621Z",
          weekAverage: 95,
          weekMin: 95,
          weekMax: 95,
        },
      ],
    };

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/elder/heart-rate-detail?email=${email}`
    );

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("error", error.message);
    throw Error("Could not get elder heartrate detail");
  }
};

//http://192.168.56.1:3003/api/elder/heart-threshold?email=trinapreet@gmail.com

export const getElderHeartRateThreshold = async (email) => {
  console.log("fetching elder heartrate threshold");

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  console.log(apiUrl);

  try {
    ///return from postman
    return {
      message: "Threshold fetched successfully",
      detail: {
        minimum: 95,
        maximum: 162,
        lastUpdated: "2023-10-14T23:01:11.410Z",
      },
    };

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/elder/heart-threshold?email=${email}`
    );

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.log("error", error.message);
    throw Error("Could not get elder heartrate threshold");
  }
};
