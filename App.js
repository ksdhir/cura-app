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

export default function App() {

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
