import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CaregiveProfileSetup = () => {
  const [sex, setSex] = useState();
  const [bloodType, setBloodType] = useState();

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4">
      <View className="flex flex-column flex-1">
        {/* START */}
        <View className="flex justify-start py-4">
          <TouchableOpacity>
            <Text className="font-bold"> {"< Back"} </Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-start py-4 mb-4">
          <Text className="font-bold text-2xl"> Caregiver Profile </Text>
        </View>

        <ScrollView className="flex">
          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Preferred Name: </Text>

            <TextInput className="border-b-[1px]" />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Phone number: </Text>

            <TextInput className="border-b-[1px]" />
          </View>
        </ScrollView>

        <TouchableOpacity className="bg-[#D9D9D9] px-4 py-2 rounded-md w-full">
          <Text className="text-[17px] text-center font-bold"> Confirm </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CaregiveProfileSetup;
