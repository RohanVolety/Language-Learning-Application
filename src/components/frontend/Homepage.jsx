import React from "react";
import Signup from "./AuthForm";
import "./AuthForm.css"
import Greetings from "./greetings";
const Homepage = () => {
    const welcomeMessage = "Welcome to the Language Learning Game!";

    return (
        <div>
            <h1 className="welcome">{welcomeMessage}</h1>
            <Greetings />
            <Signup />
            
        </div>
    );
};

export default Homepage;
