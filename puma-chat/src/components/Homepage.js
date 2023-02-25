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
      <div id = "pfp"> <img src = {user.photoURL}></img> </div>
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
};

export default Homepage;