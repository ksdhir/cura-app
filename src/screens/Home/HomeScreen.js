import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../utils/FirebaseConfig";
import { Button } from "@rneui/themed";
import curaTheme from "../../theme/theme";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleSignout = async () => {
    try {
      await auth.signOut();
      navigation.navigate("Welcome");
    } catch (error) {
      alert(error.message);
    }
  };

  const user = auth.currentUser;

  return (
    <SafeAreaView className="flex first-letter:flex-1 justify-center items-center space-y-4">
      <Text className="text-4xl mt-4">
        Hi{" "}
        {user.displayName
          ? user.displayName.length > 10
            ? user.displayName.substring(0, 10) + "..."
            : user.displayName
          : user.email.length > 10
          ? user.email.substring(0, 10) + "..."
          : user.email}
      </Text>

      <Text className="text-2xl"> Welcome to CURA!</Text>
      <ScrollView
        className="flex flex-colw-full pb-8 px-4 space-y-3"
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Button
          title="Accel"
          onPress={() => navigation.navigate("AccelScreen")}
        />
        <Button
          title="Gyro"
          onPress={() => navigation.navigate("GyroScreen")}
        />
        <Button
          title="Push Notification"
          onPress={() => navigation.navigate("PushNotificationScreen")}
        />

        <Text className="pt-4 text-center text-slate-800 text-base font-SatoshiBold">
          Below is an example of how to navigate to a screen in a different
          stack
        </Text>
        <Button
          title="Heart Rate"
          buttonStyle={{ backgroundColor: curaTheme.lightColors.primaryDark }}
          onPress={() =>
            navigation.navigate("HeartRateStack", {
              screen: "HeartRateMainScreen",
            })
          }
        />
        <Button
          title="Sign Out"
          buttonStyle={{ backgroundColor: curaTheme.lightColors.primaryDark }}
          //logout button

          onPress={handleSignout}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
