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
      )}
    </div>
  );
      };
}
export default App;
