import { View } from "react-native";
import curaTheme from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";
import IconBtn from "../IconBtn";

const Header = ({ children, hideNotification = false, elderEmail }) => {
  const navigation = useNavigation();

  return (
    <View className="py-4 w-full flex justify-between flex-row">
      {children ? (
        <View>{children}</View>
      ) : (
        <IconBtn
          name="back"
          onPress={() => navigation.goBack()}
          iconStyle={{
            color: curaTheme.lightColors.primary,
          }}
        />
      )}

      {!hideNotification && (
        <IconBtn
          name="bell"
          onPress={() =>
            navigation.navigate("NotificationHistory", {
              elderEmail,
            })
          }
          iconStyle={{
            color: curaTheme.lightColors.primary,
          }}
        />
      )}
    </View>
  );
};

export default Header;
