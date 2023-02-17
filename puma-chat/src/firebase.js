import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, where, query, getDocs } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA8EN-MCSdx2aPaqi6Vj8gUdznOsB5t72A",
    authDomain: "chatmessenger-66568.firebaseapp.com",
    databaseURL: "https://chatmessenger-66568-default-rtdb.firebaseio.com",
    projectId: "chatmessenger-66568",
    storageBucket: "chatmessenger-66568.appspot.com",
    messagingSenderId: "921628900891",
    appId: "1:921628900891:web:5e60c649cefa499ce9c2be",
    measurementId: "G-2HHWT1SZ18",
};

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//export const auth = getAuth(app);
// export const db = getFirestore(app);

firebase.initializeApp(firebaseConfig);
export const db = getFirestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const auth = firebase.auth();
export default firebase;

export const signInWithGoogle = async () => {
    try {
        const res = await auth.signInWithPopup(provider);
        const user = res.user;
        const userRef = collection(db, "users");
        const result = await getDocs(query(userRef, where ("uid", "==", user.uid)));
        if (result.empty) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        alert(err.message);
    }
};