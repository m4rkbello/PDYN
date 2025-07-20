import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Image,
} from 'react-native';
import { loginUser } from '../services/firebase';
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await loginUser(email, password);
            Toast.show({ type: 'success', text1: 'Welcome back!' });
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Login failed',
                text2: err.message,
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.container}
                >
                    {/* ✅ LOGO */}
                    <Image
                        source={require('../assets/haha.png')} // Replace with correct path
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.title}>OUHAHAY</Text>

                    <TextInput
                        placeholder="Email"
                        onChangeText={setEmail}
                        value={email}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={setPassword}
                        value={password}
                        style={styles.input}
                    />

                    <View style={styles.buttonContainer}>
                        <Button title="Login" onPress={handleLogin} />
                    </View>

                    <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>
                        No account? Register
                    </Text>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: width * 0.5,      // 50% of screen width
        height: width * 0.5,     // same as width to make it square
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        marginVertical: 10,
    },
    registerText: {
        marginTop: 20,
        textAlign: 'center',
        color: 'blue',
    },
});
