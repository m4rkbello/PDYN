import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext'; // adjust path as needed
import { logoutUser } from '../services/firebase';

export default function DashboardScreen({ navigation }) {
    const { user } = useAuth();

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold">Dashboard</Text>
            <Text className="mt-2 text-lg text-gray-600">
                Welcome, {user?.email || 'Guest'}!
            </Text>
            <Button title="Logout" onPress={async () => {
                await logoutUser();
                navigation.replace('Login'); // or navigate depending on your stack
            }} />
        </View>
    );
}
