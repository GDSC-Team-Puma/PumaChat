import React, { useState} from "react";
import { createNewUserAccount } from "../firebase";

const RegistrationForm = () => {
    const [newUserFullName, setNewUserFullName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");

    const handleSubmission = (event) => {
        event.preventDefault();
        createNewUserAccount(newUserFullName, newUserEmail, newUserPassword);
    };

    return (
        <div className="register-form">
            <h1>Register Here!</h1>
            <div className="homepage-fields">
                <form onSubmit={(event) => handleSubmission(event)}>
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