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
import { caregiverSignup, getCaregiverProfile } from "../../services/caregiver";
import Header from "../../components/layouts/Header";
import IconBtn from "../../components/IconBtn";

const CaregiverProfile = () => {
  const navigation = useNavigation();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user, token } = useAuth();

  const handleConfirm = async () => {
    if (!name || !phoneNumber) return alert("Please fill in all fields");

    try {
      const data = await caregiverSignup(
        {
          preferredName: name,
          phoneNumber,
          email: user.email,
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

    const fetchCaregiverProfile = async () => {
      try {
        const data = await getCaregiverProfile(user.email, token);

        if (data) {
          setName(data.caregiver.preferredName ?? data.caregiver.name);
          setPhoneNumber(data.caregiver.phoneNumber);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCaregiverProfile();
  }, [user, token]);

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4 py-4 bg-white">
      <View className="flex flex-column flex-1">
        <Header />

        <View className="flex justify-start py-4 mb-4">
          <Text className="font-bold text-2xl"> Care Person Profile </Text>
        </View>

        <ScrollView className="flex">
          <View className="flex justify-start py-4 gap-2">
            <View className="flex flex-row justify-between items-end">
              <Text className="font-bold"> Preferred Name/s: </Text>

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
                className="border-b-[1px] font-bold"
                value={name}
                onChangeText={(v) => setName(v)}
              />
            ) : (
              <Text> {name} </Text>
            )}
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Email: </Text>

            <Text> {user.email} </Text>
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="font-bold"> Contact Number: </Text>

            {isEdit ? (
              <TextInput
                className="border-b-[1px] font-bold"
                value={phoneNumber}
                onChangeText={(v) => setPhoneNumber(v)}
              />
            ) : (
              <Text> {phoneNumber} </Text>
            )}
          </View>
        </ScrollView>

        {isEdit && (
          <TouchableOpacity
            className="px-4 py-3 rounded-xl w-full mb-4 bg-primary"
            onPress={handleConfirm}
          >
            <Text className="text-[17px] text-center font-bold text-white">
              Done
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CaregiverProfile;