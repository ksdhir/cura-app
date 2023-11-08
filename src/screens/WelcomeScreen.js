import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export default function WelcomeScreen() {
  GoogleSignin.configure({
    webClientId:
      "547674373172-ljlld4shohia9uo53nekvad6lnn8nmt3.apps.googleusercontent.com",
  });

  const navigation = useNavigation();

  const onGoogleButtonPress = async () => {
    console.log("GOOGLE BUTTON PRESSED");

    const { idToken } = await GoogleSignin.signIn();

    console.log("ID TOKEN", idToken);

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    try {
      const user = await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-teal-300  justify-center items-center">
      <View className="flex-1 flex justify-around  my-4">
        <Text className="text-gray-800 font-SatoshiBold text-4xl text-center pt-4">
          Welcome to CURA!
        </Text>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/welcome.png")}
            style={{ width: 350, height: 350 }}
          />
        </View>
        <View className="space-y-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="py-3 bg-indigo-500 mx-4 rounded-xl"
          >
            <Text className="text-xl font-SatoshiBold text-center text-gray-200">
              Sign Up
            </Text>
          </TouchableOpacity>
          <Text className="text-xl text-gray-800 font-SatoshiBold text-center py-1">
            Or
          </Text>
          {/* <View className="flex-row self-center"> */}
          <TouchableOpacity
            className=" mx-4 flex-row items-center justify-center placeholder:p-3 bg-gray-100 rounded-xl"
            onPress={onGoogleButtonPress}
          >
            <Text className="text-xl font-SatoshiBold text-slate-800 placeholder:pr-2">
              Sign In With Google
            </Text>
            <Image
              source={require("../assets/icons/google.png")}
              className="w-8 h-8"
            />
          </TouchableOpacity>
          {/* </View> */}
          <View className="flex-row justify-center">
            <Text className="text-gray-800 font-semibold">
              Sign in with email instead?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-indigo-500"> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
