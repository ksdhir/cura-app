import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        
        email,
        password
      );

      // After signing up, you can update the user's profile with their name.
      await userCredential.user.updateProfile({
        displayName: name,
      });

      // You can add additional logic here, such as navigating to another screen on success.
      console.log('User signed up:', userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error (e.g., show an error message to the user).
    }
  };

  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text className='mb-5 text-4xl font-bold'>Sign Up</Text>
      <TextInput
        className='mb-3 text-base font-bold border border-slate-300 p-2 w-[305px]'
        placeholder='Name'
        value={name}
        onChangeText={setName}
      />

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
        className='mb-3 bg-slate-200 border-2 border-slate-300 p-2 w-[305px]'
        onPress={handleSignUp}>
        <Text className='text-center text-base font-bold'>Sign Up</Text>
      </Pressable>
    </View>
  );
}
