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

// Route to get all the affiliated individuals with a certian entity id
router.get("/get_affiliated_individuals", verifyToken, async (req, res) => {
  try {
    // Access the user ID from the decoded token payload
    const user_id = req.user.user_id;

    // Use the user ID to fetch data specific to the authenticated user
    const affiliates_relations = await req.db.affiliates_relations.findMany({
      where: {
        OR: [
          { affiliate_id_1: user_id, affiliate_type_2: 0 },
          { affiliate_type_1: 0, affiliate_id_2: user_id },
        ],
      },
    });

    const individual_ids = [];

    for (const relation of affiliates_relations) {
      if (relation.affiliate_id_1 !== user_id) {
        individual_ids.push(relation.affiliate_id_1);
      } else if (relation.affiliate_id_2 !== user_id) {
        individual_ids.push(relation.affiliate_id_2);
      }
    }

    const individuals = await req.db.individuals.findMany({
      where: { individual_id: { in: individual_ids } },
    });

    // Send the response with the fetched data
    res.send(individuals);
  } catch (error) {
    console.error("Error fetching individual data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get an individual by ID
router.get("/:individual_id", async (req, res) => {
  const individual_id = req.params.individual_id;

  try {
    const individual = await req.db.individuals.findUnique({
      where: {
        individual_id: parseInt(individual_id),
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
