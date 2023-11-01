import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

// Function to validate email using a regular expression
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, profileType } = useAuth();

  const handleSubmit = async () => {
    if (!isValidEmail(email) || password.length < 6) {
      alert("Invalid input");
      return;
    }

    try {
      // Sign in the user with email and password
      await auth().signInWithEmailAndPassword(email, password);
      // The user is now signed in
      navigation.navigate("Home");
      return;
    } catch (error) {
      alert(error.message);
    }
  };

  if (user) {
    console.log(profileType)
    navigation.navigate("Home");
  }

  return (
    <View className="flex-1 bg-teal-300 justify-between pt-4">
      <SafeAreaView className="flex flex-1 ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.navigate("Welcome")}
            className="bg-teal-600 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <Text className="text-gray-200"> Back </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row flex-1 justify-center items-center">
          <Text className="text-4xl font-bold text-gray-800">
            Log In Screen
          </Text>
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <View className="form space-y-1.5">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="email"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-4">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="py-3 bg-indigo-500 rounded-xl"
            onPress={handleSubmit}
          >
            <Text className="text-xl font font-bold text-center text-gray-200">
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-5">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileTypeSetup")}
          >
            <Text className="font-semibold text-indigo-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
