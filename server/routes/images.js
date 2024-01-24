const express = require("express");
const router = express.Router();
const { db } = require("../database");

// Route to get an image by ID
router.get("/:image_id", (req, res) => {
    const image_id = req.params.image_id;

    db.query("SELECT * FROM images WHERE image_id = ?;", [image_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

// Gets all the data needed to display an image's contents
router.get("/get_full_image/:image_id", (req, res) => {
    const image_id = req.params.image_id;

    db.query(
        `SELECT *
        FROM images
        JOIN individuals ON images.image_creator_id = individuals.individual_id
        JOIN images_data ON images.image_data_id = images_data.image_data_id
        WHERE images.image_id = ?;`, 
        [image_id], 
        (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

module.exports = router;