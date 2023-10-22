const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answers: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    difficulty: { type: Number, required: true },
    language: { type: String, required: true },
});
 
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});


const leaderboardSchema = new mongoose.Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true },
    language: { type: String, required: true },
});


const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
const Quiz = mongoose.model('Quiz', quizSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Quiz, User ,Leaderboard};
