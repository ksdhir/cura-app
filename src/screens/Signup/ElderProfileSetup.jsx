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
import useAuth from "../../hooks/useAuth";
import { elderSignUp } from "../../services/elder";

const ElderProfileSetup = () => {
  const navigation = useNavigation();
  const { user, token } = useAuth();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [notes, setNotes] = useState("");
  const [sex, setSex] = useState();
  const [bloodType, setBloodType] = useState();

  const handleConfirm = async () => {
    if (!age) {
      alert("Please enter your age");
      return;
    }

    if (!name) {
      alert("Please enter your name");
      return;
    }

    if (!phoneNumber) {
      alert("Please enter your phone number");
    }

    try {
      const data = await elderSignUp(
        {
          name,
          preferredName: name,
          phoneNumber,
          email: user.email,
          age: parseInt(age),
          medicalConditions,
          allergies,
          medications,
          sex,
          bloodType,
          notes,
        },
        token
      );


      navigation.navigate("ProfileSetupSuccess");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4">
      <View className="flex flex-column flex-1">
        {/* START */}
        <View className="flex justify-start py-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="font-SatoshiBold"> {"< Back"} </Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-start py-4 mb-4">
          <Text className="font-SatoshiBold text-2xl"> Elder Profile </Text>
        </View>

        <ScrollView className="flex ">
          <View className="flex justify-start py-4 gap-2">
            <Text className="font-SatoshiBold"> Preferred Name: </Text>

            <TextInput
              className="border-b-[1px]"
              value={name}
              onChangeText={(v) => setName(v)}
            />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-SatoshiBold"> Age: </Text>

            <TextInput
              className="border-b-[1px]"
              value={age}
              onChangeText={(v) => setAge(v)}
            />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-SatoshiBold"> Phone number: </Text>

            <TextInput
              className="border-b-[1px]"
              value={phoneNumber}
              onChangeText={(v) => setPhoneNumber(v)}
            />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-SatoshiBold"> Sex: </Text>

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
            <Text className="font-SatoshiBold"> Blood Type: </Text>

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
            <Text className="font-SatoshiBold"> Medical Conditions: </Text>

            <TextInput
              className="border-b-[1px]"
              value={medicalConditions}
              onChangeText={(v) => setMedicalConditions(v)}
            />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-SatoshiBold"> Allergies: </Text>

            <TextInput
              className="border-b-[1px]"
              value={allergies}
              onChangeText={(v) => setAllergies(v)}
            />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-SatoshiBold"> Medications: </Text>

            <TextInput
              className="border-b-[1px]"
              value={medications}
              onChangeText={(v) => setMedications(v)}
            />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-SatoshiBold"> Notes: </Text>

            <TextInput
              className="border-b-[1px]"
              value={notes}
              onChangeText={(v) => setNotes(v)}
            />
          </View>

          <TouchableOpacity
            className="bg-[#D9D9D9] px-4 py-2 rounded-md w-full"
            onPress={handleConfirm}
          >
            <Text className="text-[17px] text-center font-SatoshiBold"> Confirm </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ElderProfileSetup;
