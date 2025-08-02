import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
