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
    const user_id = req.user.user_id;

    const affiliates_relations = await req.db.affiliates_relations.findMany({
      where: {
        OR: [{ affiliate_id_1: user_id }, { affiliate_id_2: user_id }],
      },
    });

    const entity_ids = [];

    for (const relation of affiliates_relations) {
      if (relation.affiliate_id_1 !== user_id) {
        entity_ids.push(relation.affiliate_id_1);
      } else if (relation.affiliate_id_2 !== user_id) {
        entity_ids.push(relation.affiliate_id_2);
      }
    }

    const individual_ids = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 1 },
      select: {
        entity_id: true,
      },
    });

    const individual_ids_list = individual_ids.map((entry) => entry.entity_id);

    const individuals = await req.db.individuals.findMany({
      where: { individual_id: { in: individual_ids_list } },
    });

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
        individual_id: individual_id,
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
