const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/my-language-learning-game');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


 const { User } = require('../Models/User')
const { Leaderboard } = require('../Models/User')
const JWT_SECRET = "1y2z3z";



const authenticateJWT = require('../backend/middleware/VerifyToken');
app.use(express.json());


app.get('/api/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;    
    const hashedPassword = await bcrypt.hash(password, 5);    
    const user = new User({
        username,
        password: hashedPassword,
    });    
    await user.save();    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '1d',
    });    
    res.json({ token });
});

// Login API
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;    
    const user = await User.findOne({ username });    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }    
    const isPasswordValid = await bcrypt.compare(password, user.password);    
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' });
    }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: '1d',
    });    
    res.json({ token });
});




// Post leaderboard data
app.post('/api/leaderboard',authenticateJWT, async (req, res) => {
    try {
        const { username, score, language } = req.body;
        const leaderboardEntry = { username, score, language };
        const leaderboard = new Leaderboard(leaderboardEntry);
        await leaderboard.save();
        res.json({ success: true });
    } catch (error) {
        console.error("Error storing leaderboard data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Retrieve leaderboard data
app.get('/api/leaderboard', authenticateJWT,async (req, res) => {
    try {
        const leaderboardData = await Leaderboard.find({}, 'username score language -_id').sort({ score: -1 });
        res.json(leaderboardData);
    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
