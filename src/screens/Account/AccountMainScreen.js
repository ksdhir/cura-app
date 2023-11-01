import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import useAuth from "../../hooks/useAuth";

export default function AccountMainScreen() {
  const navigation = useNavigation();
  const { user, token } = useAuth();

  const handleSignout = async () => {
    console.log("GOOGLE AUTH SIGN OUT");

    try {
      await GoogleSignin.revokeAccess();
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      await auth().signOut();
      navigation.navigate("Welcome");
    }
  };

  if (!user) {
    return (
      <View>
        <Text> Loading ... </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex flex-1 bg-curaWhite">
      <StatusBar style="auto" />
      <View className="flex w-full flex-1 justify-center items-center space-y-4">
        <Text className="text-2xl text-neutral-800 font-bold mt-4">
          Account Main Screen
        </Text>
        <Text className="text-4xl mt-4">
          Hi {user.preferredName || user.email}
          {/* {user.preferredName
            ? user.preferredName.length > 10
              ? user.preferredName.substring(0, 10) + "..."
              : user.preferredName
            : user.email.length > 10
            ? user.email.substring(0, 10) + "..."
            : user.email} */}
        </Text>
        <TouchableOpacity
          className="py-3 bg-indigo-500 rounded-xl p-4"
          onPress={handleSignout}
        >
          <Text className="text-xl font font-bold text-center text-gray-200">
            Sign out
          </Text>
        </TouchableOpacity>

        <ScrollView
          className="flex flex-1 w-full px-4 space-y-3"
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        ></ScrollView>
      </View>
    </SafeAreaView>
  );
}
