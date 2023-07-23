import React, { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
    id: number;
    note: number;
    content: string;
    created_at: string;
    created_by: {
        id: number;
        username: string;
    };
}

interface NewComment {
    note: number;
    content: string;
}

const Comments: React.FC = ({ match, history }: any) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<NewComment>({
        note: match.params.id,
        content: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
        .get(`http://localhost:8000/comments/`, {
            headers: { Authorization: `Token ${token}` },
        })
        .then((response) => {
            setComments(
            response.data.filter(
                (comment: Comment) => comment.note === parseInt(match.params.id)
            )
            );
        });
    }, [match.params.id]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment({ ...newComment, content: event.target.value });
    };

    const handleCreate = () => {
        const token = localStorage.getItem("token");
        axios
        .post(`http://localhost:8000/comments/`, newComment, {
            headers: { Authorization: `Token ${token}` },
        })
        .then((response) => setComments([...comments, response.data]));
    };

    const handleDelete = (commentId: number) => {
        const token = localStorage.getItem("token");
        axios
        .patch( // Assuming the API endpoint for logical deletion
            `http://localhost:8000/comments/${commentId}/`,
            { deleted_at: new Date().toISOString() }, // Assuming this is the way to mark a comment as deleted
            { headers: { Authorization: `Token ${token}` } }
        )
        .then(() =>
            setComments(comments.filter((comment) => comment.id !== commentId))
        );
    };

    return (
        <div>
        <h1>Comments</h1>
        <textarea value={newComment.content} onChange={handleInputChange} />
        <button onClick={handleCreate}>Create</button>
        {comments.map((comment) => (
            <div key={comment.id}>
            <p>{comment.content} (by {comment.created_by.username})</p>
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </div>
        ))}
        <button onClick={() => history.goBack()}>Go Back</button>
        </div>
    );
};

export default Comments;
