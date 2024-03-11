import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "../prisma/generated";

export const prisma = new PrismaClient();

const prismaMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.db = prisma;
  next();
};

export default prismaMiddleware;
