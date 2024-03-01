import express from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";
import type { ids } from "@FgTypes/types";

// Route to get all the affiliated entities with a certian entity id
router.get("/get_affiliated_entities", verifyToken, async (req, res) => {
  const entity_id = req.query.entity_id;

  try {
    let user_id;

    if (entity_id === "user") {
      user_id = req.user?.user_id;
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

    const individualIds = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 1 },
      select: {
        entity_id: true,
      },
    });

    const individualIdsList = individualIds.map(
      (entry: ids) => entry.entity_id
    );

    const individuals = [];

    for (const ind_id of individualIdsList) {
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

    const groupIds = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 2 },
      select: {
        entity_id: true,
      },
    });

    const groupIdsList = groupIds.map((entry: ids) => entry.entity_id);

    const groups = [];

    for (const grp_id of groupIdsList) {
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

    const organizationIds = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 3 },
      select: {
        entity_id: true,
      },
    });

    const organizationIdsList = organizationIds.map(
      (entry: ids) => entry.entity_id
    );

    const organizations = [];

    for (const org_id of organizationIdsList) {
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
    const user_id = req.user?.user_id;

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

    const individualIds = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 1 },
      select: {
        entity_id: true,
      },
    });

    const individualIdsList = individualIds.map(
      (entry: ids) => entry.entity_id
    );

    const individuals = await req.db.individuals.findMany({
      where: { individual_id: { in: individualIdsList } },
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
    const user_id = req.user?.user_id;

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

    const groupIds = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 2 },
      select: {
        entity_id: true,
      },
    });

    const groupIdsList = groupIds.map((entry: ids) => entry.entity_id);

    const groups = await req.db.groups.findMany({
      where: { group_id: { in: groupIdsList } },
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
    const user_id = req.user?.user_id;

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

    const organizationIds = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 3 },
      select: {
        entity_id: true,
      },
    });

    const organizationIdsList = organizationIds.map(
      (entry: ids) => entry.entity_id
    );

    const organizations = await req.db.organizations.findMany({
      where: { organization_id: { in: organizationIdsList } },
    });

    res.send(organizations);
  } catch (error) {
    console.error("Error fetching individual data:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;