import express from "express";
const router = express.Router();
import { v4 as uuid } from "uuid";
import verifyToken from "./verifyJWT";
import type { Entity, Group, Organization, Relation } from "@FgTypes/types";

// Set a new affiliate relation
router.post("/set_affiliate_relation", verifyToken, async (req, res) => {
  const entity_id = req.query.entity_id;

  try {
    if (entity_id !== req.user.user_id) {
      const currentDate = new Date().toISOString();

      const newAffiliateRelation = await req.db.affiliates_relations.create({
        data: {
          affiliate_relation_id: uuid(),
          affiliate_id_root: req.user.user_id,
          affiliate_id_target: entity_id,
          affiliate_relation_date: currentDate,
        },
      });

      const entity = await req.db.entities.findUnique({
        where: {
          entity_id: entity_id,
        },
      });

      res.send({
        newAffiliateRelation: {
          ...newAffiliateRelation,
          entity_type: entity.entity_type,
          action: "newRelation",
        },
        isAffiliated: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete an existing affiliate relation
router.delete("/delete_affiliate_relation", verifyToken, async (req, res) => {
  const entity_id = req.query.entity_id;

  try {
    const existingRelation = await req.db.affiliates_relations.findUnique({
      where: {
        affiliate_id_root_affiliate_id_target: {
          affiliate_id_root: req.user.user_id,
          affiliate_id_target: entity_id,
        },
      },
    });

    if (!existingRelation) {
      return res.status(404).send("Relation not found");
    }

    await req.db.affiliates_relations.delete({
      where: {
        affiliate_relation_id: existingRelation.affiliate_relation_id,
      },
    });

    const entity = await req.db.entities.findUnique({
      where: {
        entity_id: entity_id,
      },
    });

    res.send({
      deletedAffiliateRelation: {
        ...existingRelation,
        entity_type: entity.entity_type,
        action: "deletedRelation",
      },
      isAffiliated: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get an entity's affiliation status with the current user
router.get("/search_affiliate_relation", verifyToken, async (req, res) => {
  const entity_id = req.query.entity_id;

  try {
    if (entity_id !== "user") {
      const relation = await req.db.affiliates_relations.findUnique({
        where: {
          affiliate_id_root_affiliate_id_target: {
            affiliate_id_root: req.user.user_id,
            affiliate_id_target: entity_id,
          },
        },
      });

      if (relation) {
        res.send(true);
      } else {
        res.send(false);
      }
    } else {
      res.send(false);
    }
  } catch (error) {
    console.error("Error fetching individual data:", error);
    res.status(500).send("Internal Server Error");
  }
});

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
        affiliate_id_root: user_id,
      },
    });

    const entity_ids = [];

    for (const relation of affiliates_relations) {
      entity_ids.push(relation.affiliate_id_target);
    }

    const individualIds = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 1 },
      select: {
        entity_id: true,
      },
    });

    const individualIdsList = individualIds.map(
      (entry: Entity) => entry.entity_id
    );

    const individuals = [];

    for (const ind_id of individualIdsList) {
      const individual = await req.db.individuals.findUnique({
        where: { individual_id: ind_id },
      });

      const individualAffiliation = await req.db.affiliates_relations.findMany({
        where: {
          affiliate_id_root: user_id,
          affiliate_id_target: ind_id,
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

    const groupIdsList = groupIds.map((entry: Entity) => entry.entity_id);

    const groups = [];

    for (const grp_id of groupIdsList) {
      const group = await req.db.groups.findUnique({
        where: { group_id: grp_id },
      });

      const groupAffiliation = await req.db.affiliates_relations.findMany({
        where: {
          affiliate_id_root: user_id,
          affiliate_id_target: grp_id,
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
      (entry: Entity) => entry.entity_id
    );

    const organizations = [];

    for (const org_id of organizationIdsList) {
      const organization = await req.db.organizations.findUnique({
        where: { organization_id: org_id },
      });

      const organizationAffiliation =
        await req.db.affiliates_relations.findMany({
          where: {
            affiliate_id_root: user_id,
            affiliate_id_target: org_id,
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
        affiliate_id_root: user_id,
      },
    });

    const entity_ids = [];

    for (const relation of affiliates_relations) {
      entity_ids.push(relation.affiliate_id_target);
    }

    const individualIds = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 1 },
      select: {
        entity_id: true,
      },
    });

    const individualIdsList = individualIds.map(
      (entry: Entity) => entry.entity_id
    );

    const individuals = await req.db.individuals.findMany({
      where: { individual_id: { in: individualIdsList } },
    });

    const individualsWithAffiliateDate = individuals.map((individual: any) => {
      const relation = affiliates_relations.find(
        (rel: Relation) => rel.affiliate_id_target === individual.individual_id
      );

      if (relation) {
        return {
          ...individual,
          affiliate_relation_date: relation.affiliate_relation_date,
        };
      }

      return individual;
    });

    res.send(individualsWithAffiliateDate);
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
      where: { affiliate_id_root: user_id },
    });

    const entity_ids = [];

    for (const relation of affiliates_relations) {
      entity_ids.push(relation.affiliate_id_target);
    }

    const groupIds = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 2 },
      select: {
        entity_id: true,
      },
    });

    const groupIdsList = groupIds.map((entry: Entity) => entry.entity_id);

    const groups = await req.db.groups.findMany({
      where: { group_id: { in: groupIdsList } },
    });

    const groupsWithAffiliateDate = groups.map((group: Group) => {
      const relation = affiliates_relations.find(
        (rel: Relation) => rel.affiliate_id_target === group.group_id
      );

      if (relation) {
        return {
          ...group,
          affiliate_relation_date: relation.affiliate_relation_date,
        };
      }

      return group;
    });

    res.send(groupsWithAffiliateDate);
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
      where: { affiliate_id_root: user_id },
    });

    const entity_ids = [];

    for (const relation of affiliates_relations) {
      entity_ids.push(relation.affiliate_id_target);
    }

    const organizationIds = await req.db.entities.findMany({
      where: { entity_id: { in: entity_ids }, entity_type: 3 },
      select: {
        entity_id: true,
      },
    });

    const organizationIdsList = organizationIds.map(
      (entry: Entity) => entry.entity_id
    );

    const organizations = await req.db.organizations.findMany({
      where: { organization_id: { in: organizationIdsList } },
    });

    const organizationsWithAffiliateDate = organizations.map(
      (organization: Organization) => {
        const relation = affiliates_relations.find(
          (rel: Relation) =>
            rel.affiliate_id_target === organization.organization_id
        );

        if (relation) {
          return {
            ...organization,
            affiliate_relation_date: relation.affiliate_relation_date,
          };
        }

        return organization;
      }
    );

    res.send(organizationsWithAffiliateDate);
  } catch (error) {
    console.error("Error fetching individual data:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
