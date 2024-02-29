import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import verifyToken from "./verifyJWT";

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
      process.env.TOKEN_KEY as Secret,
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
          { user_id: user.user_id, username: user.username },
          process.env.TOKEN_KEY as Secret,
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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/validate_token", verifyToken, (req, res) => {
  res.json({ message: "Token is valid" });
});

export default router;
