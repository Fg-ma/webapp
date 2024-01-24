const express = require("express");
const router = express.Router();
const { db } = require("../database");

// Route to get all individuals
router.get("/", (req, res) => {
  db.query("SELECT * FROM individuals;", (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

// Route to get an individual by ID
router.get("/:individual_id", (req, res) => {
  const individual_id = req.params.individual_id;

  db.query("SELECT * FROM individuals WHERE individual_id = ?;", [individual_id], (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

module.exports = router;