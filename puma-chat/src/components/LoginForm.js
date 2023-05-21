import React, { useState } from "react";
import { loginUser } from "../firebase";

const LoginForm = () => {
    const [loginUserEmail, setLoginUserEmail] = useState("");
    const [loginUserPassword, setLoginUserPassword] = useState("");

    /*const loginUser = (event) => {
        event.preventDefault();
        if (loginUserEmail.trim() === "") {
            alert("Your email can't be empty!");
            return;
        }
        else if (loginUserPassword.trim() === "") {
            alert("Your password can't be empty!");
            return;
        }

        console.log(`The logged in user's email is ${loginUserEmail}`);
        console.log(`The logged in user's password is ${loginUserPassword}`);
    }*/

    const handleSubmission = (event) => {
        event.preventDefault();
        loginUser(loginUserEmail, loginUserPassword);
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
                        <button className="homepage-form-submit-button" type="submit">
                            Start Chatting
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;