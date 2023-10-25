import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@rneui/themed";
import curaTheme from "./src/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import React from "react";

export default function App() {
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
