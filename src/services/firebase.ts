// src/services/firebase.ts
import auth from '@react-native-firebase/auth';

export const firebaseAuth = auth();

export const loginUser = async (email: string, password: string) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
};

export const registerUser = async (email: string, password: string) => {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
};

export const logoutUser = async () => {
    return firebaseAuth.signOut();
};
