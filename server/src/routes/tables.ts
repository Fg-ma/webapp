import express from "express";
const router = express.Router();
import { v4 as uuid } from "uuid";
import verifyToken from "./verifyJWT";
import {
  Entity,
  Group,
  Individual,
  Organization,
  TableMember,
  Table,
  TablePicture,
} from "@FgTypes/types";

// Get a user's full tables
router.get("/user_tables", verifyToken, async (req, res) => {
  try {
    const tablesRelations: TableMember[] = await req.db.tables_members.findMany(
      {
        where: {
          member_id: req.user.user_id,
        },
      }
    );

    const tableIds = tablesRelations.map((relation) => relation.table_id);

    const tables: Table[] = await req.db.tables.findMany({
      where: {
        table_id: { in: tableIds },
      },
    });

    for (const tableId of tableIds) {
      const members: TableMember[] = await req.db.tables_members.findMany({
        where: {
          table_id: tableId,
        },
      });

      const filteredMembers = members.filter(
        (member) => member.member_id !== req.user.user_id
      );

      const membersIds = filteredMembers.map((member) => member.member_id);

      const individuals: Entity[] = await req.db.entities.findMany({
        where: {
          entity_id: { in: membersIds },
          entity_type: 1,
        },
      });

      const individualsIds = individuals.map(
        (individual) => individual.entity_id
      );

      const individualsData: Individual[] = await req.db.individuals.findMany({
        where: {
          individual_id: { in: individualsIds },
        },
      });

      const groups: Entity[] = await req.db.entities.findMany({
        where: {
          entity_id: { in: membersIds },
          entity_type: 2,
        },
      });

      const groupsIds = groups.map((group) => group.entity_id);

      const groupsData: Group[] = await req.db.groups.findMany({
        where: {
          group_id: { in: groupsIds },
        },
      });

      const organizations: Entity[] = await req.db.entities.findMany({
        where: {
          entity_id: { in: membersIds },
          entity_type: 3,
        },
      });

      const organizationsIds = organizations.map(
        (organization) => organization.entity_id
      );

      const organizationsData: Organization[] =
        await req.db.organizations.findMany({
          where: {
            organization_id: { in: organizationsIds },
          },
        });

      const table = tables.find((table) => table.table_id === tableId);

      if (table) {
        table.members = filteredMembers;

        individualsData.forEach((individual) => {
          if (
            table.members?.some(
              (member) => member.member_id === individual.individual_id
            )
          ) {
            table.members.forEach((member) => {
              if (member.member_id === individual.individual_id) {
                member.individual_data = {
                  individual_username: individual.individual_username,
                  individual_name: individual.individual_name,
                };
              }
            });
          }
        });

        groupsData.forEach((group) => {
          if (
            table.members?.some((member) => member.member_id === group.group_id)
          ) {
            table.members.forEach((member) => {
              if (member.member_id === group.group_id) {
                member.group_data = {
                  group_handle: group.group_handle,
                  group_name: group.group_name,
                };
              }
            });
          }
        });

        organizationsData.forEach((organization) => {
          if (
            table.members?.some(
              (member) => member.member_id === organization.organization_id
            )
          ) {
            table.members.forEach((member) => {
              if (member.member_id === organization.organization_id) {
                member.organization_data = {
                  organization_handle: organization.organization_handle,
                  organization_name: organization.organization_name,
                };
              }
            });
          }
        });
      }
    }

    const returningTables = tables.map((table) => ({
      table_id: table.table_id,
      table_name: table.table_name,
      table_creation_date: table.table_creation_date,
      last_message: table.last_message,
      last_message_date: table.last_message_date,
      tables_pictures_id: table.tables_pictures_id,
      members: table.members?.map(
        ({ table_id, tables_members_id, member_id, ...rest }) => rest
      ),
    }));

    res.send(returningTables);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a table by table_id
router.get("/get_table_by_table_id", verifyToken, async (req, res) => {
  const { table_id } = req.query;

  try {
    const table: Table = await req.db.tables.findUnique({
      where: {
        table_id: table_id,
      },
    });

    const members: TableMember[] = await req.db.tables_members.findMany({
      where: {
        table_id: table_id,
      },
    });

    const filteredMembers = members.filter(
      (member) => member.member_id !== req.user.user_id
    );

    const membersIds = filteredMembers.map((member) => member.member_id);

    const individuals: Entity[] = await req.db.entities.findMany({
      where: {
        entity_id: { in: membersIds },
        entity_type: 1,
      },
    });

    const individualsIds = individuals.map(
      (individual) => individual.entity_id
    );

    const individualsData: Individual[] = await req.db.individuals.findMany({
      where: {
        individual_id: { in: individualsIds },
      },
    });

    const groups: Entity[] = await req.db.entities.findMany({
      where: {
        entity_id: { in: membersIds },
        entity_type: 2,
      },
    });

    const groupsIds = groups.map((group) => group.entity_id);

    const groupsData: Group[] = await req.db.groups.findMany({
      where: {
        group_id: { in: groupsIds },
      },
    });

    const organizations: Entity[] = await req.db.entities.findMany({
      where: {
        entity_id: { in: membersIds },
        entity_type: 3,
      },
    });

    const organizationsIds = organizations.map(
      (organization) => organization.entity_id
    );

    const organizationsData: Organization[] =
      await req.db.organizations.findMany({
        where: {
          organization_id: { in: organizationsIds },
        },
      });

    table.members = filteredMembers;

    individualsData.forEach((individual) => {
      if (
        table.members?.some(
          (member) => member.member_id === individual.individual_id
        )
      ) {
        table.members.forEach((member) => {
          if (member.member_id === individual.individual_id) {
            member.individual_data = {
              individual_username: individual.individual_username,
              individual_name: individual.individual_name,
            };
          }
        });
      }
    });

    groupsData.forEach((group) => {
      if (
        table.members?.some((member) => member.member_id === group.group_id)
      ) {
        table.members.forEach((member) => {
          if (member.member_id === group.group_id) {
            member.group_data = {
              group_handle: group.group_handle,
              group_name: group.group_name,
            };
          }
        });
      }
    });

    organizationsData.forEach((organization) => {
      if (
        table.members?.some(
          (member) => member.member_id === organization.organization_id
        )
      ) {
        table.members.forEach((member) => {
          if (member.member_id === organization.organization_id) {
            member.organization_data = {
              organization_handle: organization.organization_handle,
              organization_name: organization.organization_name,
            };
          }
        });
      }
    });

    const returningTables = {
      table_id: table_id,
      table_name: table.table_name,
      table_creation_date: table.table_creation_date,
      last_message: table.last_message,
      last_message_date: table.last_message_date,
      tables_pictures_id: table.tables_pictures_id,
      members: table.members?.map(
        ({ table_id, tables_members_id, member_id, ...rest }) => rest
      ),
    };

    res.send(returningTables);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Gets the data needed for a conversation picture
router.get("/get_table_picture", async (req, res) => {
  const { tables_pictures_id } = req.query;

  try {
    const tablePicture: TablePicture = await req.db.tables_pictures.findUnique({
      where: {
        tables_pictures_id: tables_pictures_id,
      },
    });

    if (!tablePicture) {
      res.send("Default");
      return;
    }

    res.send(tablePicture);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
