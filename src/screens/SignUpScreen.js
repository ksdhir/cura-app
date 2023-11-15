import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { elderSignUp } from "../services/elder";
import { caregiverSignup } from "../services/caregiver";
import Header from "../components/layouts/Header";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    // Validate the input
    if (!isValidEmail(email) || password.length < 6) {
      alert("Invalid input");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setConfirmPassword("");
      return;
    }

    try {
      // Create the user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      const userToken = await userCredential.user.getIdToken();

      // Optionally, you can redirect the user to a different page here.
      const profileType = await AsyncStorage.getItem("signUpProfileType");

      switch (profileType) {
        case "Elder":
          await elderSignUp({ email }, userToken);
          navigation.navigate("ElderProfileSetup");
          break;

        case "Caregiver":
          caregiverSignup({ email }, userToken);
          navigation.navigate("CaregiverProfileSetup");
          break;

        default:
          navigation.navigate("ProfileTypeSetup");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Function to validate email using a regular expression
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4 bg-white">
      <View className="flex flex-column flex-1">
        <Header hideNotification />

        <View className="flex justify-start py-4 mb-4">
          <Text className="font-SatoshiBold text-5xl">Create Account</Text>
        </View>

        <View className="flex flex-1">
          <View className="flex justify-start py-4 gap-2">
            <View className="flex flex-row justify-between items-end">
              <Text className="font-SatoshiMedium">Username / Email</Text>
            </View>

            <TextInput
              className="border-b-[1px] font-SatoshiBold"
              value={email}
              onChangeText={(v) => setEmail(v)}
            />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <View className="flex flex-row justify-between items-end">
              <Text className="font-SatoshiMedium">Password</Text>
            </View>

            <TextInput
              className="border-b-[1px] font-SatoshiBold"
              secureTextEntry
              value={password}
              onChangeText={(v) => setPassword(v)}
            />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <View className="flex flex-row justify-between items-end">
              <Text className="font-SatoshiMedium">Confirm Password</Text>
            </View>

            <TextInput
              className="border-b-[1px] font-SatoshiBold"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(v) => setConfirmPassword(v)}
            />
          </View>
        </View>

        <TouchableOpacity
          className="px-4 py-3 rounded-xl w-full mb-4 bg-primary"
          onPress={handleSubmit}
        >
          <Text className="text-[17px] text-center font-SatoshiBold text-white">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
