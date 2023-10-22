import React, { useState } from "react";
import Axios from "axios";
import "./AuthForm.css"
import "./Quiz"

const AuthForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const credentials = {
            username: formData.get('username'),
            password: formData.get('password'),
        };

        let response;

        try {
            if (isSignUp) {
                response = await Axios.post("http://localhost:3000/api/signup", credentials);
            } else {
                response = await Axios.post("http://localhost:3000/api/login", credentials);
            }

            if (!response) {
                alert("An error occurred while signing up or logging in. Please try again later.");
                return;
            }

            const token = response.data.token;
            localStorage.setItem("username", credentials.username);
            localStorage.setItem("token", token);

            if (isSignUp) {
                setIsSignupSuccess(true);
                alert("User successfully signed up. Now you can log in.");
            } else {
                window.location.href = "/dashboard";
            }

        } catch (error) {
            if (isSignUp) {
                if (error.response && error.response.status === 400) {
                    alert("The username is already in use");
                } else {
                    alert("An error occurred while signing up. Please try again later.");
                }
            } else {
                if (error.response && error.response.status === 401) {
                    alert("Incorrect username or password");
                } else {
                    alert("An error occurred while logging in. Please try again later.");
                }
            }
        }
    };

    return (
        <div>
            <div className="form-container">
                <div className="column">
                    <h2>Choose an action</h2>
                    <button className="small-button" onClick={() => setIsSignUp(true)}>
                        Sign Up
                    </button>
                    <button className="small-button" onClick={() => setIsSignUp(false)}>
                        Log In
                    </button>
                </div>
                <div className="column">
                    <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className="input-field"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="input-field"
                        />
                        <button type="submit" className="button">
                            {isSignUp ? "Sign Up" : "Log In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
