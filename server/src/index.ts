import { resolve } from "path";
require("dotenv").config({ path: resolve(__dirname, "../.env") });
import express, { json } from "express";
const app = express();
import cors from "cors";
import { createServer } from "http";
import multer, { memoryStorage } from "multer";
const storage = memoryStorage();
const upload = multer({ storage: storage });
import { socket } from "./socket.js";
import individualsRouter from "./routes/individuals.js";
import groupsRouter from "./routes/groups.js";
import organizationsRouter from "./routes/organizations.js";
import sheetsRouter from "./routes/sheets.js";
import videosRouter from "./routes/videos.js";
import imagesRouter from "./routes/images.js";
import collectionsRouter from "./routes/collections.js";
import entitiesRouter from "./routes/entities.js";
import referencesRouter from "./routes/references.js";
import authRouter from "./routes/auth.js";
import affiliateRelations from "./routes/affiliateRelations.js";
import prismaMiddleware from "./prismaMiddleware.ts";

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

//app.put("/sheets_updating", upload.single("file"), (req, res) => {
//  const id = req.query.id;
//  const filename = req.query.filename;
//  const data = req.file.buffer;
//
//  db.query(
//    "UPDATE sheets SET sheet_filename = ?, sheet_data = ? WHERE sheet_id = ?;",
//    [filename, data, id],
//    (err, result) => {
//      if (err) {
//        res.status(500).send("Internal Server Error");
//      } else {
//        res.send(result);
//      }
//    }
//  );
//});
//
//app.put("/videos_updating", upload.single("file"), (req, res) => {
//  const data = req.file.buffer;
//
//  db.query(
//    `
//        INSERT INTO images_data (image_data)
//        VALUES (?);
//        `,
//    [data],
//    (err, result) => {
//      if (err) {
//        res.status(500).send("Internal Server Error");
//      } else {
//        res.send(result);
//      }
//    }
//  );
//});
//
//app.put("/images_updating", upload.single("file"), (req, res) => {
//  const id = req.query.id;
//  const filename = req.query.filename;
//  const data = req.file.buffer;
//
//  db.query(
//    `
//        UPDATE images
//        SET image_filename = ?, image_data = ?
//        WHERE image_id <= ?
//        `,
//    [filename, data, id],
//    (err, result) => {
//      if (err) {
//        res.status(500).send("Internal Server Error");
//      } else {
//        res.send(result);
//      }
//    }
//  );
//});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`SERVER Server running on port ${process.env.SERVER_PORT}`);
});
