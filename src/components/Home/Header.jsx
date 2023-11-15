import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

import IconBtn from "../IconBtn";
import curaTheme from "../../theme/theme";

const HomeHeader = ({ userLoggedIn, profile }) => {
  const navigation = useNavigation();
  const elderName = profile?.profile?.preferredName;
  const elderAge = profile?.profile?.age;

  return (
    <View className="w-full flex-row justify-between py-4">
      <View>
        {userLoggedIn === "Caregiver" ? (
          <Text className="text-xl text-curaBlack font-SatoshiBold">
            {elderName}
          </Text>
        ) : (
          <Text className="text-xl text-curaBlack font-SatoshiBold">
            {elderName}
          </Text>
        )}

        <Text className=" text-base text-curaBlack font-SatoshiMedium ">
          {elderAge} years old
        </Text>
      </View>

      <IconBtn
        name="bell"
        onPress={() => navigation.navigate("NotificationHistory")}
        iconStyle={{
          color: curaTheme.lightColors.primary,
        }}
      />
    </View>
  );
};

export default HomeHeader;
