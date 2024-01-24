const express = require("express");
const router = express.Router();
const { db } = require("../database");

router.get("/", (req, res) => {
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

module.exports = router;