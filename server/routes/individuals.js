const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyJWT");

// Route to get all individuals
router.get("/", async (req, res) => {
  try {
    const individuals = await req.db.individuals.findMany();
    res.send(individuals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get an individual by ID
router.get("/:individual_id", verifyToken, async (req, res) => {
  const individual_id = req.params.individual_id;

  try {
    const individual = await req.db.individuals.findUnique({
      where: {
        individual_id:
          individual_id === "user" ? req.user.user_id : individual_id,
      },
    });

    if (!individual) {
      res.status(404).send("Individual not found");
      return;
    }

    res.send(individual);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
