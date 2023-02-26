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
import UserSelect from "./UserSelect";

const Homepage = () => {
    const [data, setData] = useState([]);
    const [user] = useAuthState(auth);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserSelection = (user) => {
        setSelectedUser(user);
    };


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
    console.log(user.photoURL);
    return (
      <div className="container-fluid" style={{ marginTop: "10%" }}>
        <div className="row">
        <div id = "pfp"> <img src = {user.photoURL}></img> </div>
          <Card.Title>Welcome</Card.Title>
          <div>
            { data?.map((selected) => (
              <div>{selected.uid == user.uid ? selected.name : ""}</div>
            ))}
            
          </div>


        </div>
        <div id = "chatSelection">
        <UserSelect auth={auth} onUserSelection={handleUserSelection} />
        <p> Selected user: {selectedUser ? selectedUser.name : 'None'} </p>
        </div>
        

        
      </div>
      
    );
};

export default Homepage;