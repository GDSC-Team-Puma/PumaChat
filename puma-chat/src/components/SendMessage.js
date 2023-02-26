import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const sendMessage = ({ scroll }) => {
    const[message, setMessage] = useState("");
}

export default sendMessage;