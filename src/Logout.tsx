import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <Button variant="secondary" onClick={handleLogout}>Logout</Button>
    );
};

export default Logout;
