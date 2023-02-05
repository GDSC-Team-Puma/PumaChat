import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Login";
import { Register } from "./Register";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA8EN-MCSdx2aPaqi6Vj8gUdznOsB5t72A",
  authDomain: "chatmessenger-66568.firebaseapp.com",
  databaseURL: "https://chatmessenger-66568-default-rtdb.firebaseio.com",
  projectId: "chatmessenger-66568",
  storageBucket: "chatmessenger-66568.appspot.com",
  messagingSenderId: "921628900891",
  appId: "1:921628900891:web:5e60c649cefa499ce9c2be",
  measurementId: "G-2HHWT1SZ18"
}

const app = initializeApp(firebaseConfig);

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )}
    </div>
  );
}
export default App;
