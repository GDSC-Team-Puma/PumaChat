import React, { useState } from "react";
import {collection, where, query, getDocs} from "firebase/firestore";
import { loginUser, db} from "../firebase";

const LoginForm = () => {
    const [loginUserEmail, setLoginUserEmail] = useState("");
    const [loginUserPassword, setLoginUserPassword] = useState("");
    const [bottomLineText, setBottomLineText] = useState("");

    const handleSubmission = async (event) => {
        event.preventDefault();
        if (loginUserEmail.trim() === "") {
            setBottomLineText("Your login email can't be empty!");
            return;
        }
        else if (loginUserPassword.trim() === ""){
            setBottomLineText("Your login password can't be empty!");
            return;
        }

        //Check to make sure the email and password exist in the Cloud Firestore "users" database.
        try {
            const usersDatabase = collection(db, "users");
            const result = await getDocs(query(usersDatabase, where ("email", "==", loginUserEmail)));
            if (result.empty){
                setBottomLineText("Account with this email not found!");
                return;
            }
            const loginUserDoc = result.docs[0];
            if (loginUserDoc.data().password !== loginUserPassword){
                setBottomLineText("Password doesn't match the account!");
                return;
            }
            loginUser(loginUserEmail, loginUserPassword);
        } catch(err) {
            alert(err.message);
        }
    };

    return (
        <div className="login-form">
            <h1>Login Here!</h1>
            <div className="homepage-fields">
                <form onSubmit={(event) => handleSubmission(event)}>
                    <div className="homepage-form-unit">
                        <label htmlFor="login-form-email-field">
                            Email
                        </label>
                        <input
                            id="login-form-email-field"
                            className="homepage-field"
                            name="loginEmailInput"
                            type="email"
                            placeholder="example@gmail.com"
                            value={loginUserEmail}
                            onChange={(e) => setLoginUserEmail(e.target.value)}
                        />
                    </div>
                    <div className="homepage-form-unit">
                        <label htmlFor="login-form-password-field">
                            Password
                        </label>
                        <input
                            id="login-form-password-field"
                            className="homepage-field"
                            name="loginPasswordInput"
                            type="password"
                            value={loginUserPassword}
                            onChange={(e) => setLoginUserPassword(e.target.value)}
                        />
                    </div>
                    <p className="bottom-line">{bottomLineText}</p>
                    <button className="homepage-form-submit-button" type="submit">
                        Start Chatting
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;