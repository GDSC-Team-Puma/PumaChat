import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { signInWithGoogle } from "../firebase";


const Login = () => {

  return (
    <div className="container-fluid" style={{ marginTop: "35px" }}>
      <div className="row">
        <Card>
          <Card.Body>
            <Card.Title>A new way to chat around the world.</Card.Title>
            <div>
              Developed by Team Puma.
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;