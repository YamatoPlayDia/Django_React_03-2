import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface Note {
    id: number;
    title: string;
    content: string;
}

const Note = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState<Note | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
            .get(`http://localhost:8000/notes/${id}/`, {
            headers: { Authorization: `Token ${token}` },
            })
            .then((response) => setNote(response.data));
    }, [id]);

    const handleDelete = () => {
        const token = localStorage.getItem("token");
        axios
            .delete(`http://localhost:8000/notes/${id}/`, {
            headers: { Authorization: `Token ${token}` },
            })
            .then(() => navigate('/'));
    };

    return note ? (
        <div>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
        <button onClick={handleDelete}>Delete</button>
        <Link to={`/note/${note.id}/comments`}>View Comments</Link>
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default Note;
