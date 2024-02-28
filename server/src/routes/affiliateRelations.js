const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyJWT.js");

// Route to get all the affiliated entities with a certian entity id
router.get("/get_affiliated_entities", verifyToken, async (req, res) => {
  const entity_id = req.query.entity_id;

  try {
    let user_id;

    if (entity_id === "user") {
      user_id = req.user.user_id;
    } else {
      user_id = entity_id;
    }

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

    const individuals = [];

    for (const ind_id of individual_ids_list) {
      const individual = await req.db.individuals.findUnique({
        where: { individual_id: ind_id },
      });

      const individualAffiliation = await req.db.affiliates_relations.findMany({
        where: {
          OR: [
            { affiliate_id_1: ind_id, affiliate_id_2: user_id },
            { affiliate_id_1: user_id, affiliate_id_2: ind_id },
          ],
        },
        select: {
          affiliate_relation_date: true,
        },
      });

      individuals.push({
        ...individual,
        date: individualAffiliation,
      });
    }

    const group_ids = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 2 },
      select: {
        entity_id: true,
      },
    });

    const group_ids_list = group_ids.map((entry) => entry.entity_id);

    const groups = [];

    for (const grp_id of group_ids_list) {
      const group = await req.db.groups.findUnique({
        where: { group_id: grp_id },
      });

      const groupAffiliation = await req.db.affiliates_relations.findMany({
        where: {
          OR: [
            { affiliate_id_1: grp_id, affiliate_id_2: user_id },
            { affiliate_id_1: user_id, affiliate_id_2: grp_id },
          ],
        },
        select: {
          affiliate_relation_date: true,
        },
      });

      groups.push({
        ...group,
        date: groupAffiliation,
      });
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

    const organizations = [];

    for (const org_id of organization_ids_list) {
      const organization = await req.db.organizations.findUnique({
        where: { organization_id: org_id },
      });

      const organizationAffiliation =
        await req.db.affiliates_relations.findMany({
          where: {
            OR: [
              { affiliate_id_1: org_id, affiliate_id_2: user_id },
              { affiliate_id_1: user_id, affiliate_id_2: org_id },
            ],
          },
          select: {
            affiliate_relation_date: true,
          },
        });

      organizations.push({
        ...organization,
        date: organizationAffiliation,
      });
    }

    res.send({
      individuals: individuals,
      groups: groups,
      organizations: organizations,
    });
  } catch (error) {
    console.error("Error fetching individual data:", error);
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
