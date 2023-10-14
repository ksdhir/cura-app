import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../utils/FirebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const focus = useIsFocused();

  const [userInfo, setUserInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId:
        "636016776817-dnlogoh0m9aesah3d5a10b9oprl012sd.apps.googleusercontent.com",
      redirectUri: makeRedirectUri(),
    },
    { useProxy: true }
  );

  const checkIfLoggedIn = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;

      if (user) {
        navigation.navigate("Home");
      }

      // return;
      // const userJSON = await AsyncStorage.getItem("@user");
      // if (!userJSON) return;

      // const userData = userJSON != null ? JSON.parse(userJSON) : null;

      //if there is a user logged in, navigate to home screen

      // if (userData != null) {
      //   navigation.navigate("Home");
      // }

      // setUserInfo(userData);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      try {
        const result = await signInWithCredential(auth, credential);
        navigation.navigate("Home");
      } catch (error) {
        alert(error.message);
      }

      //  .then((result) => {
      //     const user = result.user;
      //     setUserInfo(user);
      //     AsyncStorage.setItem("@user", JSON.stringify(user));
      //     navigation.navigate("Home");
      //   });
    }
  };

  React.useEffect(() => {
    handleGoogleLogin();
  }, [response]);

  useEffect(() => {
    if (focus) {
      checkIfLoggedIn();
    }
  }, [focus]);

  return (
    <SafeAreaView className="flex-1 bg-teal-500  justify-center items-center">
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white font-bold text-4xl text-center">
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
            className="py-3 bg-yellow-400 mx-4 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>
          <Text className="text-xl text-gray-700 font-bold text-center py-1">
            Or
          </Text>
          {/* <View className="flex-row self-center"> */}
          <TouchableOpacity
            className=" mx-4 flex-row items-center justify-center placeholder:p-3 bg-gray-100 rounded-xl"
            onPress={() => promptAsync()}
          >
            <Text className="text-xl font-bold text-slate-800 placeholder:pr-2">
              Sign In With Google
            </Text>
            <Image
              source={require("../assets/icons/google.png")}
              className="w-8 h-8"
            />
          </TouchableOpacity>
          {/* </View> */}
          <View className="flex-row justify-center">
            <Text className="text-white font-semibold">
              Sign in with email instead?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="font-semibold text-yellow-400"> Sign In</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-around">
            <TouchableOpacity
              onPress={() => navigation.navigate("TestAccelerometer")}
            >
              <Text className="font-semibold text-yellow-400">Accel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("TestGyro")}>
              <Text className="font-semibold text-yellow-400">Gyro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("TestGoogleHealth")}
            >
              <Text className="font-semibold text-yellow-400">HR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
