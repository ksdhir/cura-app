import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const signInWithGoogleAsync = async () => {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const user_sign_in = auth().signInWithCredential(googleCredential);

  user_sign_in
    .then((user) => {
      console.log('===================================================');
      console.log(user);
      console.log('===================================================');
      console.log(user.additionalUserInfo.profile.given_name);
      console.log('User signed in!');
    })
    .catch((error) => {
      console.log(error);
    });
};

const signOut = () => {
  auth()
    .signOut()

    .then(() => console.log('User signed out!'));
};

export { signInWithGoogleAsync, signOut };
