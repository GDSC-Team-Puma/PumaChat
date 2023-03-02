import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendGlobalMessage from "./SendGlobalMessage";

const GlobalChatBox = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "global_messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      messages.sort((a, b) => b.createdAt - a.createdAt);

      setMessages(messages);
    });
    return () => unsub;
  }, []);

  return (
    <main className="chat-box">
      <div className="messages">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls dowwn to the scroll div */}
      <span ref={scroll}></span>
      <SendGlobalMessage scroll={scroll} />
    </main>
  );
};

export default GlobalChatBox;
