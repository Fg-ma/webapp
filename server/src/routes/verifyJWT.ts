import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.TOKEN_KEY as Secret, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  });
};

export default verifyToken;
