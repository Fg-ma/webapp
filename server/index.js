require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("togglePinned", (relation, relation_id, pinned, date_pinned) => {
        io.emit("pinnedUpdated", { relation, relation_id, pinned, date_pinned });
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});
  
server.listen(5041, () => {
    console.log("Server running on port 5041");
});

app.get("/individuals", (req, res) => {
    db.query("SELECT * FROM individuals;", (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/groups", (req, res) => {
    db.query("SELECT * FROM `groups`;", (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/organizations", (req, res) => {
    db.query("SELECT * FROM organizations;", (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/sheets", (req, res) => {
    db.query("SELECT * FROM sheets;", (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/individual/:individual_id", (req, res) => {
    const individual_id = req.params.individual_id;

    db.query("SELECT * FROM individuals WHERE individual_id = ?;", [individual_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/group/:group_id", (req, res) => {
    const group_id = req.params.group_id;

    db.query("SELECT * FROM `groups` WHERE group_id = ?;", [group_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/organization/:organization_id", (req, res) => {
    const organization_id = req.params.organization_id;

    db.query("SELECT * FROM organizations WHERE organization_id = ?;", [organization_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/references", (req, res) => {
    const entity_id = req.query.entity_id;
    const type = req.query.type;

    let query;
    if (type === "individuals") {
        query = "SELECT * FROM entities_references WHERE individual_id = ?;";
    } else if (type === "groups") {
        query = "SELECT * FROM entities_references WHERE group_id = ?;";
    } else if (type === "organizations") {
        query = "SELECT * FROM entities_references WHERE organization_id = ?;";
    };

    db.query(query, [entity_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/sheet/:sheet_id", (req, res) => {
    const sheet_id = req.params.sheet_id;

    db.query("SELECT * FROM sheets WHERE sheet_id = ?;", [sheet_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/video/:video_id", (req, res) => {
    const video_id = req.params.video_id;

    db.query("SELECT * FROM videos WHERE video_id = ?;", [video_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/image/:image_id", (req, res) => {
    const image_id = req.params.image_id;

    db.query("SELECT * FROM images WHERE image_id = ?;", [image_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/collections_names", (req, res) => {
    const id = req.query.id;
    const type = req.query.type;

    let query;
    if (type === "individuals") {
        query = "SELECT DISTINCT collection_id, collection_name FROM collections WHERE individual_id = ?;";
    } else if (type === "groups") {
        query = "SELECT DISTINCT collection_id, collection_name FROM collections WHERE group_id = ?;";
    } else if (type === "organizations") {
        query = "SELECT DISTINCT collection_id, collection_name FROM collections WHERE organization_id = ?;";
    };

    if (id && type && query) {
        db.query(query, [id], (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            } else {
                res.send(result);
            };
        });
    };
});

app.get("/collections/:collection_id", (req, res) => {
    const collection_id = req.params.collection_id;
  
    db.query(
        `SELECT 
            collections.collection_id,
            collections.collection_name,
	        collections_images.date_added AS 'date_added',
            collections_images.pinned AS 'pinned',
            collections_images.date_pinned AS 'date_pinned',
            collections_images.collections_images_id,
            images.image_id,
            images.image_title,
            images.image_description,
            NULL AS collections_videos_id,
            NULL AS video_id,
            NULL AS video_title,
            NULL AS video_creator_id,
            NULL AS collections_sheets_id,
            NULL AS sheet_id,
            NULL AS sheet_author_id,
            NULL AS sheet_title,
            NULL AS sheet_subject
        FROM collections
        LEFT JOIN collections_images ON collections.collection_id = collections_images.collection_id
        LEFT JOIN images ON collections_images.image_id = images.image_id
        WHERE collections.collection_id = ?
        
        UNION
        
        SELECT 
            collections.collection_id,
            collections.collection_name,
	        collections_videos.date_added AS 'date_added',
            collections_videos.pinned AS 'pinned',
            collections_videos.date_pinned AS 'date_pinned',
            NULL AS collections_images_id,
            NULL AS image_id,
            NULL AS image_title,
            NULL AS image_description,
            collections_videos.collections_videos_id,
            videos.video_id,
            videos.video_title,
            videos.video_creator_id,
            NULL AS collections_sheets_id,
            NULL AS sheet_id,
            NULL AS sheet_author_id,
            NULL AS sheet_title,
            NULL AS sheet_subject
        FROM collections
        LEFT JOIN collections_videos ON collections.collection_id = collections_videos.collection_id
        LEFT JOIN videos ON collections_videos.video_id = videos.video_id
        WHERE collections.collection_id = ?
        
        UNION
        
        SELECT 
            collections.collection_id,
            collections.collection_name,
	        collections_sheets.date_added AS 'date_added',
            collections_sheets.pinned AS 'pinned',
            collections_sheets.date_pinned AS 'date_pinned',
            NULL AS collections_images_id,
            NULL AS image_id,
            NULL AS image_title,
            NULL AS image_description,
            NULL AS collections_videos_id,
            NULL AS video_id,
            NULL AS video_title,
            NULL AS video_creator_id,
            collections_sheets.collections_sheets_id,
            sheets.sheet_id,
            sheets.sheet_author_id,
            sheets.sheet_title,
            sheets.sheet_subject
        FROM collections
        LEFT JOIN collections_sheets ON collections.collection_id = collections_sheets.collection_id
        LEFT JOIN sheets ON collections_sheets.sheet_id = sheets.sheet_id
        WHERE collections.collection_id = ?;`,
        [collection_id, collection_id, collection_id],
        (err, result) => {
            if (err) {
              res.status(500).send("Internal Server Error");
            } else {
              res.send(result);
            };
        }
    );
});

app.put("/collections_sheets_pinned", (req, res) => {
    const relation_id = req.body.relation_id;
    const pinned = req.body.pinned;
    const date_pinned = req.body.date_pinned;

    db.query(
        "UPDATE collections_sheets SET pinned = ?, date_pinned = ? WHERE collections_sheets_id = ?;",
        [pinned, date_pinned, relation_id],
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/collections_videos_pinned", (req, res) => {
    const relation_id = req.body.relation_id;
    const pinned = req.body.pinned;
    const date_pinned = req.body.date_pinned;

    db.query(
        "UPDATE collections_videos SET pinned = ?, date_pinned = ? WHERE collections_videos_id = ?;",
        [pinned, date_pinned, relation_id],
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/collections_images_pinned", (req, res) => {
    const relation_id = req.body.relation_id;
    const pinned = req.body.pinned;
    const date_pinned = req.body.date_pinned;

    db.query(
        "UPDATE collections_images SET pinned = ?, date_pinned = ? WHERE collections_images_id = ?;",
        [pinned, date_pinned, relation_id],
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/entity", (req, res) => {
    const id = req.query.id;
    const type = req.query.type;

    let query;
    if (type === "individuals") {
        query = "SELECT entities.entity_id FROM entities WHERE entities.individual_id = ?;";
    } else if (type === "groups") {
        query = "SELECT entities.entity_id FROM entities WHERE entities.group_id = ?;";
    } else if (type === "organizations") {
        query = "SELECT entities.entity_id FROM entities WHERE entities.organization_id = ?;";
    };

    db.query(query, [id], (err, result) => {
        if (err) {
          res.status(500).send("Internal Server Error");
        } else {
          res.send(result);
        };
    });
});

app.get("/entities_sheets/:entity_id", (req, res) => {
    const entity_id = req.params.entity_id;
  
    db.query(
        `SELECT 
            entities.entity_id,
	        entities_sheets.date_added AS 'date_added',
            CAST(entities_sheets.pinned AS SIGNED) AS 'pinned',
            entities_sheets.date_pinned AS 'date_pinned',
            entities_sheets.entities_sheets_id,
            sheets.sheet_id,
            sheets.sheet_author_id,
            sheets.sheet_title,
            sheets.sheet_subject
        FROM entities
        LEFT JOIN entities_sheets ON entities.entity_id = entities_sheets.entity_id
        LEFT JOIN sheets ON entities_sheets.sheet_id = sheets.sheet_id
        WHERE entities.entity_id = ?;`,
        [entity_id],
        (err, result) => {
            if (err) {
              res.status(500).send("Internal Server Error");
            } else {
              res.send(result);
            };
        }
    );
});

app.get("/entities_videos/:entity_id", (req, res) => {
    const entity_id = req.params.entity_id;
  
    db.query(
        `SELECT 
            entities.entity_id,
	        entities_videos.date_added AS 'date_added',
            CAST(entities_videos.pinned AS SIGNED) AS 'pinned',
            entities_videos.date_pinned AS 'date_pinned',
            entities_videos.entities_videos_id,
            videos.video_id,
            videos.video_title,
            videos.video_creator_id
        FROM entities
        LEFT JOIN entities_videos ON entities.entity_id = entities_videos.entity_id
        LEFT JOIN videos ON entities_videos.video_id = videos.video_id
        WHERE entities.entity_id = ?;`,
        [entity_id],
        (err, result) => {
            if (err) {
              res.status(500).send("Internal Server Error");
            } else {
              res.send(result);
            };
        }
    );
});

app.get("/entities_images/:entity_id", (req, res) => {
    const entity_id = req.params.entity_id;
  
    db.query(
        `SELECT 
            entities.entity_id,
	        entities_images.date_added AS 'date_added',
            CAST(entities_images.pinned AS SIGNED) AS 'pinned',
            entities_images.date_pinned AS 'date_pinned',
            entities_images.entities_images_id,
            images.image_id,
            images.image_title,
            images.image_description
        FROM entities
        LEFT JOIN entities_images ON entities.entity_id = entities_images.entity_id
        LEFT JOIN images ON entities_images.image_id = images.image_id
        WHERE entities.entity_id = ?;`,
        [entity_id],
        (err, result) => {
            if (err) {
              res.status(500).send("Internal Server Error");
            } else {
              res.send(result);
            };
        }
    );
});

app.put("/entities_sheets_pinned", (req, res) => {
    const relation_id = req.body.relation_id;
    const pinned = req.body.pinned;
    const date_pinned = req.body.date_pinned;

    db.query(
        "UPDATE entities_sheets SET pinned = ?, date_pinned = ? WHERE entities_sheets_id = ?;",
        [pinned, date_pinned, relation_id],
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/entities_videos_pinned", (req, res) => {
    const relation_id = req.body.relation_id;
    const pinned = req.body.pinned;
    const date_pinned = req.body.date_pinned;

    db.query(
        "UPDATE entities_videos SET pinned = ?, date_pinned = ? WHERE entities_videos_id = ?;",
        [pinned, date_pinned, relation_id],
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/entities_images_pinned", (req, res) => {
    const relation_id = req.body.relation_id;
    const pinned = req.body.pinned;
    const date_pinned = req.body.date_pinned;

    db.query(
        "UPDATE entities_images SET pinned = ?, date_pinned = ? WHERE entities_images_id = ?;",
        [pinned, date_pinned, relation_id],
        (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            } else {
                res.send(result);
            }
        }
    );
});

app.listen(5042, () => {
    console.log("Server running on port 5042");
});