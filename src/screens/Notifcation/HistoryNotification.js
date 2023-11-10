import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconBtn from "../../components/IconBtn";
import curaTheme from "../../theme/theme";
import ScreenTitle from "../../components/layouts/ScreenTitle";

export default function HistoryNotification() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 items-center justify-start bg-curaWhite px-4 space-y-4">
      <StatusBar />
      <View className="w-full flex-row justify-between py-4">
        <IconBtn
          name="back"
          onPress={() => navigation.goBack()}
          iconStyle={{
            color: curaTheme.lightColors.primary,
          }}
        />
        <></>
      </View>

      <ScreenTitle title="Notifications" />

      <View className="w-full flex-row justify-between py-4">
        <Text className="text-2xl text-curaBlack font-SatoshiBold mt-4">
          Notifications
        </Text>
      </View>
    </SafeAreaView>
  );
}
