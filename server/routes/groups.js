const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyJWT");

// Route to get all groups
router.get("/", async (req, res) => {
  try {
    const groups = await req.db.groups.findMany();
    res.send(groups);
  } catch (error) {
    console.error(error);
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

// Route to get a group by ID
router.get("/:group_id", async (req, res) => {
  const group_id = req.params.group_id;

  try {
    const group = await req.db.groups.findUnique({
      where: {
        group_id: group_id,
      },
    });

    if (!group) {
      res.status(404).send("Group not found");
      return;
    }

    res.send(group);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
