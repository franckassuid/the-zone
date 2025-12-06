// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, updateDoc, collection } from "firebase/firestore";

// TODO: Replace with your actual Firebase project config
// Since I don't have the user's keys, I'll use placeholders or environment variables
// The user will need to create a project at console.firebase.google.com
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
// We wrap this in a try-catch or check if config is present to avoid crashing if keys aren't set
let db;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
} catch (error) {
    console.warn("Firebase config missing or invalid. Online mode will not sync.", error);
}

export const createOnlineRoom = async (roomCode, initialData) => {
    if (!db) return;
    try {
        await setDoc(doc(db, "rooms", roomCode), initialData);
        return true;
    } catch (e) {
        console.error("Error creating room: ", e);
        return false;
    }
};

export const joinOnlineRoom = async (roomCode, playerData) => {
    if (!db) return;
    const roomRef = doc(db, "rooms", roomCode);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
        const data = roomSnap.data();
        if (!data.players.some(p => p.id === playerData.id)) {
            const newPlayers = [...data.players, playerData];
            await updateDoc(roomRef, { players: newPlayers });
        }
        return data; // Return current room state
    } else {
        throw new Error("Room not found");
    }
};

export const subscribeToRoom = (roomCode, callback) => {
    if (!db) return () => { };
    return onSnapshot(doc(db, "rooms", roomCode), (doc) => {
        if (doc.exists()) {
            callback(doc.data());
        }
    });
};

export const updateRoomState = async (roomCode, updates) => {
    if (!db) return;
    const roomRef = doc(db, "rooms", roomCode);
    await updateDoc(roomRef, updates);
};
