const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require("../database");

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(403).json({ message: "Access denied - No Authorization header" });
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    });
};

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    // Query the database for the user
    const query = 'SELECT * FROM user_credentials WHERE username = ? AND user_password = ?';
    
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                // Authentication successful, generate token
                const token = jwt.sign({ username: results[0].username }, process.env.TOKEN_KEY, { expiresIn: '1h' });

                res.json({ success: true, token });
            } else {
                // Authentication failed
                res.json({ success: false });
            }
        }
    });
});

router.post("/validate_token", verifyToken, (req, res) => {
    res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;