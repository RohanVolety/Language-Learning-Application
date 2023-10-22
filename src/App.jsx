import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/frontend/Homepage";
import Dashboard from "./components/frontend/Dashboard";
import Quiz from "./components/frontend/Quiz";
import Leaderboard from "./components/frontend/Leaderboard";
import Profile from "./components/frontend/profile";
import "./App.css";
const App = () => {
  return (
    <BrowserRouter>
           <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quizzes" element={<Quiz/>}/>
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile/>}/>
      
      </Routes>
    </BrowserRouter>
 

   
  );
};

export default App;
