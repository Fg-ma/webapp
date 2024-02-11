const { PrismaClient } = require("./prisma/generated");

const prisma = new PrismaClient();

const prismaMiddleware = (req, res, next) => {
  req.db = prisma;
  next();
};

module.exports = prismaMiddleware;
