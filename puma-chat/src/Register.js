import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";

function writeUserData(name) {
    if(name == ""){
        console.log("invalid username");
        return
    }
    const db = getDatabase();
    set(ref(db, 'users/' + name),{
        id: 1
    });
    console.log("user written to database");

}


export const Register = (props) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        writeUserData(username);
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}type="username" placeholder="Your Username" id="username" name="username" />
            <button type="submit" onClick={() => console.log("Submit")}>Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}