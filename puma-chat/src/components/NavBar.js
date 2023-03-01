import React from "react"
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import Button from "react-bootstrap/Button";
import { signInWithGoogle } from "../firebase";
// import GoogleButton from "react-google-button"; //to access you need to npm install


const NavBar = () => {
  const [user] = useAuthState(auth);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className = "nav-bar">
      <h1>Puma Chat</h1>
      {user ? (
        <div className="user-nav">
          <p id="welcome">Welcome, {user.displayName}</p>

          <img src = {user.photoURL} id="pfp"></img> 

          <Button
          variant="outline-danger"
          type="submit"
          onClick={signOut}>
              Sign Out
          </Button>
        </div>
      ) : (
        <Button
        variant="outline-primary"
        onClick={signInWithGoogle}>
            <i className="fab fa-google"></i>Sign-in with Google
        </Button>
      )}

    </nav>
  );
};

export default NavBar;