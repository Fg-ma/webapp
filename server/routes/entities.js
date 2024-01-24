const express = require("express");
const router = express.Router();
const { db } = require("../database");

// Get entity data from entity type and entity id
router.get("/entity", (req, res) => {
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

// Get all the sheets belonging to an entity
router.get("/entity_sheets/:entity_id", (req, res) => {
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

// Get all the videos belonging to an entity
router.get("/entity_videos/:entity_id", (req, res) => {
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

// Get all the images belonging to an entity
router.get("/entity_images/:entity_id", (req, res) => {
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

// Set a entity's sheet as pinned or not pinned
router.put("/entity_sheets_pinned", (req, res) => {
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

// Set a entity's video as pinned or not pinned
router.put("/entity_videos_pinned", (req, res) => {
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

// Set a entity's image as pinned or not pinned
router.put("/entity_images_pinned", (req, res) => {
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

module.exports = router;