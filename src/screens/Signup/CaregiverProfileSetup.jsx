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
import useAuth from "../../hooks/useAuth";
import { caregiverSignup } from "../../services/caregiver";

const CaregiveProfileSetup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user, token } = useAuth();

  const handleConfirm = async () => {
    try {
      const data = await caregiverSignup(
        {
          preferredName: name,
          phoneNumber,
          email: user.email,
        },
        token
      );

      navigation.navigate("ProfileSetupSuccess");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4">
      <View className="flex flex-column flex-1">
        <View className="flex justify-start py-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="font-bold"> {"< Back"} </Text>
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
