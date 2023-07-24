import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, Form, Alert } from "react-bootstrap";

interface IState {
    notes: any[];
    newNote: string;
    newTitle: string;
    success: string;
}

class Home extends Component<{}, IState> {
    state: IState = { notes: [], newNote: "", newTitle: "", success: "" };

    componentDidMount() {
        const token = localStorage.getItem("token");
        axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/notes/`, {
            headers: { Authorization: `Token ${token}` },
        })
        .then((response) => this.setState({ notes: response.data }));
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newNote: event.target.value });
    };

    handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newTitle: event.target.value });
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        axios
        .post(
            `${import.meta.env.VITE_API_BASE_URL}/notes/`,
            {
                title: this.state.newTitle,
                content: this.state.newNote
            },
            { headers: { Authorization: `Token ${token}` } }
        )
        .then((response) => {
            this.setState({
                notes: [...this.state.notes, response.data],
                newNote: "",
                newTitle: "",
                success: "Success"
            });
        });
    };

    render() {
        const token = localStorage.getItem("token");
        return (
        <Container className="text-center">
            <Container className="p-3">
                <h1>Django×React</h1>
                <p>Herokuから送るコミュニケーションツール</p>
                {this.state.success && <Alert variant="success">{this.state.success}</Alert>}
            </Container>
            {token ? (
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="newTitle">
                            <Form.Label>Note Title:</Form.Label>
                            <Form.Control type="text" onChange={this.handleTitleChange} value={this.state.newTitle} />
                        </Form.Group>
                        <Form.Group controlId="newNote">
                            <Form.Label>Write a new note:</Form.Label>
                            <Form.Control type="text" onChange={this.handleInputChange} value={this.state.newNote} />
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
    }
}

export default Home;
