import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layouts/Header";
import CheckIcon from "../../assets/icons/svg/check.svg";

const ProfileSetupSuccess = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4">
      <Header hideNotification />

      <View className="flex flex-column flex-1">
        <View className="flex justify-start py-4 mb-4 flex-1 gap-2 mt-8">
          <View className="h-[150px] w-[150px] rounded-full bg-[#22AD73] self-center flex items-center justify-center">
            <CheckIcon width={77} height={60} style={{ color: "white" }} />
          </View>

          <Text className="font-SatoshiBold text-[32px] text-center py-4 text-[#263130]">
            You're all set!
          </Text>
          <Text className="font-SatoshiMedium text-[18px] text-center text-[#3F3E41]">
            You can now view the dashboard
          </Text>
        </View>

        <TouchableOpacity
          className="px-4 py-3 rounded-xl w-full mb-4 bg-primary"
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="text-[17px] text-center font-SatoshiBold text-white">
            Go to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSetupSuccess;
