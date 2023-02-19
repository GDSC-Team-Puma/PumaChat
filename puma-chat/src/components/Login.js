import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { signInWithGoogle } from "../firebase";


const Login = () => {
  /*
  const addUser = async () => {
    console.log("adding new user");
    const { uid, displayName, photoURL } = auth.currentUser;
    const userRef = collection(db, "users");
    const result = await getDocs(query(userRef, where ("uid", "==", uid)));
    if (result.empty) {
      await addDoc(collection(db, "users"), {
        uid,
        name: displayName,
        authProvider: "google",
      });
    }
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    console.log("reached redirect signin");
    signInWithRedirect(auth, provider);

    auth.onAuthStateChanged((user) => {
      if (user) {
        addUser();
      }

    });
    
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        addUser();
      }
    });
    return unsub;
  }, []);

  
  */

  
  return (
    <div className="container-fluid" style={{ marginTop: "35px" }}>
      <div className="row">
        <Card>
          <Card.Body>
            <Card.Title>A new way to chat around the world.</Card.Title>
            <div>
              Developed by Team Puma.
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;