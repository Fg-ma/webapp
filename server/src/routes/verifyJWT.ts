import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return;
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return;
  }

  jwt.verify(token, process.env.TOKEN_KEY as Secret, (err, user) => {
    if (err || !user) {
      return;
    }

    req.user = user;
    next();
  });
};

export default verifyToken;
