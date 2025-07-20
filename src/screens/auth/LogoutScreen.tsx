import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../services/firebase';

export default function LogoutScreen({ navigation }) {
    const { user } = useAuth();

    useEffect(() => {
        const performLogout = async () => {
            await logoutUser();
            navigation.replace('Login'); // or navigation.navigate, depending on your flow
        };

        performLogout();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    );
}
