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
    <div className="container-fluid" style={{ marginTop: "10%" }}>
      <div className="row">
        <Card>
          <Card.Body>
            <Card.Title>User Login</Card.Title>
            <div>
                
              <Button
                variant="outline-primary"
                type="submit"
                onClick={signInWithGoogle}
              >
                <i className="fab fa-google"></i>Sign-in with Google
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;