import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

const Login: React.FC = ({ history }: any) => {
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
        .post("http://localhost:8000/api-token-auth/", { username, password })
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            history.push("/");
        });
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            name="username"
            onChange={handleInputChange}
            />
            <input
            type="password"
            name="password"
            onChange={handleInputChange}
            />
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;
