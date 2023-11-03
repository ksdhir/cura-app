import * as Location from "expo-location";

// import auth for user email
import auth from "@react-native-firebase/auth";

async function locationPermission() {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("status", status)
    if (status === "granted") {
      console.log(status, "status");
      return true;
    } else {
      throw Error("Could not get location permission");
    }
  } catch (error) {
    console.log(error);
    throw Error("Could not get location permission");
  }
}

async function getLocationCoords() {
  try {
    const location_now = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
    
    const latitude = location_now?.coords?.latitude;
    const longitude = location_now?.coords?.longitude;
    
    if (latitude && longitude) {
      return { latitude, longitude };
    } else {
      throw new Error("Could not get location coords")
    }
  } catch (error) {
    console.log(error);
    throw Error("Could not get location coords");
  }
}


function runLocationProcess() {

  let coords = null;
  let email = null;
  let profileType = null;
  
  // a callback hell
  getLocationCoords().then(coordsObj => {
    coords = coordsObj
    return coordsObj
  }).then(coordsObj => {
    if (email) {
      return email
    } else {
      return auth().currentUser?.email
    }    
  }).then(email => {
    if (email && coords) {
      console.log(email, coords)
      const customClaims = auth().currentUser?.customClaims;
      console.log(customClaims)
      profileType = customClaims?.profileType;
      return profileType
    } else {
      console.log("no email no coords")
    }
  }).then(profileType => {
    console.log(profileType)
  })
}

let isIntervalRunning = false;

function runLocationDetectionProcess() {
  if (!isIntervalRunning) {
    isIntervalRunning = true;
    setInterval(runLocationProcess, 5000); // Adjust the interval time as needed (e.g., 1000ms for 1 second)
  }
}


export { locationPermission, getLocationCoords, runLocationDetectionProcess };
