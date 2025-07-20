import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function EditProfileScreen() {
    const { profile, user } = useAuth();
    const navigation = useNavigation();

    const [email, setEmail] = useState(profile?.email || user?.email || '');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [firstName, setFirstName] = useState(profile?.firstName || '');
    const [middleName, setMiddleName] = useState(profile?.middleName || '');
    const [lastName, setLastName] = useState(profile?.lastName || '');
    const [address, setAddress] = useState(profile?.address || '');
    const [contactNo, setContactNo] = useState(profile?.contactNo || '');
    const [work, setWork] = useState(profile?.work || '');

    const reauthenticateUser = async (currentPassword) => {
        const currentUser = auth().currentUser;
        if (!currentUser || !currentUser.email) {
            throw new Error('No authenticated user found');
        }

        const credential = auth.EmailAuthProvider.credential(currentUser.email, currentPassword);
        await currentUser.reauthenticateWithCredential(credential);
    };

    const handleSave = async () => {
        try {
            const currentUser = auth().currentUser;
            if (!currentUser) {
                Toast.show({
                    type: 'error',
                    text1: 'Authentication Error',
                    text2: 'No authenticated user found',
                });
                return;
            }

            // Check if email or password update is needed
            const needsEmailUpdate = email !== currentUser.email;
            const needsPasswordUpdate = password.trim() !== '';

            // If updating email or password, require current password for reauthentication
            if ((needsEmailUpdate || needsPasswordUpdate) && !currentPassword.trim()) {
                Toast.show({
                    type: 'error',
                    text1: 'Current Password Required',
                    text2: 'Please enter your current password to update email or password',
                });
                return;
            }

            // Reauthenticate if needed
            if (needsEmailUpdate || needsPasswordUpdate) {
                await reauthenticateUser(currentPassword);
            }

            // 🔐 Update email if changed
            if (needsEmailUpdate) {
                await currentUser.updateEmail(email);
                // Update email in Firestore as well
                await firestore().collection('users').doc(currentUser.uid).update({
                    email: email
                });
            }

            // 🔐 Update password if provided
            if (needsPasswordUpdate) {
                await currentUser.updatePassword(password);
            }

            // 🔄 Update Firestore profile (other fields)
            await firestore().collection('users').doc(currentUser.uid).update({
                firstName,
                middleName,
                lastName,
                address,
                contactNo,
                work,
            });

            Toast.show({
                type: 'success',
                text1: 'Profile updated successfully!'
            });

            // Clear sensitive fields
            setPassword('');
            setCurrentPassword('');

            navigation.goBack();
        } catch (err) {
            console.error('Profile update error:', err);

            let message = err.message;

            // Handle specific Firebase Auth errors
            switch (err.code) {
                case 'auth/operation-not-allowed':
                    message = 'Email/Password updates are disabled. Check Firebase Authentication settings.';
                    break;
                case 'auth/requires-recent-login':
                    message = 'Please re-authenticate to update your email or password.';
                    break;
                case 'auth/wrong-password':
                    message = 'Current password is incorrect.';
                    break;
                case 'auth/email-already-in-use':
                    message = 'This email is already in use by another account.';
                    break;
                case 'auth/invalid-email':
                    message = 'Please enter a valid email address.';
                    break;
                case 'auth/weak-password':
                    message = 'Password should be at least 6 characters long.';
                    break;
                case 'auth/network-request-failed':
                    message = 'Network error. Please check your internet connection.';
                    break;
                case 'auth/user-mismatch':
                    message = 'The credential does not correspond to the user.';
                    break;
                case 'auth/user-not-found':
                    message = 'No user record corresponding to this identifier.';
                    break;
                case 'auth/invalid-credential':
                    message = 'The credential is malformed or has expired.';
                    break;
                default:
                    message = err.message || 'An error occurred while updating profile.';
            }

            Toast.show({
                type: 'error',
                text1: 'Update failed',
                text2: message,
            });
        }
    };

    const showReauthInfo = () => {
        Alert.alert(
            'Security Notice',
            'To update your email or password, you need to enter your current password for security verification.',
            [{ text: 'OK' }]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.inner}
            >
                {/* 🔙 Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Edit Profile</Text>

                {/* 📋 Form Fields */}
                <Text style={styles.labelText}>Email</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.labelText}>New Password (optional)</Text>
                <TextInput
                    placeholder="Enter new password"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry
                />

                {/* Current Password Field - Required for email/password updates */}
                {(email !== user?.email || password.trim() !== '') && (
                    <>
                        <View style={styles.securitySection}>
                            <Text style={styles.labelText}>
                                Current Password (required for security)
                                <TouchableOpacity onPress={showReauthInfo} style={styles.infoButton}>
                                    <Text style={styles.infoText}> ℹ️</Text>
                                </TouchableOpacity>
                            </Text>
                            <TextInput
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                style={[styles.input, styles.securityInput]}
                                secureTextEntry
                            />
                        </View>
                    </>
                )}

                <Text style={styles.labelText}>First Name</Text>
                <TextInput
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    style={styles.input}
                />

                <Text style={styles.labelText}>Middle Name</Text>
                <TextInput
                    placeholder="Middle Name (optional)"
                    value={middleName}
                    onChangeText={setMiddleName}
                    style={styles.input}
                />

                <Text style={styles.labelText}>Last Name</Text>
                <TextInput
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                    style={styles.input}
                />

                <Text style={styles.labelText}>Address</Text>
                <TextInput
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                    style={styles.input}
                />

                <Text style={styles.labelText}>Contact No</Text>
                <TextInput
                    placeholder="Contact Number"
                    value={contactNo}
                    onChangeText={setContactNo}
                    style={styles.input}
                    keyboardType="phone-pad"
                />

                <Text style={styles.labelText}>Work</Text>
                <TextInput
                    placeholder="Work/Occupation"
                    value={work}
                    onChangeText={setWork}
                    style={styles.input}
                />

                {/* 💾 Submit Button */}
                <View style={{ marginTop: 20 }}>
                    <Button title="Save Changes" onPress={handleSave} />
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    inner: {
        width: '100%',
        maxWidth: 500,
    },
    backButton: {
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    backText: {
        fontSize: 16,
        color: '#007AFF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    securitySection: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    securityInput: {
        borderColor: '#ffc107',
        backgroundColor: '#fffbf0',
    },
    infoButton: {
        marginLeft: 5,
    },
    infoText: {
        color: '#007AFF',
        fontSize: 14,
    },
});