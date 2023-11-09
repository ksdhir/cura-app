import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { useState } from "react";

import LogoImg from "../assets/images/cura-final-logo.svg";
import GoogleSignInButton from "../components/GoogleSignInButton";

// Function to validate email using a regular expression
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!isValidEmail(email) || password.length < 6) {
      alert("Invalid input");
      return;
    }

    try {
      // Sign in the user with email and password
      await auth().signInWithEmailAndPassword(email, password);

      setEmail("");
      setPassword("");

      // The user is now signed in
      navigation.navigate("Home");
      return;
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView className="flex flex-1 p-6 bg-curaWhite">
      <View className="flex-1  flex-col flex justify-center">
        <View className=" my-8 py-4 flex items-center">
          <LogoImg />
        </View>

        <View className="flex justify-start py-4 gap-2">
          <Text className="font-SatoshiMedium text-[16px]">
            Username / Email address
          </Text>

          <TextInput
            className="border-b-[1px]"
            value={email}
            onChangeText={(v) => setEmail(v)}
          />
        </View>

        <View className="flex justify-start py-4 gap-2">
          <Text className="font-SatoshiMedium  text-[16px]"> Password </Text>

          <TextInput
            className="border-b-[1px]"
            secureTextEntry
            value={password}
            onChangeText={(v) => setPassword(v)}
          />
        </View>

        <TouchableOpacity
          className="px-4 py-4 rounded-xl w-full my-4 mt-12 bg-primary"
          onPress={handleSubmit}
        >
          <Text className="text-[16px] text-center font-SatoshiBold text-white">
            Login
          </Text>
        </TouchableOpacity>
        <Text className="text-[16px] text-center font-SatoshiMedium text-[#000]">
          or
        </Text>

        <GoogleSignInButton />

        <View className="flex-row justify-center mt-5 text-[#3F3E41]">
          <Text className="text-[16px] font-SatoshiMedium">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-[16px] font-SatoshiBold underline ml-2">
              {" "}
              Sign Up{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
