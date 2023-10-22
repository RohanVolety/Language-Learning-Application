import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const quizzesTaken = 0;
  const badgesEarned = 0;
  const achievementsUnlocked = 0;

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      if (option === 2) {
        alert("Correct! You got it right.");
      } else {
        alert("Sorry, that's incorrect. Try again tomorrow!");
      }
      setIsAnswered(true);
    }
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>Welcome to your dashboard, {username}!</h1>
      </header>
      <div className="dashboard">
        <div className="dashboard-text">
          <p>
            This is the place where you can start quizzes, view the leaderboard,
            and edit your profile.
          </p>
          <p>We hope you enjoy learning languages with us!</p>
        </div>

        <div className="dashboard-links">
          <Link to="/quizzes" className="dashboard-link">
            Start a quiz
          </Link>
          <Link to="/leaderboard" className="dashboard-link">
            View the leaderboard
          </Link>
          <Link to="/profile" className="dashboard-link">
            Edit your profile
          </Link>
          <Link to="/" className="dashboard-link">
            Sign Out
          </Link>
        </div>
      </div>

      <div className="daily-question">
        <h2>Daily Question</h2>
        <p>What is the capital of France?</p>
        <div className="options">
          <button
            className={`option ${selectedOption === 1 && "selected"}`}
            onClick={() => handleOptionClick(1)}
          >
            Paris
          </button>
          <button
            className={`option ${selectedOption === 2 && "selected"}`}
            onClick={() => handleOptionClick(2)}
          >
            Rome
          </button>
          <button
            className={`option ${selectedOption === 3 && "selected"}`}
            onClick={() => handleOptionClick(3)}
          >
            Madrid
          </button>
        </div>
        {isAnswered && (
          <p className="answer-status">
            {selectedOption === 2 ? "Correct!" : "Sorry, that's incorrect."}
          </p>
        )}
      </div>

      <div className="user-profile-stats">
        <h2>User Profile Stats</h2>
        <p>Quizzes Taken: {quizzesTaken}</p>
        <p>Badges Earned: {badgesEarned}</p>
        <p>Achievements Unlocked: {achievementsUnlocked}</p>
      </div>
    </div>
  );
};

export default Dashboard;
