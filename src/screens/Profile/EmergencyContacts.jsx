import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/layouts/Header";
import { addEmergencyContact } from "../../services/elder";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import LoadingSpinner from "../../components/LoadingSpinner";
import ScreenTitle from "../../components/layouts/ScreenTitle";

// Function to validate email using a regular expression
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const ProfileEmergencyContacts = () => {
  const navigation = useNavigation();

  const { user, token } = useAuth();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [relationship, setRelationship] = useState("");

  // camera varibles
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [openCamera, setOpenCamera] = useState(true);

  // loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !token) return;

    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, [user, token]);

  if (!user) {
    return null;
  }

  if (hasPermission === null) {
    return null;
  }
  if (hasPermission === false) {
    return null;
  }

  // handle camera scan
  const handleBarCodeScanned = ({ type, data }) => {
    try {
      setScanned(true);
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      setOpenCamera(false);
      const caregiverData = JSON.parse(data);
      setContactName(caregiverData.name);
      setContactEmail(caregiverData.email);


      setTimeout(() => {
        setLoading(false);
      }, 1000);



    } catch (error) {
      alert("Invalid QR Code");
      navigation.navigate("AccountMainScreen");
    }
  };

  // hit API to handle Emergency Contact
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

      // Clear
      // setContactEmail("");
      // setRelationship("");

      alert("Emergency Contact Added");
      navigation.navigate("AccountMainScreen");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SafeAreaView className="flex h-full space-y-4 px-4  bg-white">
      <View className="flex flex-column flex-1">
        <Header />

        <ScreenTitle title={
          openCamera ? "Scan QR Code" : "Add Emergency Contact"
        } />

        {/* <View className="flex justify-start py-4 mb-4">
          <Text className="font-SatoshiBold text-2xl">
            {openCamera ? "Scan QR Code" : "Add Emergency Contact"}
          </Text>
        </View> */}

        {!openCamera && !loading && (
          <ScrollView className="flex">
            {/* Email */}
            <View className="flex justify-start py-4 gap-2">
              <View className="flex flex-row justify-between items-end">
                <Text className="font-SatoshiBold">Care Person's Name</Text>
              </View>

              <TextInput
                className="border-b-[1px] font-SatoshiBold"
                editable={false}
                selectTextOnFocus={false}
                value={contactName}
                onChangeText={(value) => setContactName(value)}
              />
            </View>

            {/* Email */}
            <View className="flex justify-start py-4 gap-2">
              <View className="flex flex-row justify-between items-end">
                <Text className="font-SatoshiBold">Care Person's Email</Text>
              </View>

              <TextInput
                className="border-b-[1px] font-SatoshiBold"
                editable={false}
                selectTextOnFocus={false}
                value={contactEmail}
                onChangeText={(value) => setContactEmail(value)}
              />
            </View>

            {/* Relationship */}
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
        )}

        {openCamera && (
          <View className="flex flex-1 flex-col justify-center mb-4">
            <BarCodeScanner
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />
          </View>
        )}

        {!openCamera && loading && (
          <View className="flex flex-1 flex-col justify-center mb-4">
            <LoadingSpinner />
          </View>
        )}

        {!openCamera && !loading && (
          <TouchableOpacity
            className="px-4 py-3 rounded-xl w-full mb-4 bg-primary"
            onPress={handleAddEmergencyContact}
          >
            <Text className="text-[17px] text-center font-SatoshiBold text-white">
              Add Emergency Contact
            </Text>
          </TouchableOpacity>
        )}
        {openCamera && !loading && (
          <View className="px-2">
            <TouchableOpacity
              className={`px-4 py-3 rounded-xl w-full mb-4 ${scanned ? "bg-primary" : "bg-curaBlack/10"
                }`}
              onPress={() => setScanned(false)}
              disabled={!scanned}
            >
              <Text
                className={`text-[17px] text-center font-SatoshiBold ${scanned ? "text-white" : " text-curaGray"
                  }`}
              >
                Scan Again
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileEmergencyContacts;
