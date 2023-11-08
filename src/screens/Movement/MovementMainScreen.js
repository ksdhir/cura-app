import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

// movement history screen
import MovementHistoryScreen from "./MovementHistoryScreen";
import MovementStatus from "../../components/MovementStatus";

export default function MovementMainScreen() {
  const navigation = useNavigation();
  const [isElderVisible, setIsElderVisible] = useState(true);

  // const elderVisible = require('../../assets/images/movement/elder-visible.png')
  // const elderGone = require('../../assets/images/movement/elder-gone.png')

  // Handle Images / Lottie Animations
  //
  // The Main Screen -> Calls the for the History Log of the Movement
  // Displays them in the History log Component
  // TODO: Integrate tomtom to display string of the location based on the coordinates

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-curaWhite">
      <StatusBar style="auto" />
      {/* Header of the Page */}
      <View className="w-full h-[10vh] justify-center px-8">
        <Text className="text-2xl text-neutral-800 font-SatoshiBold">
          Movement
        </Text>
      </View>
      {/* Main Content of the page */}
      <View className="h-[75vh] w-full p-8 flex space-y-8">
        {/* Dynamically Render the Image of the  */}
        {/* TODO: replace with lottie animation */}
        <View className="items-center">
          {isElderVisible ? (
            <Image
              source={require("../../assets/images/movement/elder_visible.png")}
            />
          ) : (
            <Image
              source={require("../../assets/images/movement/elder_gone.png")}
            />
          )}
          {/* display status */}
          <View>
            <MovementStatus isActive={isElderVisible} />
          </View>
        </View>
        <Text className="text-xl text-curaGray font-SatoshiBold">History</Text>
        <ScrollView className="">
          <MovementHistoryScreen />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
