import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";

interface Note {
    id: number;
    title: string;
    content: string;
}

const Notes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/notes/`, {
            headers: { Authorization: `Token ${token}` },
            })
            .then((response) => setNotes(response.data));
    }, []);

    const handleDelete = (id: number) => {
        const token = localStorage.getItem("token");
        axios
            .delete(`${import.meta.env.VITE_API_BASE_URL}/notes/${id}/`, {
            headers: { Authorization: `Token ${token}` },
            })
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
            });
    };

    return (
        <div>
            {notes.map(note => (
                <Card key={note.id}>
                    <Card.Header as="h5">{note.title}</Card.Header>
                    <Card.Body>
                        <Card.Text>{note.content}</Card.Text>
                        <Button variant="danger" onClick={() => handleDelete(note.id)}>Delete</Button>
                        <Link to={`/note/${note.id}/comments`}>View Comments</Link>
                    </Card.Body>
                </Card>
            ))}
            <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
        </div>
    );
}

export default Notes;
