import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/Welcome';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName='Welcome'>
      <Stack.Screen
        options={{ headerShown: false }}
        name='Welcome'
        component={Welcome}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name='Home'
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name='SignUp'
        component={SignUp}
      />
    </Stack.Navigator>
  );
}
