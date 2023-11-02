import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@rneui/themed";
import curaTheme from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import React from "react";
import { useState, useEffect } from "react";
import "expo-dev-client";


import { locationPermission, getLocationCoords, runLocationDetectionProcess } from "./src/hooks/locationPermission";


export default function App() {

  useEffect(() => {
    locationPermission().then((permission) => {
      if (permission) {
        return getLocationCoords()
      }
    }).then(coordsObj => {
      // console.log(coordsObj)
      runLocationDetectionProcess()
    });
  }, []);

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
