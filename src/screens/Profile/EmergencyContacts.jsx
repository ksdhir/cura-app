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
import { addEmergencyContact } from "../../services/elder";

// Function to validate email using a regular expression
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const ProfileEmergencyContacts = () => {
  const { user, token } = useAuth();
  const [contactEmail, setContactEmail] = useState("");
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    if (!user || !token) return;
  }, [user, token]);

  if (!user) {
    return null;
  }

  const handleAddEmergencyContact = async () => {
    // Validate the input
    if (!isValidEmail(contactEmail)) {
      alert("Invalid email");
      return;
    }

    if (!relationship) {
      alert("Please add your relationship to the care person");
      return;
    }

    try {
      const result = await addEmergencyContact(
        {
          email: user.email,
          contactEmail,
          relationship,
        },
        token
      );

      //Clear
      setContactEmail("");
      setRelationship("");

      alert("Emergency Contact Added");
    } catch (error) {
      alert(error);
    }
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
              <Text className="font-SatoshiBold">Care Person's Email</Text>
            </View>

            <TextInput
              className="border-b-[1px] font-SatoshiBold"
              value={contactEmail}
              onChangeText={(value) => setContactEmail(value)}
            />
          </View>

          <View className="flex justify-start py-4 gap-2">
            <View className="flex flex-row justify-between items-end">
              <Text className="font-SatoshiBold">Relationship</Text>
            </View>

            <TextInput
              className="border-b-[1px] font-SatoshiBold"
              value={relationship}
              onChangeText={(value) => setRelationship(value)}
            />
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
