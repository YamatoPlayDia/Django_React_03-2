import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface IState {
    notes: any[];
    newNote: string;
}

class Home extends Component<{}, IState> {
    state: IState = { notes: [], newNote: "" };

    componentDidMount() {
        const token = localStorage.getItem("token");
        axios
        .get("http://localhost:8000/notes/", {
            headers: { Authorization: `Token ${token}` },
        })
        .then((response) => this.setState({ notes: response.data }));
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newNote: event.target.value });
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        axios
        .post(
            "http://localhost:8000/notes/",
            { content: this.state.newNote },
            { headers: { Authorization: `Token ${token}` } }
        )
        .then((response) => {
            this.setState({ notes: [...this.state.notes, response.data] });
        });
    };

    render() {
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
            <input
                type="text"
                name="newNote"
                onChange={this.handleInputChange}
            />
            <button type="submit">Create</button>
            </form>
            <ul>
            {this.state.notes.map((note) => (
                <li key={note.id}>
                <Link to={`/note/${note.id}`}>{note.title}</Link>
                </li>
            ))}
            </ul>
        </div>
        );
    }
}

export default Home;
