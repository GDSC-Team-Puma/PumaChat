import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = (props) => {
    const[message, setMessage] = useState("");
    console.log(props.selectedUser.uid);
    const sendMessage = async (event) => {
        event.preventDefault();
        if (message.trim() === "") {
            alert("Enter valid message");
            return;
        }

        const { uid, displayName, photoURL } = auth.currentUser;
        await addDoc(collection(db, "messages"), {
            text: message,
            from: uid,
            to: props.selectedUser.uid,
            avatar: photoURL,
            createdAt: serverTimestamp(),
        });
        setMessage("");
        props.scroll.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <form onSubmit={(event) => sendMessage(event)}>
            <label htmlFor="messageInput" hidden>
                Enter message
            </label>
            <input 
                id="messageInput"
                name="messageInput"
                type="text"
                placeholder="type message..."
                value= {message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default SendMessage;