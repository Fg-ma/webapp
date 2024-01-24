const express = require("express");
const router = express.Router();
const { db } = require("../database");

// Route to get all sheets
router.get("/", (req, res) => {
    db.query("SELECT * FROM sheets;", (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

// Route to get an sheet by ID
router.get("/:sheet_id", (req, res) => {
    const sheet_id = req.params.sheet_id;

    db.query("SELECT * FROM sheets WHERE sheet_id = ?;", [sheet_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

// Gets all the data needed to display a sheet's contents
router.get("/get_full_sheet/:sheet_id", (req, res) => {
    const sheet_id = req.params.sheet_id;

    db.query(
        `SELECT *
        FROM sheets
        JOIN individuals ON sheets.sheet_author_id = individuals.individual_id
        WHERE sheets.sheet_id = ?;`, 
        [sheet_id], 
        (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

module.exports = router;