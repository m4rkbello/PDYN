import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LogoutScreen from '../screens/auth/LogoutScreen';
import { useAuth } from '../context/AuthContext';
import EditProfileScreen from '../screens/profile/EditProfile';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
            }}
        >
            <Drawer.Screen name="Dashboard" component={DashboardScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Logout" component={LogoutScreen} />

        </Drawer.Navigator>
    );
};

export default function AppNavigator() {
    const { user } = useAuth();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <>
                    <Stack.Screen name="Main" component={DrawerNavigator} />
                    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </>
            )}


        </Stack.Navigator>
    );
}