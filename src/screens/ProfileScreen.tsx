import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
    const { profile } = useAuth();

    if (!profile) {
        return (
            <View style={styles.centered}>
                <Text style={styles.loadingText}>Loading profile...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Your Profile</Text>

            <View style={styles.infoBox}>
                <LabelValue label="First Name" value={profile.firstName} />
                <LabelValue label="Middle Name" value={profile.middleName} />
                <LabelValue label="Last Name" value={profile.lastName} />
                <LabelValue label="Email" value={profile.email} />
                <LabelValue label="Address" value={profile.address} />
                <LabelValue label="Contact No" value={profile.contactNo} />
                <LabelValue label="Birthday" value={new Date(profile.birthday?.seconds * 1000).toDateString()} />
                <LabelValue label="Work" value={profile.work} />
            </View>
        </ScrollView>
    );
}

const LabelValue = ({ label, value }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value || '—'}</Text>
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
    },
    value: {
        fontSize: 16,
        color: '#666',
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
});
