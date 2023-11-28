import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import Header from "../../components/layouts/Header";
import UserIcon from "../../assets/icons/svg/avatar.svg";
import SettingIcon from "../../assets/icons/svg/setting.svg";
import ScreenTitle from "../../components/layouts/ScreenTitle";

export default function AccountMainScreen(props) {
  const navigation = useNavigation();
  const profileType = props.route.params.profileType;

  const handleSignout = async () => {
    try {
      await GoogleSignin.revokeAccess();
    } catch (error) {
      console.error("ERROR", error);
    } finally {
      await auth().signOut();
      navigation.navigate("Login");
      console.log("GOOGLE AUTH SIGN OUT SUCCESS");
    }
  };

  const navigateToProfile = () => {
    switch (profileType) {
      case "Elder":
        navigation.navigate("ElderProfile");
        break;
      case "Caregiver":
        navigation.navigate("CaregiverProfile");
        break;
      default:
        navigation.navigate("CaregiverProfile");
        break;
    }
  };

  return (
    <SafeAreaView className="flex flex-1 bg-curaWhite">
      <StatusBar style="auto" />

      <View className="px-4">
        <Header />
      </View>

      <View className="flex w-full flex-1 space-y-4">
        <View className="w-full flex flex-row items-center justify-start border-b-[1px] pb-4 px-4">
          <UserIcon
            width={24}
            height={24}
            style={{
              color: "#323333",
            }}
          />

          <ScreenTitle title=" Account" />
          {/* <Text className="text-lg text-curaBlack font-SatoshiBold">
            Account
          </Text> */}
        </View>

        <TouchableOpacity onPress={navigateToProfile} className="w-full p-4">
          <View className="flex flex-row  items-center justify-between gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Personal Profile
            </Text>

            <MaterialCommunityIcons name={"chevron-right"} size={24} />
          </View>
        </TouchableOpacity>

        {profileType === "Elder" ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileEmergencyContacts")}
            className="w-full p-4 pt-0"
          >
            <View className="flex flex-row  items-center justify-between gap-2">
              <Text className="text-lg text-neutral-800 font-SatoshiBold">
                Scan QR Code
              </Text>

              <MaterialCommunityIcons name={"chevron-right"} size={24} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewQRCode")}
            className="w-full p-4 pt-0"
          >
            <View className="flex flex-row  items-center justify-between gap-2">
              <Text className="text-lg text-neutral-800 font-SatoshiBold">
                View QR Code
              </Text>

              <MaterialCommunityIcons name={"chevron-right"} size={24} />
            </View>
          </TouchableOpacity>
        )}

        <View className="w-full flex flex-row items-center justify-start border-b-[1px] pb-4 px-4 mt-4">
          <SettingIcon width={24} height={24} style={{ color: "#323333" }} />

          <ScreenTitle title=" Settings" />
          {/* <Text className="text-lg text-curaBlack font-SatoshiBold">
            Settings
          </Text> */}
        </View>

        <View className="w-full flex flex-row items-center justify-between py-2 px-4">
          <Text className="text-lg text-curaBlack font-SatoshiBold">
            Notifications
          </Text>

          <MaterialCommunityIcons name={"chevron-right"} size={24} />
        </View>

        {profileType === "Elder" ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("HeartRateThresholdScreen")}
            className="w-full p-4 pt-0"
          >
            <View className="flex flex-row  items-center justify-between gap-2">
              <Text className="text-lg text-curaBlack font-SatoshiBold">
                Heart Rate Threshold
              </Text>

              <MaterialCommunityIcons name={"chevron-right"} size={24} />
            </View>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          onPress={() => navigation.navigate("DemoScreen")}
          className="w-full p-4 pt-0"
        >
          <View className="flex flex-row  items-center justify-between gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Demo Screen
            </Text>

            <MaterialCommunityIcons name={"chevron-right"} size={24} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignout} className="w-full p-4">
          <View className="flex flex-row  items-center justify-between gap-2 ">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
