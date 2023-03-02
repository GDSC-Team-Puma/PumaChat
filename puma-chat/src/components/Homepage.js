import React, { useEffect, useRef, useState } from "react";
import { query, collection, onSnapshot, limit } from "firebase/firestore";
import { db, auth } from "../firebase";
import UserSelect from "./UserSelect";
import ChatBox from "./ChatBox";
import GlobalChatBox from "./GlobalChatBox";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    const q = query(collection(db, "users"), limit(50));

    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let users = [];
      QuerySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setData(users);
    });
    return () => unsub;
  }, []);

  //console.log("Data: ", data);
  //console.log(user.photoURL);
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
        <div id="chatSelection">
          <UserSelect
            auth={auth}
            onUserSelection={handleUserSelection}
            selected={selectedUser}
          />
          <p id="firebase-tag">Powered by Firebase</p>
        </div>

        <div id="message-input">
          {selectedUser ? (
            <ChatBox selectedUser={selectedUser} />
          ) : (
            <GlobalChatBox />
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
