import { getFirestore, collection, addDoc, where, query, getDocs} from "firebase/firestore";
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
                photoURL: user.photoURL
            });
        }
    } catch (err) {
        alert(err.message);
    }
};

export const createNewUserAccount = async (newUserFullName, newUserEmail, newUserPassword) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(newUserEmail, newUserPassword);
        const user = res.user;
        await user.updateProfile({
            displayName: newUserFullName,
        })
        const userRef = collection(db, "users");
        const result = await getDocs(query(userRef, where ("uid", "==", user.uid)));
        if (result.empty) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: newUserFullName,
                authProvider: "registration/login",
                email: newUserEmail,
                password: newUserPassword,
            });
        }
        console.log("New user signed in via creating an account via registration form");
        console.log(`The new user's name is ${newUserFullName}`);
        console.log(`The new user's email is ${newUserEmail}`);
        //by default, createUserWithEmailAndPassword signs the user in, so log out by default.
        auth.signOut();
    } catch (err) {
        alert(err.message);
    }
}

export const loginUser = async (loginUserEmail, loginUserPassword) => {
    try {
        const res = await auth.signInWithEmailAndPassword(loginUserEmail, loginUserPassword);
        //Returns a UserCredential, which is an object that contains the "user" as a property.
        const user = res.user;
        const userRef = collection(db, "users");
        const result = await getDocs(query(userRef, where ("uid", "==", user.uid)));
        //Returns a QuerySnapshot, which contains a property "docs" that = array of document objects that match the query.
        //For now, we assume that EVERYTHING goes smoothly in sign-in process.
        const loginUserDoc = result.docs[0];
        //This individual doc, or document object, contains a method "data" that returns an object of all the fields in this doc.
        if (!user.displayName){
            await user.updateProfile({
                displayName: loginUserDoc.data().name,
            })
        }
        console.log("A user just logged in via login form");
        console.log(`The logged in user's name is ${loginUserDoc.data().name}`);
        console.log(`The logged in user's email is ${loginUserDoc.data().email}`);
    } catch(err) {
        alert(err.message);
    }
}