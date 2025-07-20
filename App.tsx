import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AppNavigator from './src/navigations/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
        <Toast
          config={{
            success: (props) => (
              <BaseToast
                {...props}
                style={{ borderLeftColor: 'green' }}
                text1Style={{ fontSize: 16 }}
                text2Style={{ fontSize: 14 }}
              />
            ),
            error: (props) => (
              <ErrorToast
                {...props}
                style={{ borderLeftColor: 'red' }}
                text1Style={{ fontSize: 16 }}
                text2Style={{ fontSize: 14 }}
              />
            ),
          }}
          position="top"
          visibilityTime={4000}
          topOffset={60}
        />
      </NavigationContainer>
    </AuthProvider>
  );
}
