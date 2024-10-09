// utils/firebaseUtils.js
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

export const saveUserData = async (userId, data) => {
    try {
        await setDoc(doc(db, 'users', userId), data);
    } catch (error) {
        console.error("Error saving user data: ", error);
    }
};

export const getUserData = async (userId) => {
    try {
        const docSnap = await getDoc(doc(db, 'users', userId));
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting user data: ", error);
    }
};
