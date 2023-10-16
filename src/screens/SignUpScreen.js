import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../utils/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    // Validate the input
    if (name.length < 2 || !isValidEmail(email) || password.length < 6) {
      alert("Invalid input");
      return;
    }

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Once the user is created, update their profile with the name
      await updateProfile(userCredential.user, { displayName: name });

      // alert("User registered successfully!");
      // Optionally, you can redirect the user to a different page here.
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
    <View className="flex-1 bg-teal-300 justify-between pt-4">
      <SafeAreaView className="flex-1">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-teal-600 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <Text className="text-gray-200"> Back </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-1 justify-center items-center">
          <Text className="text-4xl font-bold text-gray-800">
            Sign Up Screen
          </Text>
        </View>
      </SafeAreaView>
      <View
        className="flex bg-white p-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-1.5">
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={name}
            onChangeText={(value) => setName(value)}
            placeholder="Enter Name"
          />
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Enter Email"
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder="Enter Password"
          />
          <TouchableOpacity
            className="py-3 bg-indigo-500 rounded-xl"
            onPress={handleSubmit}
          >
            <Text className="text-lg font-bold text-center text-gray-200">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 font-bold text-center py-3">
          Or
        </Text>

        <View className="flex-row justify-center mt-5">
          <Text className="text-gray-500 font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-indigo-500"> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
