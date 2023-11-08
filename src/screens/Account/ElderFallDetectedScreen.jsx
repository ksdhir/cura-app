import { View, Text, TouchableOpacity } from "react-native";
import Header from "../../components/layouts/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

import ImgFallDetection from "../../assets/images/fall_detection.svg";
import * as Linking from 'expo-linking';


export default function ElderFallDetectedScreen() {

  const route = useRoute();
  const { elderName, elderPhoneNumber, location } = route.params;

  return (
    <SafeAreaView className="flex-1 p-4 items-center bg-curaWhite">
      {/* Header of the Page */}
      <Header />
      <View className=" flex-1 w-full h-[10vh] justify-center px-8">
        <View className="flex items-center mb-2">
          <ImgFallDetection style={{ width: 200, height: 200 }} />
        </View>
        <View>
          <Text className="text-5xl text-center">{elderName}</Text>
          <Text className="text-5xl text-center">might have fallen!</Text>
          <Text className="text-xl mt-5 text-center">We've detected a potential fall incident</Text>
        </View>
      </View>
      <View className="flex w-full mb-6">
        <TouchableOpacity className="bg-primary rounded-xl py-2.5 px-4" onPress={() => {
          Linking.openURL(`tel:${elderPhoneNumber}`);
        }}>
          <Text className="text-curaWhite text-xl text-center">Call</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
