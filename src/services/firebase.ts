import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const firebaseAuth = auth();
export const firebaseFirestore = firestore();

export const loginUser = async (email: string, password: string) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
};

export const registerUser = async (
    email: string,
    password: string,
    profileData: Record<string, any>

) => {
    const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
    const { uid } = userCredential.user;

    await firebaseFirestore.collection('users').doc(uid).set(profileData);

    return userCredential;
};

export const logoutUser = async () => {
    return firebaseAuth.signOut();
};