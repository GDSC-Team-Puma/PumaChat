import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  where,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = (props) => {
  const [messages, setMessages] = useState([]);
  const [currUser] = useAuthState(auth);

  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      where("to", "==", props.selectedUser.uid),
      where("to", "==", currUser.uid),
      where("from", "==", props.selectedUser.uid),
      where("from", "==", currUser.uid),
      limit(50)
    );

    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id});
      });
      setMessages(messages);
    });
    return () => unsub;
  }, []);

  return (
    <div className="chat-box">
      <div className="messages">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} selectedUser={props.selectedUser} />
    </div>
  );



};

export default ChatBox;