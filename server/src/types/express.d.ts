import { PrismaClient } from "@prisma/client";

interface User {
  user_id: string;
  username: string;
  iat: number;
  exp: number;
}

declare module "express-serve-static-core" {
  interface Request {
    db: PrismaClient;
    user?: User | JwtPayload;
  }
}
