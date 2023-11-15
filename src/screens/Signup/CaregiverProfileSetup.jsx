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
import Header from "../../components/layouts/Header";

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
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4 bg-white">
      <Header hideNotification />

      <View className="flex flex-column flex-1">
        <View className="flex justify-start py-4 mb-4">
          <Text className="font-SatoshiBold text-2xl"> Caregiver Profile </Text>
        </View>

        <ScrollView className="flex">
          <View className="flex justify-start py-4 gap-2">
            <Text className="font-SatoshiMedium text-[16px]">
              Preferred Name/s
            </Text>

            <TextInput
              className="border-b-[2px] border-[#AFB3B2]"
              value={name}
              onChangeText={(v) => setName(v)}
            />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-SatoshiMedium text-[16px]">
              Phone number:
            </Text>

            <TextInput
              className="border-b-[2px] border-[#AFB3B2]"
              value={phoneNumber}
              onChangeText={(v) => setPhoneNumber(v)}
            />
          </View>
        </ScrollView>

        <TouchableOpacity
          className="px-4 py-3 rounded-xl w-full mb-4 bg-primary"
          onPress={handleConfirm}
        >
          <Text className="text-[17px] text-center font-SatoshiBold text-white">
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CaregiveProfileSetup;
