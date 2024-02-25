const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { socket } = require("./socket");
const individualsRouter = require("./routes/individuals");
const groupsRouter = require("./routes/groups");
const organizationsRouter = require("./routes/organizations");
const sheetsRouter = require("./routes/sheets");
const videosRouter = require("./routes/videos");
const imagesRouter = require("./routes/images");
const collectionsRouter = require("./routes/collections");
const entitiesRouter = require("./routes/entities");
const referencesRouter = require("./routes/references");
const authRouter = require("./routes/auth");
const affiliateRelations = require("./routes/affiliateRelations");
const prismaMiddleware = require("./prismaMiddleware");

app.use(cors());
app.use(express.json());
app.use(prismaMiddleware);

const server = http.createServer(app);
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

//const verifyToken = require("./routes/verifyJWT");
//app.get("/get_user_profile_picture", verifyToken, async (req, res) => {
//  try {
//    const entity = await req.db.entities.findUnique({
//      where: {
//        entity_id: req.user.user_id,
//      },
//    });
//
//    let profilePictureId;
//
//    if (entity.entity_type === 1) {
//      profilePictureId = await req.db.individuals.findUnique({
//        where: {
//          individual_id: req.user.user_id,
//        },
//      });
//    } else if (entity.entity_type === 2) {
//      profilePictureId = await req.db.groups.findUnique({
//        where: {
//          group_id: req.user.user_id,
//        },
//      });
//    } else if (entity.entity_type === 3) {
//      profilePictureId = await req.db.organizations.findUnique({
//        where: {
//          organization_id: req.user.user_id,
//        },
//      });
//    }
//
//    const profilePicture = await req.db.profile_pictures.findUnique({
//      where: {
//        profile_picture_id: profilePictureId.profile_picture_id,
//      },
//    });
//
//    if (!profilePicture) {
//      res.status(404).send(null);
//      return;
//    }
//
//    res.send(profilePicture);
//  } catch (error) {
//    console.error(error);
//    res.status(500).send("Internal Server Error");
//  }
//});

app.put("/sheets_updating", upload.single("file"), (req, res) => {
  const id = req.query.id;
  const filename = req.query.filename;
  const data = req.file.buffer;

  db.query(
    "UPDATE sheets SET sheet_filename = ?, sheet_data = ? WHERE sheet_id = ?;",
    [filename, data, id],
    (err, result) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/videos_updating", upload.single("file"), (req, res) => {
  const data = req.file.buffer;

  db.query(
    `
        INSERT INTO images_data (image_data)
        VALUES (?);
        `,
    [data],
    (err, result) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/images_updating", upload.single("file"), (req, res) => {
  const id = req.query.id;
  const filename = req.query.filename;
  const data = req.file.buffer;

  db.query(
    `
        UPDATE images
        SET image_filename = ?, image_data = ?
        WHERE image_id <= ?
        `,
    [filename, data, id],
    (err, result) => {
      if (err) {
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result);
      }
    }
  );
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`SERVER Server running on port ${process.env.SERVER_PORT}`);
});
