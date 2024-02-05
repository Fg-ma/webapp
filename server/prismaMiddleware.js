const { PrismaClient } = require("./prisma/generated/client");

const prisma = new PrismaClient();

const prismaMiddleware = (req, res, next) => {
  req.db = prisma;
  next();
};

module.exports = prismaMiddleware;
