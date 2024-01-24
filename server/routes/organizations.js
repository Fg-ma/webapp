const express = require("express");
const router = express.Router();
const { db } = require("../database");

// Route to get all organizations
router.get("/", (req, res) => {
    db.query("SELECT * FROM organizations;", (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

// Route to get an organization by ID
router.get("/:organization_id", (req, res) => {
    const organization_id = req.params.organization_id;

    db.query("SELECT * FROM organizations WHERE organization_id = ?;", [organization_id], (err, result) => {
        if (err) {
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        };
    });
});

module.exports = router;