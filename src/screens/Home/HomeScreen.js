import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TestPrimaryBtn, TestSecondaryBtn } from "../../components";
import { auth } from "../../utils/FirebaseConfig";

export default function HomeScreen() {
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

  return (
    <SafeAreaView className="flex first-letter:flex-1 justify-center items-center space-y-4">
      <Text className="text-4xl"> Hi {user.displayName ?? user.email} </Text>
      <Text className="text-2xl mb-4"> Welcome to CURA!</Text>
      <View className="flex-col justify-center items-center w-full p-8 space-y-3">
        <TouchableOpacity
          className="w-full bg-slate-300 p-4 rounded-lg flex justify-center items-center "
          onPress={() => navigation.navigate("AccelScreen")}
        >
          <Text className=" text-slate-800 text-base font-bold">Accel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-full bg-slate-300 p-4 rounded-lg flex justify-center items-center "
          onPress={() => navigation.navigate("GyroScreen")}
        >
          <Text className=" text-slate-800 text-base font-bold">Gyro</Text>
        </TouchableOpacity>

        <Text className="pt-4 text-center text-slate-800 text-base font-bold">
          Below is an example of how to navigate to a screen in a different
          stack
        </Text>
        <TouchableOpacity
          className="w-full bg-slate-300 p-4 rounded-lg flex justify-center items-center "
          // Example of how to navigate to a screen in a different stack
          onPress={() =>
            navigation.navigate("HeartRateStack", {
              screen: "HeartRateMainScreen",
            })
          }
        >
          <Text className=" text-slate-800 text-base font-bold">
            Go To Heart Rate Home
          </Text>
        </TouchableOpacity>
      </View>
      <TestPrimaryBtn title="Sign Out" onPress={handleSignout} />
    </SafeAreaView>
  );
}
