import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import firestore from '@react-native-firebase/firestore';

export default function ProfileScreen() {
    const { profile, user } = useAuth();

    const [editing, setEditing] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState(profile || {});

    if (!profile) {
        return (
            <View style={styles.centered}>
                <Text style={styles.loadingText}>Loading profile...</Text>
            </View>
        );
    }

    const handleUpdate = async () => {
        try {
            await firestore().collection('users').doc(user.uid).update(updatedProfile);
            Alert.alert('Success', 'Profile updated successfully.');
            setEditing(false);
        } catch (error) {
            console.error('Update error:', error);
            Alert.alert('Error', 'Failed to update profile.');
        }
    };

    const handleChange = (key, value) => {
        setUpdatedProfile(prev => ({ ...prev, [key]: value }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Your Profile</Text>

            <View style={styles.infoBox}>
                <EditableField label="First Name" value={updatedProfile.firstName} editable={editing} onChange={v => handleChange('firstName', v)} />
                <EditableField label="Middle Name" value={updatedProfile.middleName} editable={editing} onChange={v => handleChange('middleName', v)} />
                <EditableField label="Last Name" value={updatedProfile.lastName} editable={editing} onChange={v => handleChange('lastName', v)} />
                <EditableField label="Email" value={updatedProfile.email} editable={false} />
                <EditableField label="Address" value={updatedProfile.address} editable={editing} onChange={v => handleChange('address', v)} />
                <EditableField label="Contact No" value={updatedProfile.contactNo} editable={editing} onChange={v => handleChange('contactNo', v)} />
                <EditableField label="Birthday" value={new Date(updatedProfile.birthday?.seconds * 1000).toDateString()} editable={false} />
                <EditableField label="Work" value={updatedProfile.work} editable={editing} onChange={v => handleChange('work', v)} />
            </View>

            <View style={styles.buttonContainer}>
                {editing ? (
                    <>
                        <Button title="Save" onPress={handleUpdate} />
                        <Button title="Cancel" color="gray" onPress={() => setEditing(false)} />
                    </>
                ) : (
                    <Button title="Edit Profile" onPress={() => setEditing(true)} />
                )}
            </View>
        </ScrollView>
    );
}

const EditableField = ({ label, value, editable = false, onChange = () => { } }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}:</Text>
        {editable ? (
            <TextInput
                value={value}
                onChangeText={onChange}
                style={styles.input}
                placeholder={`Enter ${label}`}
            />
        ) : (
            <Text style={styles.value}>{value || '—'}</Text>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoBox: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        elevation: 3,
    },
    row: {
        marginBottom: 12,
    },
    label: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        borderRadius: 5,
        fontSize: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#888',
    },
    buttonContainer: {
        marginTop: 20,
        gap: 10,
    },
});
