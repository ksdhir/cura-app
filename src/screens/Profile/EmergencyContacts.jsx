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
import Header from "../../components/layouts/Header";

const ProfileEmergencyContacts = () => {
  const { user, token } = useAuth();

  useEffect(() => {
    if (!user || !token) return;
  }, [user, token]);

  if (!user) {
    return null;
  }

  const handleAddEmergencyContact = () => {
    alert("Add Emergency Contact");
  };

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4 bg-white">
      <View className="flex flex-column flex-1">
        <Header />

        <View className="flex justify-start py-4 mb-4">
          <Text className="font-SatoshiBold text-2xl">Emergency Contact</Text>
        </View>

        <ScrollView className="flex">
          <View className="flex justify-start py-4 gap-2">
            <View className="flex flex-row justify-between items-end">
              <Text className="font-SatoshiBold">Email</Text>
            </View>

            <TextInput className="border-b-[1px] font-SatoshiBold" />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <View className="flex flex-row justify-between items-end">
              <Text className="font-SatoshiBold">Relationship</Text>
            </View>

            <TextInput className="border-b-[1px] font-SatoshiBold" />
          </View>
        </ScrollView>

        <TouchableOpacity
          className="px-4 py-3 rounded-xl w-full mb-4 bg-primary"
          onPress={handleAddEmergencyContact}
        >
          <Text className="text-[17px] text-center font-SatoshiBold text-white">
            Add Emergency Contact
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEmergencyContacts;
