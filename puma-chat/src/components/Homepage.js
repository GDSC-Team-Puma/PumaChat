import React, { useEffect, useRef, useState } from 'react';
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { setUserProperties } from 'firebase/analytics';
import { useAuthState } from "react-firebase-hooks/auth";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Homepage = () => {
    const [data, setData] = useState([]);
    const [user] = useAuthState(auth);


    useEffect(() => {
        const q = query(
            collection(db, "users"),
            limit(50)
        );

        const unsub = onSnapshot(q, (QuerySnapshot) => {
            let users = [];
            QuerySnapshot.forEach((doc) => {
                users.push({...doc.data(), id:doc.id});
            });
            setData(users);
        });
        return () => unsub;
    }, []);

    console.log("Data: ", data);

    return (
      <div className="container-fluid" style={{ marginTop: "10%" }}>
        <div className="row">
          <Card.Title>Welcome</Card.Title>
          <div>
            { data?.map((selected) => (
              <div>{selected.uid == user.uid ? selected.name : ""}</div>
            ))}
                
          </div>
        </div>
      </div>
    );

/*
        const db = getFirestore();
        const userDocRef = doc(collection(db, "users"), user.uid);

        getDoc(userDocRef).then((doc) => {
            if (doc.exists) {
                setUserDoc(doc.data());
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("error getting document:", error);
        });
    }, [user.uid]);

    return (
        <div className="container-fluid" style={{ marginTop: "10%" }}>
          <div className="row">
              <Card.Body>
                <Card.Title>Welcome</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <div>
                        {userDoc ? (
                            <div>
                                <h2>{userDoc.name}</h2>
                                <p>Email: {userDoc.email}</p>
                                <p>Name: {userDoc.name}</p>
                            </div>
                        ) : (
                            <p>Loading user document...</p>
                        )}
                    </div>
                </Card.Subtitle>
                <img src={user.photoURL} alt="" />
                <Button
                style={{margin: '5%'}}
                variant="outline-danger"
                type="submit"
                onClick={() => auth.signOut()}
              >
                Sign Out
              </Button>
              </Card.Body>
          </div>
        </div>
    );
    */
};

export default Homepage;