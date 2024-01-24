const express = require("express");
const router = express.Router();
const { db } = require("../database");

// Route to get an video by ID
router.get("/:video_id", (req, res) => {
    const video_id = req.params.video_id;

    db.query("SELECT * FROM videos WHERE video_id = ?;", [video_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});


// Gets all the data needed to display a video's contents
router.get("/get_full_video/:video_id", (req, res) => {
    const video_id = req.params.video_id;

    db.query(
        `SELECT 
            video_data,
            video_title,
            video_description,
            video_filename,
            individual_name
        FROM videos
        JOIN individuals ON videos.video_creator_id = individuals.individual_id
        JOIN videos_data ON videos.video_data_id = videos_data.video_data_id
        WHERE videos.video_id = ?;`, 
        [video_id], 
        (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

module.exports = router;