import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Leaderboard.css";

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await axios.get("http://localhost:3000/api/leaderboard");
                setLeaderboardData(response.data);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        }

        fetchLeaderboard();
    }, []);

    return (
        <div className="leaderboard-container">
            <h1 className="leaderboard-heading">Leaderboard</h1>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Language</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((user, index) => (
                        <tr
                            key={index}
                            className={index < 3 ? "top-3" : ""}
                        >
                            <td>{user.username}</td>
                            <td>{user.score}</td>
                            <td>{user.language}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/dashboard">
                <button>Back to Dashboard</button>
            </Link>
        </div>
    );
};

export default Leaderboard;
