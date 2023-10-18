import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ProfileTypeSelection = () => {
  const navigation = useNavigation();

  const handleRedirection = async (type) => {
    try {
      await AsyncStorage.setItem("signUpProfileType", type);
      navigation.navigate("SignUp");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <SafeAreaView className="flex h-full space-y-4 px-4 py-16">
        <View className=" flex-1 flex">
          <View className="flex justify-start py-4 mb-8">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text className="font-bold"> {"< Back"} </Text>
            </TouchableOpacity>
          </View>

          <View className=" flex flex-row justify-center items-center mb-4">
            <View className="flex-0 w-[100px] h-[100px] bg-[#D9D9D9] rounded-full" />
          </View>

          <Text className="text-2xl text-center mb-8 p-8 font-bold">
            Choose what type of account you’ll be using
          </Text>

          <View className="flex justify-between flex-row  w-full  gap-4">
            <TouchableOpacity
              className="bg-[#D9D9D9] px-4 py-2 rounded-md flex-1"
              onPress={() => handleRedirection("Caregiver")}
            >
              <Text className="text-[17px] text-center font-bold">
                {" "}
                Caregiver{" "}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-[#D9D9D9] px-4 py-2 rounded-md flex-1"
              onPress={() => handleRedirection("Elder")}
            >
              <Text className="text-[17px] text-center font-bold"> Elder </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ProfileTypeSelection;
