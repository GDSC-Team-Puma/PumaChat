import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";

function writeUserData(name) {
    const db = getDatabase();
    set(ref(db, 'users/' + name),{
        id: 1
    });
}


export const Register = (props) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        writeUserData(username);
        console.log("user written to database");
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="Your Username" id="username" name="username" />
            <button type="submit" onClick={() => console.log(username)}>Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}