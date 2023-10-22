import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import data from "./data";
import { Link } from "react-router-dom";
import "./quiz.css"
const Quiz = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("english");
    const [username, setUsername] = useState("");
    const [mcqs, setMcqs] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const username = localStorage.getItem("username");
        setUsername(username);
        const selectedData = data.find((item) => item[selectedLanguage]);

        if (selectedData) {
            setMcqs(selectedData[selectedLanguage]);
        }
    }, [selectedLanguage]);

     

    const handleSubmit = async () => {        
        const score = mcqs.reduce((total, mcq) => {
            if (mcq.selectedAnswer === mcq.correctAnswer) {
                total += 1;
            }
            return total;
        }, 0);

       
        const response = await axios.post('http://localhost:3000/api/leaderboard', {
            username:username, 
            score,
            language:selectedLanguage            
        });

        
        alert(`Your score is ${score}`);

 
    };
    return (
        <div className="quiz">
            <select
                ref={dropdownRef}
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
            >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
            </select>
            {mcqs.map((mcq, index) => (
                <div className="question-box" key={index}>
                    <p className="question">{mcq.question}</p>
                    <ul className="answers">
                        {mcq.answers.map((answer, ansIndex) => (
                            <li className="answer" key={ansIndex}>
                                <input
                                    type="radio"
                                    name={`mcq-${index}`}
                                    value={answer}
                                    checked={mcq.selectedAnswer === answer}
                                    onChange={(e) => {
                                        const updatedMcqs = [...mcqs];
                                        updatedMcqs[index].selectedAnswer = e.target.value;
                                        setMcqs(updatedMcqs);
                                    }}
                                />
                                {answer}        
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            <Link to="/dashboard">
                <button>Back to Dashboard</button>
            </Link>
        </div>
    );
};

export default Quiz;