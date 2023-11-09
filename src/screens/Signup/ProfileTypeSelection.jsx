import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { elderSignUp } from "../../services/elder";
import { caregiverSignup } from "../../services/caregiver";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/layouts/Header";
import CuraIcon from "../../assets/images/cura-final-icon.svg";
import CaregiverIcon from "../../assets/icons/svg/caregiver.svg";
import ElderIcon from "../../assets/icons/svg/elderly.svg";

const ProfileTypeSelection = () => {
  const navigation = useNavigation();
  const { user, token } = useAuth();

  const handleRedirection = async (type) => {
    switch (type) {
      case "Elder":
        await elderSignUp({ email: user.email }, token);
        navigation.navigate("ElderProfileSetup");
        break;

      case "Caregiver":
        await caregiverSignup({ email: user.email }, token);
        navigation.navigate("CaregiverProfileSetup");
        break;

      default:
        navigation.navigate("ProfileTypeSetup");
    }
  };

  return (
    <>
      <SafeAreaView className="flex h-full space-y-4 px-4 py-4 bg-white">
        <Header hideNotification />

        <View className="flex justify-center items-center flex-1 mb-[200px]">
          <CuraIcon />

          <Text className="text-[24px] w-[256px] text-center font-SatoshiBold py-8">
            Choose what type of account you’ll be using
          </Text>

          <View className="flex flex-row  w-full space-x-6">
            <TouchableOpacity
              className="flex-1 bg-primary rounded-xl p-4 flex justify-center items-center"
              onPress={() => handleRedirection("Caregiver")}
            >
              <CaregiverIcon
                width={27}
                height={39}
                style={{ color: "white" }}
              />
              <Text className="text-white font-SatoshiMedium text-[16px]">
                Caregiver
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-secondaryDark  rounded-xl p-4 flex justify-center items-center"
              onPress={() => handleRedirection("Elder")}
            >
              <ElderIcon width={21} height={39} style={{ color: "white" }} />

              <Text className="text-white font-SatoshiMedium text-[16px]">
                Senior
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileTypeSelection;
