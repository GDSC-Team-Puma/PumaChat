import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA8EN-MCSdx2aPaqi6Vj8gUdznOsB5t72A",
  authDomain: "chatmessenger-66568.firebaseapp.com",
  databaseURL: "https://chatmessenger-66568-default-rtdb.firebaseio.com",
  projectId: "chatmessenger-66568",
  storageBucket: "chatmessenger-66568.appspot.com",
  messagingSenderId: "921628900891",
  appId: "1:921628900891:web:5e60c649cefa499ce9c2be",
  measurementId: "G-2HHWT1SZ18",
  databaseURL: "https://chatmessenger-66568-default-rtdb.firebaseio.com"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
