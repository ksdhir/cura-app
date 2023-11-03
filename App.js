import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@rneui/themed";
import curaTheme from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import React from "react";
import { useState, useEffect } from "react";
import "expo-dev-client";

import {
  locationPermission,
  getLocationCoords,
  runLocationDetectionProcess,
} from "./src/hooks/locationPermission";

export default function App() {

  const isPermissionsOn = false
  const [isOnce, setIsOnce] = useState(false);

  useEffect(() => {
    // call for permission after 2 seconds of loading of app

    if (!isOnce && isPermissionsOn) {
      setTimeout(() => {
        console.log("running locationdetection");
        initiatePermission();
        setIsOnce(true);
      }, 2000);
    }
  }, []);

  function initiatePermission() {
    // Location Permissions
    locationPermission()
      .then((permission) => {
        if (permission) {
          return getLocationCoords();
        }
      })
      .then((coordsObj) => {
        console.log(coordsObj, "coords object");
        runLocationDetectionProcess();
      });
  }

  return (
    <ThemeProvider theme={curaTheme}>
      <NavigationContainer>
        <AppNavigator
          style={{
            fontFamily: "Satoshi",
          }}
        />
        <StatusBar style="auto" />
      </NavigationContainer>
    </ThemeProvider>
  );
}
