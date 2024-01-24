const express = require("express");
const router = express.Router();
const { db } = require("../database");

// Route to get all groups
router.get("/", (req, res) => {
    db.query("SELECT * FROM `groups`;", (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

// Route to get an groups by ID
router.get("/:group_id", (req, res) => {
    const group_id = req.params.group_id;

    db.query("SELECT * FROM `groups` WHERE group_id = ?;", [group_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

module.exports = router;