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
import ScreenTitle from "../../components/layouts/ScreenTitle";
import IconBtn from "../../components/IconBtn";
import { elderSignUp, getElderProfile } from "../../services/elder";
import { Picker } from "@react-native-picker/picker";
import { BLOOD_TYPES, SEX_LIST } from "../../api/constants";

const ElderProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { user, token } = useAuth();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [medicalConditions, setMedicalConditions] = useState();
  const [allergies, setAllergies] = useState();
  const [medications, setMedications] = useState();
  const [notes, setNotes] = useState();
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
    } catch (error) {
      alert(error.message);
    } finally {
      setIsEdit(false);
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  useEffect(() => {
    if (!user || !token) return;

    const fetchElderProfile = async () => {
      try {
        const data = await getElderProfile(user.email, token);
        if (data) {
          setName(data.profile.preferredName ?? data.profile.name);
          setPhoneNumber(data.profile.phoneNumber);
          setAge(data.profile.age.toString());
          setSex(data.profile.sex);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchElderProfile();
  }, [user, token]);

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 bg-curaWhite">
      <View className="flex flex-column flex-1">
        <Header />

        <ScreenTitle title="Personal Information" />

        <ScrollView className="flex my-4">
          <View className="flex justify-start py-4 gap-2">
            <View className="flex flex-row justify-between items-end">
              <Text className="text-lg text-curaBlack font-SatoshiBold">
                Preferred Name/s:
              </Text>

              {!isEdit && (
                <IconBtn
                  name="edit"
                  onPress={handleEdit}
                  width={20}
                  height={20}
                  iconStyle={{
                    color: "#263130",
                  }}
                />
              )}
            </View>

            {isEdit ? (
              <TextInput
                className="border-b-[1px] font-SatoshiBold"
                value={name}
                onChangeText={(v) => setName(v)}
              />
            ) : (
              <Text className="font-SatoshiMedium">{name} </Text>
            )}
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Email:
            </Text>

            <Text className="font-SatoshiMedium">{user.email} </Text>
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Age:{" "}
            </Text>

            {isEdit ? (
              <TextInput
                className="border-b-[1px] font-SatoshiMedium"
                value={age}
                onChangeText={(v) => setAge(v)}
              />
            ) : (
              <Text className="font-SatoshiMedium">{age}</Text>
            )}
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Contact Number:{" "}
            </Text>

            {isEdit ? (
              <TextInput
                className="border-b-[1px] font-SatoshiMedium"
                value={phoneNumber}
                onChangeText={(v) => setPhoneNumber(v)}
              />
            ) : (
              <Text className="font-SatoshiMedium">{phoneNumber} </Text>
            )}
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Sex:{" "}
            </Text>

            {isEdit ? (
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
            ) : (
              <Text className="font-SatoshiMedium">
                {sex
                  ? SEX_LIST.find((item) => item.value === sex).label
                  : "None"}{" "}
              </Text>
            )}
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Blood Type:{" "}
            </Text>

            {isEdit ? (
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
            ) : (
              <Text className="font-SatoshiMedium">
                {bloodType
                  ? BLOOD_TYPES.find((item) => item.value === bloodType).label
                  : "None"}
              </Text>
            )}
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Medical Conditions:{" "}
            </Text>

            {isEdit ? (
              <TextInput
                className="border-b-[1px] font-SatoshiMedium"
                value={medicalConditions}
                onChangeText={(v) => setMedicalConditions(v)}
              />
            ) : (
              <Text className="font-SatoshiMedium">
                {medicalConditions ?? "None Listed"}
              </Text>
            )}
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Allergies:{" "}
            </Text>

            {isEdit ? (
              <TextInput
                className="border-b-[1px] font-SatoshiMedium"
                value={allergies}
                onChangeText={(v) => setAllergies(v)}
              />
            ) : (
              <Text className="font-SatoshiMedium">
                {allergies ?? "None Listed"}{" "}
              </Text>
            )}
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Medications:{" "}
            </Text>

            {isEdit ? (
              <TextInput
                className="border-b-[1px] font-SatoshiMedium"
                value={medications}
                onChangeText={(v) => setMedications(v)}
              />
            ) : (
              <Text className="font-SatoshiMedium">
                {medications ?? "None Listed"}{" "}
              </Text>
            )}
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Notes:{" "}
            </Text>

            {isEdit ? (
              <TextInput
                className="border-b-[1px] font-SatoshiMedium"
                value={notes}
                onChangeText={(v) => setNotes(v)}
              />
            ) : (
              <Text className="font-SatoshiMedium">
                {notes ?? "None Listed"}{" "}
              </Text>
            )}
          </View>
        </ScrollView>

        {isEdit && (
          <TouchableOpacity
            className="px-4 py-3 rounded-xl w-full mb-8 bg-primary"
            onPress={handleConfirm}
          >
            <Text className="text-[17px] text-center font-SatoshiBold text-white">
              Done
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ElderProfile;
