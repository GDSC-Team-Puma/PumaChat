import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  where,
  onSnapshot,
  limit,
  getDocs,
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
    let q1 = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      where("from", "==", currUser.uid),
      where("to", "==", props.selectedUser.uid),
      limit(50)
    );

    const q2 = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      where("from", "==", props.selectedUser.uid),
      where("to", "==", currUser.uid),
      limit(50)
    );

    // const q = query(
    //   collection(db, "messages"),
    //   orderBy("createdAt"),
    //   limit(50)
    // );


    const receivedUnsub = onSnapshot(q2, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id});
      });

      getDocs(q1).then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          messages.push({...doc.data(), id: doc.id});
        });

        messages.sort((a,b) => b.createdAt - a.createdAt);

        setMessages(messages);
      });
    });

    const sentUnsub = onSnapshot(q1, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({...doc.data(), id: doc.id});
      });

      getDocs(q2).then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          messages.push({...doc.data(), id: doc.id});
        });

        messages.sort((a,b) => b.createdAt - a.createdAt);

        setMessages(messages);
      });
    });


    // let unsub = onSnapshot(q1, (QuerySnapshot) => {
    //   let messages = [];
    //   QuerySnapshot.forEach((doc) => {
    //     messages.push({...doc.data(), id:doc.id});
    //   });
    //   setMessages(messages);

    // })

    return () => {
      // unsub();
      sentUnsub();
      receivedUnsub();
      console.log("selected user", props.selectedUser);
      console.log("messages", messages);

    };
  }, [props]);

  
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