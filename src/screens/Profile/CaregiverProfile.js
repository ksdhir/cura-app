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
import ScreenTitle from "../../components/layouts/ScreenTitle";

const CaregiverProfile = () => {
  const navigation = useNavigation();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user, token } = useAuth();

  const handleConfirm = async () => {
    if (!name || !phoneNumber) return alert("Please fill in all fields");

    var phoneRegex = new RegExp("^[0-9]+$");
    if (!phoneRegex.test(phoneNumber)) {
      return alert("Please enter a valid phone number");
    }

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
        console.error(error.message);
      }
    };

    fetchCaregiverProfile();
  }, [user, token]);

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4   bg-curaWhite">
      <View className="flex flex-column flex-1">
        <Header />

        <ScreenTitle title="Care Person Profile" />

        <ScrollView className="flex my-4">
          <View className="flex justify-start py-4 gap-1">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-lg text-curaBlack font-SatoshiBold">
                Preferred Name/s:
              </Text>

              {!isEdit && (
                <IconBtn
                  name="edit"
                  onPress={handleEdit}
                  width={25}
                  height={25}
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
              <Text>{name}</Text>
            )}
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Email:
            </Text>

            <Text>{user.email}</Text>
          </View>

          <View className="flex justify-start py-4 gap-2">
            <Text className="text-lg text-curaBlack font-SatoshiBold">
              Contact Number:
            </Text>

            {isEdit ? (
              <TextInput
                className="border-b-[1px] font-SatoshiBold"
                value={phoneNumber}
                onChangeText={(v) => setPhoneNumber(v)}
              />
            ) : (
              <Text>{phoneNumber}</Text>
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

export default CaregiverProfile;
