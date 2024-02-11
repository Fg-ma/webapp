const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return;
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return;
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      return;
    }

    req.user = user;
    next();
  });
};

router.post("/register", async (req, res) => {
  const { newUserUsername, newUserPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newUserPassword, 10);

    const newUser = await req.db.user_credentials.create({
      data: {
        username: newUserUsername,
        user_password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { username: newUser.username },
      process.env.TOKEN_KEY,
      { expiresIn: process.env.TOKEN_TIME_OUT }
    );
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await req.db.user_credentials.findUnique({
      where: {
        username: username,
      },
    });

    if (user) {
      const match = await bcrypt.compare(password, user.user_password);

      if (match) {
        const token = jwt.sign(
          { username: user.username },
          process.env.TOKEN_KEY,
          { expiresIn: process.env.TOKEN_TIME_OUT }
        );
        res.json({ success: true, token });
      } else {
        res.json({ success: false });
      }
    } else {
      // User not found
      res.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/validate_token", verifyToken, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;
