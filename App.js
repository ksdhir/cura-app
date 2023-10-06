import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigators/AppNavigator';

import React from 'react';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
  );
}
