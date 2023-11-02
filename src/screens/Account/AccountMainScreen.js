import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/layouts/Header";
import UserIcon from "../../assets/icons/svg/avatar.svg";
import SettingIcon from "../../assets/icons/svg/setting.svg";

export default function AccountMainScreen() {
  const navigation = useNavigation();
  const { user, profileType } = useAuth();

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

  const navigateToProfile = () => {
    switch (profileType) {
      case "Elder":
        navigation.navigate("ElderProfileSetup");
        break;
      case "Caregiver":
        navigation.navigate("CaregiverProfileSetup");
        break;
      default:
        navigation.navigate("CaregiverProfileSetup");
        break;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView className="flex flex-1 bg-curaWhite">
      <StatusBar style="auto" />

      <View className="px-4">
        <Header />
      </View>

      <View className="flex w-full flex-1 justify-center items-center space-y-4">
        <View className="w-full flex flex-row  items-center justify-start gap-2 border-b-[1px] pb-4 px-4 mt-4">
          <UserIcon width={20} height={20} style={{ color: "#323333" }} />

          <Text className="text-lg text-neutral-800 font-bold">Account</Text>
        </View>

        <TouchableOpacity onPress={navigateToProfile} className="w-full p-4">
          <View className="flex flex-row  items-center justify-between gap-2">
            <Text className="text-lg text-neutral-800 font-bold">
              Personal Profile
            </Text>

            <MaterialCommunityIcons name={"chevron-right"} size={24} />
          </View>
        </TouchableOpacity>

        <View className="w-full flex flex-row  items-center justify-between gap-2 px-4 mb-4">
          <Text className="text-lg text-neutral-800 font-bold">
            View QR Code
          </Text>

          <MaterialCommunityIcons name={"chevron-right"} size={24} />
        </View>

        <View className="w-full flex flex-row  items-center justify-start gap-2 border-b-[1px] pb-4 px-4 mt-4">
          <SettingIcon width={20} height={20} style={{ color: "#323333" }} />

          <Text className="text-lg text-neutral-800 font-bold">Settings</Text>
        </View>

        <View className="w-full flex flex-row items-center justify-between gap-2 px-4">
          <Text className="text-lg text-neutral-800 font-bold">
            Notifications
          </Text>

          <MaterialCommunityIcons name={"chevron-right"} size={24} />
        </View>

        <View className="w-full flex flex-row  items-center justify-between gap-2 px-4">
          <Text className="text-lg text-neutral-800 font-bold">
            Heart Rate Threshold
          </Text>

          <MaterialCommunityIcons name={"chevron-right"} size={24} />
        </View>

        <TouchableOpacity onPress={handleSignout} className="w-full p-4">
          <View className="flex flex-row  items-center justify-between gap-2 ">
            <Text className="text-lg text-neutral-800 font-bold">Logout</Text>
          </View>
        </TouchableOpacity>

        <ScrollView
          className="flex flex-1 w-full px-4 space-y-3"
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("GoogleHealthScreen")}
          >
            <Text>Google Health</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("HeartRateThresholdScreen")}
          >
            <Text>Adjust Heartrate Threshold</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("FallDetectionScreen")}
          >
            <Text>Fall Detection Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PushNotificationScreen")}
          >
            <Text>Push Notification Screen</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
