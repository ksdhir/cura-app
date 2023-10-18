import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { BLOOD_TYPES, SEX_LIST } from "../../api/constants";
import { useNavigation } from "@react-navigation/native";

const ElderProfileSetup = () => {
  const navigation = useNavigation();
  const [sex, setSex] = useState();
  const [bloodType, setBloodType] = useState();

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4">
      <View className="flex flex-column flex-1">
        {/* START */}
        <View className="flex justify-start py-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="font-bold"> {"< Back"} </Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-start py-4 mb-4">
          <Text className="font-bold text-2xl"> Elder Profile </Text>
        </View>

        <ScrollView className="flex ">
          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Preferred Name: </Text>

            <TextInput className="border-b-[1px]" />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Age: </Text>

            <TextInput className="border-b-[1px]" />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> SEX: </Text>

            <View className="border-[1px] rounded-md">
              <Picker
                selectedValue={sex}
                onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
              >
                {SEX_LIST.map((sex) => (
                  <Picker.Item
                    label={sex.label}
                    value={sex.value}
                    key={sex.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Blood Type: </Text>

            <View className="border-[1px] rounded-md">
              <Picker
                selectedValue={bloodType}
                onValueChange={(itemValue, itemIndex) =>
                  setBloodType(itemValue)
                }
              >
                {BLOOD_TYPES.map((bloodType) => (
                  <Picker.Item
                    label={bloodType.label}
                    value={bloodType.value}
                    key={bloodType.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Medical Conditions: </Text>

            <TextInput className="border-b-[1px]" />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Allergies: </Text>

            <TextInput className="border-b-[1px]" />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Medications: </Text>

            <TextInput className="border-b-[1px]" />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Notes: </Text>

            <TextInput className="border-b-[1px]" />
          </View>

          <TouchableOpacity className="bg-[#D9D9D9] px-4 py-2 rounded-md w-full">
            <Text className="text-[17px] text-center font-bold"> Confirm </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ElderProfileSetup;
