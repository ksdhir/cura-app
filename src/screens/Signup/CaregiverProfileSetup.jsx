import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../utils/FirebaseConfig";

const CaregiveProfileSetup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleConfirm = async () => {
    try {
      // `${process.env.EXPO_PUBLIC_API_URL}/elder/profile?email=${userData.email}`
      console.log({
        preferredName: name,
        phoneNumber,
        email,
      });
      return;

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/caregiver/profile?email=`
      );

      // {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: {
      //     email: userData.email,
      //     preferredName: userData.preferredName,
      //     phoneNumber: userData.phoneNumber,
      //   },
      // }

      const data = await response.json();
      navigation.navigate("ProfileSetupSuccess");
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const getEmail = async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setEmail(user.email);
        }
      });
    };

    if (!email) {
      getEmail();
    }
  }, [email]);

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4">
      <View className="flex flex-column flex-1">
        <View className="flex justify-start py-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="font-bold"> {"< Back@"} </Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-start py-4 mb-4">
          <Text className="font-bold text-2xl"> Caregiver Profile </Text>
        </View>

        <ScrollView className="flex">
          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Preferred Name: </Text>

            <TextInput
              className="border-b-[1px]"
              value={name}
              onChangeText={(v) => setName(v)}
            />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Phone number: </Text>

            <TextInput
              className="border-b-[1px]"
              value={phoneNumber}
              onChangeText={(v) => setPhoneNumber(v)}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          className="bg-[#D9D9D9] px-4 py-2 rounded-md w-full"
          onPress={handleConfirm}
        >
          <Text className="text-[17px] text-center font-bold"> Confirm </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CaregiveProfileSetup;
