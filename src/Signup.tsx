import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target.name;
        if (target === "username") {
            setUsername(event.target.value);
        } else if (target === "password") {
            setPassword(event.target.value);
        } else if (target === "email") {
            setEmail(event.target.value);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/dj-rest-auth/registration/`, { username, password1: password, password2: password, email })
        .then(() => {
            // Log out the user by removing the token from localStorage
            localStorage.removeItem("token");
            navigate("/");
        })
        .catch((error) => {
          // Log the error response body
            if (error.response) {
                console.error(error.response.data);
            } else {
                console.error(error);
            }
        });
    };

    return (
        <Container className="mt-5">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleInputChange} />
                </Form.Group>

                <Button variant="primary" type="submit">Sign Up</Button>
            </Form>
        </Container>
    );
};

export default Signup;
