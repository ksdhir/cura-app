import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, TextInput } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { signInWithGoogleAsync } from '../utils';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  GoogleSignin.configure({
    webClientId:
      '547674373172-ljlld4shohia9uo53nekvad6lnn8nmt3.apps.googleusercontent.com',
  });

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authenticatedUser) => {
      setUser(authenticatedUser);
    });

    // Clean up the listener when the component unmounts.
    return () => unsubscribe();
  }, []);

  const navigation = useNavigation();

  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      // Successfully signed in, you can navigate to another screen here.
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle sign-in error (e.g., show an error message to the user).
    }
  };

  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text className='mb-5 text-4xl font-bold'>Welcome</Text>
      {!user ? (
        <>
          <TextInput
            className='mb-3 text-base font-bold border border-slate-300 p-2 w-[305px]'
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            className='mb-3 text-base font-bold border border-slate-300 p-2 w-[305px]'
            placeholder='Password'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable
            className='mb-3  bg-slate-200 border-2 border-slate-300 p-2 w-[305px]'
            onPress={handleSignIn}>
            <Text className='text-center text-base font-bold'>Sign in</Text>
          </Pressable>
          <Text className='mb-3 text-base font-bold'>Or</Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signInWithGoogleAsync}
          />
          <View className='mt-3 flex flex-row justify-center items-center'>
            <Text className='text-sm'>Don't have an account? </Text>
            <Pressable
              onPress={() => navigation.navigate('SignUp')}
              className='text-blue-500'>
              <Text className='text-sm font-bold'>Sign Up</Text>
            </Pressable>
          </View>
        </>
      ) : (
        navigation.navigate('Home')
      )}
      <StatusBar style='auto' />
    </View>
  );
}
