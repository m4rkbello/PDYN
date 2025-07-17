import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { loginUser } from '../services/firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await loginUser(email, password);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View>
            <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
            <Button title="Login" onPress={handleLogin} />
            <Text onPress={() => navigation.navigate('Register')}>No account? Register</Text>
        </View>
    );
}
