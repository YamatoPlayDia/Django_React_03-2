import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, Form, Alert } from "react-bootstrap";

const Home: React.FC = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const [newNote, setNewNote] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [success, setSuccess] = useState("");
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/notes/`, {
                headers: { Authorization: `Token ${token}` },
            })
            .then((response) => setNotes(response.data));
        }
    }, [token]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewNote(event.target.value);
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (token) {
            axios
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/notes/`,
                {
                    title: newTitle,
                    content: newNote
                },
                { headers: { Authorization: `Token ${token}` } }
            )
            .then((response) => {
                setNotes([...notes, response.data]);
                setNewNote("");
                setNewTitle("");
                setSuccess("Success");
            });
        }
    };

    return (
        <Container className="text-center">
            <Container className="p-3">
                <h1>Django×React</h1>
                <p>Herokuから送るコミュニケーションツール</p>
                {success && <Alert variant="success">{success}</Alert>}
            </Container>
            {token ? (
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="newTitle">
                            <Form.Label>Note Title:</Form.Label>
                            <Form.Control type="text" onChange={handleTitleChange} value={newTitle} />
                        </Form.Group>
                        <Form.Group controlId="newNote">
                            <Form.Label>Write a new note:</Form.Label>
                            <Form.Control type="text" onChange={handleInputChange} value={newNote} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                    <Button variant="secondary" size="lg" style={{ margin: "10px" }}>
                        <Link to="/note/" className="text-white text-decoration-none">View Note</Link>
                    </Button>
                    <Button variant="secondary" size="lg">
                        <Link to="/logout" className="text-white text-decoration-none">Logout</Link>
                    </Button>
                </div>
            ) : (
                <div>
                    <Button variant="primary" size="lg" style={{ margin: "10px" }}>
                        <Link to="/login" className="text-white text-decoration-none">Login</Link>
                    </Button>
                    <Button variant="secondary" size="lg">
                        <Link to="/signup" className="text-white text-decoration-none">Sign Up</Link>
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default Home;
