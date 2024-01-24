const express = require("express");
const router = express.Router();
const { db } = require("../database");

// Get collection names and ids from entity id
router.get("/collections_names", (req, res) => {
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

// Get collection from collection_id
router.get("/:collection_id", (req, res) => {
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

// Set a collection's sheet as pinned or not pinned
router.put("/collections_sheets_pinned", (req, res) => {
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

// Set a collection's video as pinned or not pinned
router.put("/collections_videos_pinned", (req, res) => {
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

// Set a collection's image as pinned or not pinned
router.put("/collections_images_pinned", (req, res) => {
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

module.exports = router;