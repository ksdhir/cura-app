import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Image, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";

const GoogleSignInButton = () => {
  GoogleSignin.configure({
    webClientId:
      "547674373172-ljlld4shohia9uo53nekvad6lnn8nmt3.apps.googleusercontent.com",
  });

  const onGoogleButtonPress = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    try {
      const user = await auth().signInWithCredential(googleCredential);
    } catch (error) {
    }
  };

  return (
    <TouchableOpacity
      className="flex-row items-center justify-center placeholder:p-3 rounded-xl border-2 border-[#AFB3B2] bg-[#F8FFFE] mt-4"
      onPress={onGoogleButtonPress}
    >
      <Image
        source={require("../assets/icons/google.png")}
        className="w-6 h-6 mr-2"
      />

      <Text className="text-[17px] font-SatoshiMedium  text-[#787E7E]">
        {" "}
        Sign In With Google{" "}
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;
