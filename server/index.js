const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const multer = require('multer');
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
const { db } = require("./database");
const os = require('os');

app.use(cors());
app.use(express.json());

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database');
    }
});

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

app.put("/sheets_updating", upload.single('file'), (req, res) => {
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

app.put("/videos_updating", upload.single('file'), (req, res) => {
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

app.put("/images_updating", upload.single('file'), (req, res) => {
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

app.use('/', async (req, res) => {
    console.log(`I am sending a response ${os.hostname()}`)
    res.json({ message: 'Ok it wokrs...', hostname: os.hostname() })
});

server.listen(process.env.SERVER_PORT, () => {
    console.log(`SERVER Server running on port ${process.env.SERVER_PORT}`);
});