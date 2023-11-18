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

import { getCaregiverProfile } from "../../services/caregiver";

import QRCode from "react-qr-code";

const ViewQRCode = () => {
  const { user, token } = useAuth();
  const [caregiverName, setCaregiverName] = useState("");
  const [once, setOnce] = useState(false);

  useEffect(() => {
    if (!user || !token) return;
    if (once) return;
    setOnce(true);

    getCaregiverProfile(user.email, token).then((res) => {
      setCaregiverName(res.caregiver.preferredName)
    });


  }, [user, token]);


  // stop of user isn't found
  if (!user || !caregiverName) {
    return null;
  }


  return (
    <SafeAreaView className="flex h-full space-y-4 px-4  bg-curaWhite">
      <View className="flex flex-column flex-1">
        <Header />

        <ScreenTitle title="Scan to add caregiver" />

        <View className="flex flex-1 items-center justify-center ">
          <View className="items-center border-4 border-primary rounded-[30px] w-full py-7 ">
            <Text className="text-4xl font-bold">{caregiverName}</Text>
            <Text className="text-xl mb-6">Contact Person</Text>
            <View className="mb-8">
              <QRCode fgColor={"#09C1CB"} value={JSON.stringify({ email: user.email, name: caregiverName })} size={275} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewQRCode;
