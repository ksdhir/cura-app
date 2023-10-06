import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { signOut } from '../utils';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Home() {
  const [user, setUser] = useState(null);

  const currentUser = auth().currentUser;
  console.log(currentUser);

  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut();
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView className='flex flex-1 justify-center items-center my-4'>
      <StatusBar style='auto' />
      <View className='flex flex-1 justify-between '>
        <View className='flex flex-1 items-center justify-end space-y-4 '>
          <Text className='text-xl font-bold'>
            Hello, {currentUser.displayName}
          </Text>
          <Text className='text-lg font-bold'>You are now signed in!</Text>
          <Text className='text-4xl font-bold'>This is CURA APP.</Text>
        </View>
      </View>
      <View className='flex flex-1  justify-start items-center'>
        <Pressable
          className='mt-5 bg-slate-200 border-2 border-slate-300 p-2 w-[305px]'
          onPress={handleSignOut}>
          <Text className='text-center text-base font-bold'>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
