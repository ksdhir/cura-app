import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TestPrimaryBtn, TestSecondaryBtn } from "../components";
import { auth } from "../utils/FirebaseConfig";

export default function Home() {
  const navigation = useNavigation();
  const handleSignout = async () => {
    try {
      await auth.signOut();
      console.log("====================================");
      console.log("User signed out");
    } catch (error) {
      alert(error.message);
    }
  };

  const user = auth.currentUser;
  const name = user.displayName;

  return (
    <SafeAreaView className=" flex first-letter:flex-1 justify-center items-center space-y-4">
      <Text className="text-4xl"> Hi {name},</Text>
      <Text className="text-2xl mb-4"> Welcome to CURA!</Text>
      <TestPrimaryBtn title="Sign Out" onPress={handleSignout} />
    </SafeAreaView>
  );
}
