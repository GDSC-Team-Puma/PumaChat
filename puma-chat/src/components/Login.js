import React from "react";
import RegistrationForm from './RegistrationForm.js';
import LoginForm from './LoginForm.js';

const Login = () => {
  return (
    <div className="description" >
      <div className="row">
        <h1>A new way to chat around the world.</h1> 
        <h2>Developed by Team Puma.</h2>
      </div>

      <div className="registration-login-forms">
        <RegistrationForm/>
        <LoginForm/>
      </div>
    </div>
  );
};

export default Login;
