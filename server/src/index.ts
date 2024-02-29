import { resolve } from "path";
import dotenv from "dotenv";
dotenv.config({ path: resolve(__dirname, "../../.env") });
import express, { json } from "express";
const app = express();
import cors from "cors";
import { createServer } from "http";
import multer, { memoryStorage } from "multer";
const storage = memoryStorage();
const upload = multer({ storage: storage });
import socket from "./socket";
import individualsRouter from "./routes/individuals";
import groupsRouter from "./routes/groups";
import organizationsRouter from "./routes/organizations";
import sheetsRouter from "./routes/sheets";
import videosRouter from "./routes/videos";
import imagesRouter from "./routes/images";
import collectionsRouter from "./routes/collections";
import entitiesRouter from "./routes/entities";
import referencesRouter from "./routes/references";
import authRouter from "./routes/auth";
import affiliateRelations from "./routes/affiliateRelations";
import prismaMiddleware from "./prismaMiddleware";

app.use(cors());
app.use(json());
app.use(prismaMiddleware);

const server = createServer(app);
socket(server);

app.use("/individuals", individualsRouter);
app.use("/groups", groupsRouter);
app.use("/organizations", organizationsRouter);
app.use("/sheets", sheetsRouter);
app.use("/videos", videosRouter);
app.use("/images", imagesRouter);
app.use("/collections", collectionsRouter);
app.use("/entities", entitiesRouter);
app.use("/references", referencesRouter);
app.use("/auth", authRouter);
app.use("/affiliateRelations", affiliateRelations);

server.listen(process.env.SERVER_PORT, () => {
  console.log(`SERVER Server running on port ${process.env.SERVER_PORT}`);
});
