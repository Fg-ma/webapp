import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import jwt, { Secret } from "jsonwebtoken";
import verifyToken from "./verifyJWT";
import { UserCredentials } from "@FgTypes/types";

// Gets if the user is the inputted target *NOTE USED ONLY FOR COMSEMITIC PURPOSES
router.get("/isUser", verifyToken, async (req, res) => {
  const { target } = req.query;

  try {
    const isUser = target === req.user.username;

    res.send(isUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/register", async (req, res) => {
  const { newUserUsername, newUserPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newUserPassword, 10);

    const user_id = uuid();

    const newUser: UserCredentials = await req.db.user_credentials.create({
      data: {
        user_id: user_id,
        username: newUserUsername,
        user_password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { user_id: user_id, username: newUser.username, entity_type: 1 },
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
    const user: UserCredentials = await req.db.user_credentials.findUnique({
      where: {
        username: username,
      },
    });

    if (user) {
      const match = await bcrypt.compare(password, user.user_password);

      if (match) {
        const token = jwt.sign(
          { user_id: user.user_id, username: user.username, entity_type: 1 },
          process.env.TOKEN_KEY as Secret,
          { expiresIn: process.env.TOKEN_TIME_OUT }
        );
        res.json({ success: true, token });
      } else {
        res.json({ success: false });
      }
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/validate_token", verifyToken, (req, res) => {
  res.json({ message: "Token is valid", username: req.user.username });
});

export default router;
