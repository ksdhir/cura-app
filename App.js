import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@rneui/themed";
import curaTheme from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import React from "react";
import { useState, useEffect } from "react";
import "expo-dev-client";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

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

  const [fontsLoaded] = useFonts({
    SatoshiMedium: require("./src/assets/fonts/Satoshi-Medium.otf"),
    SatoshiBold: require("./src/assets/fonts/Satoshi-Bold.otf"),
    SatoshiBlack: require("./src/assets/fonts/Satoshi-Black.otf"),
    // for testing
    LemonLove: require("./src/assets/fonts/Lemon-Love.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);
  return (
    <ThemeProvider theme={curaTheme}>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </ThemeProvider>
  );
}
