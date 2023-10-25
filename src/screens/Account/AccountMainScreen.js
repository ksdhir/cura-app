import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../utils/FirebaseConfig";
import { Button } from "@rneui/themed";
import curaTheme from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountMainScreen() {
  const navigation = useNavigation();

  const handleSignout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Welcome");
    } catch (error) {
      alert(error.message);
    }
  };

  const user = auth.currentUser;
  console.log(user.email);

  return (
    <SafeAreaView className="flex flex-1">
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
