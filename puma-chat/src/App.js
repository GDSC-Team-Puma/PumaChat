<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Login";
import { Register } from "./Register";
import { Homepage } from "./Homepage";
import firebase from 'firebase/compat/app';
import 'firebase/auth';

function App() {
  const UserAuth = () => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          setUser(user);
        } else {
          // No user is signed in.
          setUser(null);
        }
      });
    }, []);
  
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    };
  
    const signOut = () => {
      firebase.auth().signOut();
    };

  return (
    <div className="App">
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
=======
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="app">
      <NavBar />
      {!user ? (
        <Login />
      ) : (
        <>
          <Homepage />
        </>
>>>>>>> 4db913c7417846ba46b139285b7832022b3202c5
      )}
    </div>
  );
      };
}
export default App;
