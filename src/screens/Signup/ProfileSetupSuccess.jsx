import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const ProfileSetupSuccess = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4">
      <View className="flex flex-column flex-1">
        {/* START */}
        <View className="flex justify-start py-4">
          <TouchableOpacity>
            <Text className="font-bold"> {"< Back"} </Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-start py-4 mb-4 flex-1 gap-2 mt-8">
          <View className="h-[100px] w-[100px] rounded-full bg-[#26aba2] self-center" />

          <Text className="font-bold text-2xl text-center">
            You are all set!
          </Text>
          <Text className="font-bold text-lg text-center">
            You can now view the dashboard
          </Text>
        </View>

        <TouchableOpacity
          className="bg-[#D9D9D9] px-4 py-2 rounded-md w-full"
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="text-[17px] text-center font-bold">Go to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileSetupSuccess;
