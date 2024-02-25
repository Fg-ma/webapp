const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyJWT");

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

// Route to get all the affiliated groups with a certian entity id
router.get("/get_affiliated_groups", verifyToken, async (req, res) => {
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

    const group_ids = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 2 },
      select: {
        entity_id: true,
      },
    });

    const group_ids_list = group_ids.map((entry) => entry.entity_id);

    const groups = await req.db.groups.findMany({
      where: { group_id: { in: group_ids_list } },
    });

    res.send(groups);
  } catch (error) {
    console.error("Error fetching individual data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get all the affiliated organizations with a certian entity id
router.get("/get_affiliated_organizations", verifyToken, async (req, res) => {
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

    const organization_ids = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 3 },
      select: {
        entity_id: true,
      },
    });

    const organization_ids_list = organization_ids.map(
      (entry) => entry.entity_id
    );

    const organizations = await req.db.organizations.findMany({
      where: { organization_id: { in: organization_ids_list } },
    });

    res.send(organizations);
  } catch (error) {
    console.error("Error fetching individual data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
