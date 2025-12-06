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
let db;
try {
    // Only initialize if we have at least an API key, otherwise allow "mock" online mode
    if (firebaseConfig.apiKey) {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
    } else {
        console.warn("Firebase config missing. Running in Mock Online Mode.");
    }
} catch (error) {
    console.warn("Firebase config invalid. Running in Mock Online Mode.", error);
}

export const createOnlineRoom = async (roomCode, initialData) => {
    // If no DB, we just pretend it worked so the UI can proceed (Mock Mode)
    if (!db) {
        console.log("Mocking Room Creation:", roomCode);
        return true;
    }
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
    if (!db) {
        console.log("Mock Subscribing to Room (No DB)", roomCode);
        return () => { };
    }
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
