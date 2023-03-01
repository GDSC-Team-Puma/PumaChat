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
import ChatBox from "./ChatBox";
import GlobalChatBox from "./GlobalChatBox";

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
        <div>
            {selectedUser ? (
                <p>Connected to a private chat with {selectedUser.name}...</p>

            ) : (
                <p>Connected to global chat...</p>
            )}
        </div>
        

        <div className="homepage-elements">
            
            <div id = "chatSelection">
                <UserSelect auth={auth} onUserSelection={handleUserSelection} selected={selectedUser}/>
                <button id="global-chat-btn" onClick={() => {handleUserSelection(null)}}>Global Chat</button>
                <p id="firebase-tag">Powered by Firebase</p>
            </div>

            <div id = "message-input">
                {selectedUser ? (
                    <ChatBox selectedUser={selectedUser}/>
                ) : (
                    <GlobalChatBox/>
                )}
            </div>

        </div>
        

        
      </div>
      
    );
};

export default Homepage;