import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { registerUser } from '../services/firebase';
import { Timestamp } from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [work, setWork] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const handleRegister = async () => {
        const profileData = {
            email,
            firstName,
            middleName,
            lastName,
            address,
            contactNo,
            birthday: Timestamp.fromDate(birthDate),
            work,
        };

        try {
            await registerUser(email, password, profileData);
            Toast.show({ type: 'success', text1: 'Registration complete!' });
            navigation.replace('Main');
        } catch (err) {
            Toast.show({ type: 'error', text1: 'Registration failed', text2: err.message });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.container}
                >
                    <Text style={styles.title}>Register</Text>

                    {/* 🌐 Basic Inputs */}
                    <TextInput placeholder="Email" onChangeText={setEmail} value={email} style={styles.input} />
                    <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} style={styles.input} />
                    <TextInput placeholder="First Name" onChangeText={setFirstName} value={firstName} style={styles.input} />
                    <TextInput placeholder="Middle Name" onChangeText={setMiddleName} value={middleName} style={styles.input} />
                    <TextInput placeholder="Last Name" onChangeText={setLastName} value={lastName} style={styles.input} />
                    <TextInput placeholder="Address" onChangeText={setAddress} value={address} style={styles.input} />
                    <TextInput placeholder="Contact No" onChangeText={setContactNo} value={contactNo} keyboardType="phone-pad" style={styles.input} />
                    <TextInput placeholder="Work" onChangeText={setWork} value={work} style={styles.input} />

                    {/* 📅 Date Picker */}
                    <Text style={{ marginBottom: 5 }}>Birthday</Text>
                    <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
                        <Text>{birthDate.toDateString()}</Text>
                    </TouchableOpacity>
                    {showPicker && (
                        <DateTimePicker
                            value={birthDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event, selectedDate) => {
                                setShowPicker(false);
                                if (selectedDate) setBirthDate(selectedDate);
                            }}
                            maximumDate={new Date()}
                        />
                    )}

                    {/* 🎯 Register Button */}
                    <View style={styles.buttonContainer}>
                        <Button title="Register" onPress={handleRegister} />
                    </View>

                    <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                        Already have an account?
                    </Text>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
}

const { width } = Dimensions.get('window'); const styles = StyleSheet.create({ safeArea: { flex: 1, backgroundColor: '#f2f2f2', }, scrollView: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20, paddingBottom: 40, }, container: { flex: 1, justifyContent: 'center', }, title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, }, input: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: '#fff', width: '100%', }, buttonContainer: { marginTop: 10, marginBottom: 20, }, loginLink: { textAlign: 'center', color: 'blue', fontSize: 16, }, });
