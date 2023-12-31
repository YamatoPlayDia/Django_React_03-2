import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { Button, Form, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "username") {
        setUsername(event.target.value);
        } else {
        setPassword(event.target.value);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/dj-rest-auth/login/`, { username, password })
        .then((response) => {
            localStorage.setItem("token", response.data.key);
            navigate("/");
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

                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </Container>
    );
};

export default Login;
