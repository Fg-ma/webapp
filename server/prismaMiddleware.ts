import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "./prisma/generated";

const prismaMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const prisma = new PrismaClient();
  (req as any).db = prisma;
  next();
};

export default prismaMiddleware;
