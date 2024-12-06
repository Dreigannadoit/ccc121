import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../css/registration.css";

const Registration = () => {

    // TODO: Connect to Databse Later

    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if the credentials are correct
        if (formData.username === "Hello" && formData.password === "World") {
            console.log("Login successful");
            navigate("/dashboard"); // Redirect to the Dashboard
        } else {
            console.log("Invalid credentials");
            alert("Invalid username or password");
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <div className="imgcontainer">
                    <h1>Username: Hello</h1>
                    <h1>Password: World</h1>
                </div>

                <div className="container">
                    <label htmlFor="uname">
                        <b>Username</b>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="psw">
                        <b>Password</b>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Login</button>
                    <label>
                        <input type="checkbox" name="remember" /> Remember me
                    </label>
                </div>

                <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
                    <button type="button" className="cancelbtn">
                        Cancel
                    </button>
                    <span className="psw">
                        Forgot <a href="#">password?</a>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Registration;
