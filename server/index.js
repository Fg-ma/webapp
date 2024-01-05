require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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

app.get("/sheet/:sheet_id", (req, res) => {
    const sheet_id = req.params.sheet_id;
    db.query("SELECT * FROM sheets WHERE sheet_id = ?", sheet_id, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/individual/:individual_id", (req, res) => {
    const individual_id = req.params.individual_id;
    db.query("SELECT * FROM individuals WHERE individual_id = ?", individual_id, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/references/:individual_id", (req, res) => {
    const individual_id = req.params.individual_id;
    db.query("SELECT * FROM individuals_references WHERE individual_id = ?", individual_id, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/individuals_sheets/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM individuals_sheets WHERE individual_id = ?", id, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/individuals_videos/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM individuals_videos WHERE individual_id = ?", id, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/video/:video_id", (req, res) => {
    const video_id = req.params.video_id;
    db.query("SELECT * FROM videos WHERE video_id = ?", video_id, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/individuals_images/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM individuals_images WHERE individual_id = ?", id, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/image/:image_id", (req, res) => {
    const image_id = req.params.image_id;
    db.query("SELECT * FROM images WHERE image_id = ?", image_id, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/collections_names/:individual_id", (req, res) => {
    const individual_id = req.params.individual_id;
    db.query("SELECT DISTINCT collection_id, collection_name FROM collections WHERE individual_id = ?", individual_id, (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

app.get("/collections/:collection_id", (req, res) => {
    const collection_id = req.params.collection_id;
  
    db.query(
        `SELECT 
            collections.collection_id,
            collections.collection_name,
	        collections_images.date_added AS 'date_added',
            images.image_id,
            images.image_title,
            images.image_description,
            NULL AS video_id,
            NULL AS video_title,
            NULL AS video_creator_id,
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
            NULL AS image_id,
            NULL AS image_title,
            NULL AS image_description,
            videos.video_id,
            videos.video_title,
            videos.video_creator_id,
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
            NULL AS image_id,
            NULL AS image_title,
            NULL AS image_description,
            NULL AS video_id,
            NULL AS video_title,
            NULL AS video_creator_id,
            sheets.sheet_id,
            sheets.sheet_author_id,
            sheets.sheet_title,
            sheets.sheet_subject
        FROM collections
        LEFT JOIN collections_sheets ON collections.collection_id = collections_sheets.collection_id
        LEFT JOIN sheets ON collections_sheets.sheet_id = sheets.sheet_id
        WHERE collections.collection_id = ?`,
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

app.listen(5042, () => {
    console.log("Server running on port 5042");
});

//app.post("/create", (req, res) => {
//    const name = req.body.name;
//    const age = req.body.age;
//    const country = req.body.country;
//    const position = req.body.position;
//    const wage = req.body.wage;
//
//    db.query(
//        "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
//        [name, age, country, position, wage],
//        (err, result) => {
//            if (err) {
//                console.log(err);
//            } else {
//                res.send("Values Inserted");
//            }
//        }
//    );
//});

//app.put("/update", (req, res) => {
//    const id = req.body.id;
//    const wage = req.body.wage;
//    db.query(
//        "UPDATE employees SET wage = ? WHERE id = ?",
//        [wage, id],
//        (err, result) => {
//            if (err) {
//                console.log(err);
//            } else {
//                res.send(result);
//            }
//        }
//    );
//});

//app.delete("/delete/:id", (req, res) => {
//    const id = req.params.id;
//    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//        if (err) {
//            console.log(err);
//        } else {
//            res.send(result);
//        }
//    });
//});