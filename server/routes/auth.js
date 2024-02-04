const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require("../database");

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return;
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
        return;
    };

    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
            return;
        };

        req.user = user;
        next();
    });
};

router.post("/register", async (req, res) => {
    const { newUserUsername, newUserPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newUserPassword, 10);

    db.query(
        `
        INSERT INTO user_credentials (username, user_password)
        VALUES (?, ?);
        `,
        [newUserUsername, hashedPassword],
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            } else {
                const token = jwt.sign({ username: newUserUsername }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_TIME_OUT });
                res.status(201).json({ success: true, token });
            }
        }
    );
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    const query = 'SELECT * FROM user_credentials WHERE username = ?';
    
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                
                const match = await bcrypt.compare(password, results[0].user_password);

                if (match) {
                    const token = jwt.sign({ username: results[0].username }, process.env.TOKEN_KEY, { expiresIn: process.env.TOKEN_TIME_OUT });
                    res.json({ success: true, token });
                } else {
                    res.json({ success: false });
                }
            } else {
                // User not found
                res.json({ success: false });
            }
        }
    });
});

router.post("/validate_token", verifyToken, (req, res) => {
    res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;