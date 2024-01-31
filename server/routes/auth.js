const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
//const { User } = require('../models'); // Adjust the import based on your user model

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

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create and send a token for authenticated requests
    const token = generateAuthToken(user);
    res.json({ token });
});

function generateAuthToken(user) {
    // Implement your token generation logic here
    // Use a library like jsonwebtoken
};

module.exports = router;