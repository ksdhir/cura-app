export const caregiverSignup = async (body, options) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/caregiver/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
        ...options,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error.message);
    return null;
  }
};
