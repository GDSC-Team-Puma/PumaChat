import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "firebase/firestore";

const UserSelect = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currUser] = useAuthState(auth);

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("uid", "!=", currUser.uid),
      limit(50)
    );

    const unsub = onSnapshot(q, (QuerySnapshot) => {
      let users = [];
      QuerySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUsers(users);
    });
    return () => unsub;
  }, []);

  const handleUserSelection = (user) => {
    if (user === null) {
      setSelectedUser(null);
      if (props.onUserSelection) {
        props.onUserSelection(null);
      }
    }
    if (user.uid !== currUser.uid) {
      setSelectedUser(user);
      if (props.onUserSelection) {
        props.onUserSelection(user);
      }
    }
  };
  return (
    <div className="user-list">
      <h2>Select a user to chat with:</h2>
      {users.map((user) => (
        <div key={user.id} className="user-item">
          <label>
            <input
              type="radio"
              name="user"
              value={user.id}
              checked={
                selectedUser &&
                selectedUser.id === user.id &&
                selectedUser !== null
              }
              onChange={() => handleUserSelection(user)}
            />
            {user.name}
          </label>
        </div>
      ))}
      <button
        id="global-chat-btn"
        onClick={() => {
          handleUserSelection(null);
        }}
      >
        Global Chat
      </button>
    </div>
  );
};
export default UserSelect;
