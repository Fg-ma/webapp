import express from "express";
const router = express.Router();
import { v4 as uuid } from "uuid";
import verifyToken from "./verifyJWT";
import type {
  Entity,
  Group,
  Individual,
  Organization,
  Relation,
} from "@FgTypes/types";

// Set a new affiliate relation
router.post("/set_affiliate_relation", verifyToken, async (req, res) => {
  const entity_username = req.query.entity_username;

  try {
    const entity: Entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    if (entity.entity_id !== req.user.user_id) {
      const currentDate = new Date().toISOString();

      const newAffiliateRelation: Relation =
        await req.db.affiliates_relations.create({
          data: {
            affiliate_relation_id: uuid(),
            affiliate_id_root: req.user.user_id,
            affiliate_id_target: entity.entity_id,
            affiliate_relation_date: currentDate,
          },
        });

      res.send({
        newAffiliateRelation: {
          affiliate_relation_id: newAffiliateRelation.affiliate_relation_id,
          affiliate_username_root: req.user.username,
          affiliate_username_target: entity_username,
          affiliate_relation_date: newAffiliateRelation.affiliate_relation_date,
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
  const entity_username = req.query.entity_username;

  try {
    const entity: Entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const existingRelation: Relation =
      await req.db.affiliates_relations.findUnique({
        where: {
          affiliate_id_root_affiliate_id_target: {
            affiliate_id_root: req.user.user_id,
            affiliate_id_target: entity.entity_id,
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

    res.send({
      deletedAffiliateRelation: {
        affiliate_relation_id: existingRelation.affiliate_relation_id,
        affiliate_username_root: req.user.username,
        affiliate_username_target: entity_username,
        affiliate_relation_date: existingRelation.affiliate_relation_date,
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
  const entity_username = req.query.entity_username;

  try {
    if (entity_username !== req.user.username) {
      const entity: Entity = await req.db.entities.findUnique({
        where: {
          entity_username: entity_username,
        },
      });

      const relation = await req.db.affiliates_relations.findUnique({
        where: {
          affiliate_id_root_affiliate_id_target: {
            affiliate_id_root: req.user.user_id,
            affiliate_id_target: entity.entity_id,
          },
        },
      });

      if (relation) {
        res.send({ isAffiliated: true, isUser: false });
      } else {
        res.send({ isAffiliated: false, isUser: false });
      }
    } else {
      res.send({ isAffiliated: false, isUser: true });
    }
  } catch (error) {
    console.error("Error fetching individual data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get all the affiliated entities with a certian entity_username
router.get("/get_affiliated_entities", verifyToken, async (req, res) => {
  const entity_username = req.query.entity_username;

  try {
    const entity: Entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const user_id = entity.entity_id;

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
      const individual: Individual = await req.db.individuals.findUnique({
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

      const newIndividual = {
        individual_username: individual.individual_username,
        individual_name: individual.individual_name,
        individual_current_issue: individual.individual_current_issue,
        individual_roles: individual.individual_roles,
        individual_description: individual.individual_description,
        profile_picture_id: individual.profile_picture_id,
      };

      individuals.push({
        ...newIndividual,
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
      const group: Group = await req.db.groups.findUnique({
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

      const newGroup = {
        group_handle: group.group_handle,
        group_name: group.group_name,
        group_current_issue: group.group_current_issue,
        group_stances: group.group_stances,
        group_description: group.group_description,
        profile_picture_id: group.profile_picture_id,
      };

      groups.push({
        ...newGroup,
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
      const organization: Organization = await req.db.organizations.findUnique({
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

      const newOrganization = {
        organization_handle: organization.organization_handle,
        organization_name: organization.organization_name,
        organization_current_issue: organization.organization_current_issue,
        organization_stances: organization.organization_stances,
        organization_description: organization.organization_description,
        profile_picture_id: organization.profile_picture_id,
      };

      organizations.push({
        ...newOrganization,
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

    const affiliates_relations: Relation[] =
      await req.db.affiliates_relations.findMany({
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

    const individuals: Individual[] = await req.db.individuals.findMany({
      where: { individual_id: { in: individualIdsList } },
    });

    const individualsWithAffiliateDate = individuals.map(
      (individual: Individual) => {
        const relation = affiliates_relations.find(
          (rel: Relation) =>
            rel.affiliate_id_target === individual.individual_id
        );

        const returningIndividual = {
          individual_username: individual.individual_username,
          individual_name: individual.individual_name,
          individual_current_issue: individual.individual_current_issue,
          individual_roles: individual.individual_roles,
          individual_description: individual.individual_description,
          profile_picture_id: individual.profile_picture_id,
        };

        if (relation) {
          return {
            ...returningIndividual,
            affiliate_relation_date: relation.affiliate_relation_date,
          };
        }

        return returningIndividual;
      }
    );

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

      const returningGroup = {
        group_handle: group.group_handle,
        group_name: group.group_name,
        group_current_issue: group.group_current_issue,
        group_stances: group.group_stances,
        group_description: group.group_description,
        profile_picture_id: group.profile_picture_id,
      };

      if (relation) {
        return {
          ...returningGroup,
          affiliate_relation_date: relation.affiliate_relation_date,
        };
      }

      return returningGroup;
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

        const returningOrganization = {
          organization_handle: organization.organization_handle,
          organization_name: organization.organization_name,
          organization_current_issue: organization.organization_current_issue,
          organization_stances: organization.organization_stances,
          organization_description: organization.organization_description,
          profile_picture_id: organization.profile_picture_id,
        };

        if (relation) {
          return {
            ...returningOrganization,
            affiliate_relation_date: relation.affiliate_relation_date,
          };
        }

        return returningOrganization;
      }
    );

    res.send(organizationsWithAffiliateDate);
  } catch (error) {
    console.error("Error fetching individual data:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
