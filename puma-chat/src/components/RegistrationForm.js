import React, { useState, useEffect } from "react";

const RegistrationForm = () => {
    const [newUserFullName, setNewUserFullName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");

    const createNewAccount = (event) => {
        event.preventDefault();
        if (newUserFullName.trim() === "") {
            alert("Your name can't be empty!");
            return;
        }
        else if (newUserEmail.trim() === "") {
            alert("Your email can't be empty!");
            return;
        }
        else if (newUserPassword.trim() === "") {
            alert("Your password can't be empty!");
            return;
        }

        console.log(`The new user's full name is ${newUserFullName}`);
        console.log(`The new user's email is ${newUserEmail}`);
        console.log(`The new user's password is ${newUserPassword}`);
    }

    return (
        <div className="register-form">
            <h1>Register Here!</h1>
            <div className="homepage-fields">
                <form onSubmit={(event) => createNewAccount(event)}>
                    <div className="homepage-form-unit">
                        <label htmlFor="register-form-full-name-field">
                            Enter your full name
                        </label>
                        <input
                            id="register-form-full-name-field"
                            className="homepage-field"
                            name="registrationFullNameInput"
                            type="text"
                            placeholder="Firstname Lastname"
                            value={newUserFullName}
                            onChange={(e) => setNewUserFullName(e.target.value)}
                        />
                    </div>
                    <div className="homepage-form-unit">
                        <label htmlFor="register-form-email-field">
                            Enter your E-mail
                        </label>
                        <input
                            id="register-form-email-field"
                            className="homepage-field"
                            name="registrationEmailInput"
                            type="email"
                            placeholder="example@gmail.com"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                        />
                    </div>
                    <div className="homepage-form-unit">
                        <label htmlFor="register-form-password-field">
                            Enter your password
                        </label>
                        <input
                            id="register-form-password-field"
                            className="homepage-field"
                            name="registrationPasswordInput"
                            type="password"
                            value={newUserPassword}
                            onChange={(e) => setNewUserPassword(e.target.value)}
                        />
                    </div>
                    <button className="homepage-form-submit-button" type="submit">
                        Create New Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;