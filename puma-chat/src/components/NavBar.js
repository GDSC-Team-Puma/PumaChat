import React from "react"
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import Button from "react-bootstrap/Button";
import { signInWithGoogle } from "../firebase";

const NavBar = () => {
  const [user] = useAuthState(auth);
/*
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
*/
  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className = "nav-bar">
      <h1>Puma Chat</h1>
      {user ? (
        <Button
        style={{margin: '5%'}}
        variant="outline-danger"
        type="submit"
        onClick={signOut}>
            Sign Out
        </Button>
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