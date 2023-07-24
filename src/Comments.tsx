import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, ListGroup, Container } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';


interface Comment {
    id: number;
    note: number;
    content: string;
    created_at: string;
    created_by: {
        id: number;
        username: string;
    };
    deleted_at: string | null;  // deleted_at を追加
}

interface NewComment {
    note: number;
    content: string;
}

const Comments: React.FC = () => {
    const navigate = useNavigate();
    const { id: idString } = useParams();
    const id = Number(idString);
    if (isNaN(id)) {
        throw new Error("Invalid note ID.");
    }
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<NewComment>({
        note: id,
        content: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/comments/?note=${id}`, {
            headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
            setComments(response.data);
        });
    }, [id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment({ ...newComment, content: event.target.value });
    };
    const handleCreate = () => {
        const token = localStorage.getItem("token");
        axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/comments/`, newComment, {
            headers: { Authorization: `Token ${token}` },
        })
        .then((response) => setComments([...comments, response.data]))
        .catch((error) => console.error(error));
    };

    const handleDelete = (commentId: number) => {
        const token = localStorage.getItem("token");
        axios
        .delete(  // PATCH を DELETE に変更
            `${import.meta.env.VITE_API_BASE_URL}/comments/${commentId}/`,
            { headers: { Authorization: `Token ${token}` }, }
        )
        .then(() => {
            axios
            .get(`${import.meta.env.VITE_API_BASE_URL}/comments/?note=${id}`, {
                headers: { Authorization: `Token ${token}` },
            })
            .then((response) => {
                setComments(response.data);
            });
        });
    };

    return (
        <Container className="mt-5">
            <h1>Comments</h1>
            <Form.Control as="textarea" value={newComment.content} onChange={handleInputChange} />
            <Button variant="primary" onClick={handleCreate}>Create</Button>
            <ListGroup>
                {comments.map((comment) => (
                    <ListGroup.Item key={comment.id}>
                        {comment.content} (by {comment.created_by.username})
                        <Button variant="danger" onClick={() => handleDelete(comment.id)}>Delete</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
        </Container>
    );
};

export default Comments;