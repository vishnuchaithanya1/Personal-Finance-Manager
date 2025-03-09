import React, { useState } from "react";
import "./login.css";
import img from '../Images/images.jpeg';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { email, password, ...(isSignUp && { username }) };

        try {
            const response = isSignUp
                ? await axios.post("http://localhost:5000/api/signup", payload)
                : await axios.post("http://localhost:5000/api/login", payload);

            if (isSignUp) {
                alert("Account created successfully!");
                setIsSignUp(false);
            } else {
                localStorage.setItem("token", response.data.token);

                navigate("/home");
            }

            setEmail("");
            setPassword("");
            setUsername("");

        } catch (error) {
            alert(error.response?.data?.message || "An error occurred");
            setEmail("");
            setPassword("");
            setUsername("");
        }
    };

    return (
        <div className="container">
            <div className="login-signup-container">
                <div className="left-section">
                    <img src={img} alt="image-login" className="login-image" />
                </div>
                <div className="right-section">
                    <div className="form-wrapper">
                        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
                        <form onSubmit={handleSubmit} className={isSignUp ? "signup-form" : "login-form"}>
                            {isSignUp && (
                                <div className="form-group">
                                    <label htmlFor="username">Username:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="Enter your name"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            )}
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="submit-btn">
                                {isSignUp ? "Sign Up" : "Log In"}
                            </button>
                        </form>
                        <button onClick={toggleForm} className="toggle-btn">
                            {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
