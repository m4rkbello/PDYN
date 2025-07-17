import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { registerUser } from '../services/firebase';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await registerUser(email, password);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <View>
            <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
            <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
            <Button title="Register" onPress={handleRegister} />
            <Text onPress={() => navigation.navigate('Login')}>Already have an account?</Text>
        </View>
    );
}
