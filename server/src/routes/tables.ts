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
  TableTop,
} from "@FgTypes/types";
import { tables_messages_logs } from "prisma/generated";

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
    const isUserInTable = await req.db.tables_members.findUnique({
      where: {
        table_id_member_id: {
          table_id: table_id,
          member_id: req.user.user_id,
        },
      },
    });

    if (!isUserInTable) {
      res.send("Not in table");
    }

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
              individual_current_issue: individual.individual_current_issue,
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
              group_current_issue: group.group_current_issue,
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
              organization_current_issue:
                organization.organization_current_issue,
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

// Gets the data needed for a table picture
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

// Insert a new row into tables_messages_logs table only if sender is in the table
router.put("/new_table_message", verifyToken, async (req, res) => {
  const { table_id, message } = req.body;

  try {
    if (!table_id) {
      return;
    }

    const tableMembers: TableMember[] = await req.db.tables_members.findMany({
      where: {
        table_id: table_id,
      },
    });

    const isInTable = tableMembers.some(
      (member) => member.member_id === req.user.user_id
    );

    let result = "Authorization error";

    if (isInTable) {
      const currentTime = new Date().toISOString();

      result = await req.db.tables_messages_logs.create({
        data: {
          tables_messages_logs_id: uuid(),
          table_id: table_id,
          entity_id: req.user.user_id,
          message: message,
          message_date: currentTime,
        },
      });

      await req.db.tables.update({
        where: {
          table_id: table_id,
        },
        data: {
          last_message: message,
          last_message_date: currentTime,
        },
      });
    }

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Gets if the user sent a message
router.get("/isUser", verifyToken, async (req, res) => {
  const { sender } = req.query;

  try {
    const isUser = sender === req.user.username;

    if (req.user.entity_type === 1) {
      const individual = await req.db.individuals.findUnique({
        where: {
          individual_username: sender,
        },
      });

      if (individual.individual_name) {
        res.send({
          sender: individual.individual_name,
          isUser: isUser,
        });
      } else {
        res.send({
          sender: individual.individual_username,
          isUser: isUser,
        });
      }
    } else if (req.user.entity_type === 2) {
      const group = await req.db.groups.findUnique({
        where: {
          group_handle: sender,
        },
      });

      if (group.group_name) {
        res.send({
          sender: group.group_name,
          isUser: isUser,
        });
      } else {
        res.send({
          sender: group.group_handle,
          isUser: isUser,
        });
      }
    } else if (req.user.entity_type === 3) {
      const organization = await req.db.organizations.findUnique({
        where: {
          organization_handle: sender,
        },
      });

      if (organization.organization_name) {
        res.send({
          sender: organization.organization_name,
          isUser: isUser,
        });
      } else {
        res.send({
          sender: organization.organization_handle,
          isUser: isUser,
        });
      }
    } else {
      res.send({
        sender: sender,
        isUser: isUser,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a table conversation by id only if the user is in the table
router.get("/table_conversation_by_table_id", verifyToken, async (req, res) => {
  const { table_id } = req.query;

  try {
    const tableMembers: TableMember[] = await req.db.tables_members.findMany({
      where: {
        table_id: table_id,
      },
    });

    const isInTable = tableMembers.some(
      (member) => member.member_id === req.user.user_id
    );

    if (isInTable) {
      const tableConversation: tables_messages_logs[] =
        await req.db.tables_messages_logs.findMany({
          where: {
            table_id: table_id,
          },
        });

      const entityIds = tableConversation.map((message) => message.entity_id);

      const individuals: Entity[] = await req.db.entities.findMany({
        where: {
          entity_id: { in: entityIds },
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
          entity_id: { in: entityIds },
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
          entity_id: { in: entityIds },
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

      const returningTableConversation = tableConversation.map((message) => {
        const currentEntityId = message.entity_id;

        const individualMatch = individualsData.find(
          (individual: Individual) =>
            individual.individual_id === currentEntityId
        );

        const groupMatch = groupsData.find(
          (group: Group) => group.group_id === currentEntityId
        );

        const organizationMatch = organizationsData.find(
          (organization: Organization) =>
            organization.organization_id === currentEntityId
        );

        return {
          content: message.message,
          sender: individualMatch
            ? individualMatch.individual_username
            : groupMatch
            ? groupMatch.group_handle
            : organizationMatch
            ? organizationMatch.organization_handle
            : "",
          isUser: message.entity_id === req.user.user_id,
          message_date: message.message_date,
        };
      });

      res.send({
        tableConversation: returningTableConversation,
        tableSize: tableMembers.length,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a table by table_id
router.get("/get_table_top_by_table_id", verifyToken, async (req, res) => {
  const { table_id } = req.query;

  try {
    const isUserInTable = await req.db.tables_members.findUnique({
      where: {
        table_id_member_id: {
          table_id: table_id,
          member_id: req.user.user_id,
        },
      },
    });

    if (!isUserInTable) {
      res.send("Not in table");
    }

    const tableTops: TableTop[] = await req.db.tables_tabletops.findMany({
      where: {
        table_id: table_id,
      },
    });

    const creatorsIds = tableTops.map((tableTop) => tableTop.creator_id);

    const individuals: Entity[] = await req.db.entities.findMany({
      where: {
        entity_id: { in: creatorsIds },
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
        entity_id: { in: creatorsIds },
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
        entity_id: { in: creatorsIds },
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

    individualsData.forEach((individual) => {
      if (
        tableTops.some(
          (tableTop) => tableTop.creator_id === individual.individual_id
        )
      ) {
        tableTops.forEach((tableTop) => {
          if (tableTop.creator_id === individual.individual_id) {
            tableTop.individual_data = {
              individual_username: individual.individual_username,
              individual_name: individual.individual_name,
              individual_current_issue: individual.individual_current_issue,
            };
          }
        });
      }
    });

    groupsData.forEach((group) => {
      if (
        tableTops.some((tableTop) => tableTop.creator_id === group.group_id)
      ) {
        tableTops.forEach((tableTop) => {
          if (tableTop.creator_id === group.group_id) {
            tableTop.group_data = {
              group_handle: group.group_handle,
              group_name: group.group_name,
              group_current_issue: group.group_current_issue,
            };
          }
        });
      }
    });

    organizationsData.forEach((organization) => {
      if (
        tableTops.some(
          (tableTop) => tableTop.creator_id === organization.organization_id
        )
      ) {
        tableTops.forEach((tableTop) => {
          if (tableTop.creator_id === organization.organization_id) {
            tableTop.organization_data = {
              organization_handle: organization.organization_handle,
              organization_name: organization.organization_name,
              organization_current_issue:
                organization.organization_current_issue,
            };
          }
        });
      }
    });

    const returningTableTops = tableTops.map((tableTop) => {
      if (tableTop.individual_data) {
        return {
          tables_tabletops_id: tableTop.tables_tabletops_id,
          table_id: tableTop.table_id,
          type: tableTop.type,
          tables_tabletops_data_id: tableTop.tables_tabletops_data_id,
          content_date_posted: tableTop.content_date_posted,
          content_x_position: tableTop.content_x_position,
          content_y_position: tableTop.content_y_position,
          content_rotation: tableTop.content_rotation,
          content_filename: tableTop.content_filename,
          individual_data: tableTop.individual_data,
        };
      } else if (tableTop.group_data) {
        return {
          tables_tabletops_id: tableTop.tables_tabletops_id,
          table_id: tableTop.table_id,
          type: tableTop.type,
          tables_tabletops_data_id: tableTop.tables_tabletops_data_id,
          content_date_posted: tableTop.content_date_posted,
          content_x_position: tableTop.content_x_position,
          content_y_position: tableTop.content_y_position,
          content_rotation: tableTop.content_rotation,
          content_filename: tableTop.content_filename,
          group_data: tableTop.group_data,
        };
      } else if (tableTop.organization_data) {
        return {
          tables_tabletops_id: tableTop.tables_tabletops_id,
          table_id: tableTop.table_id,
          type: tableTop.type,
          tables_tabletops_data_id: tableTop.tables_tabletops_data_id,
          content_date_posted: tableTop.content_date_posted,
          content_x_position: tableTop.content_x_position,
          content_y_position: tableTop.content_y_position,
          content_rotation: tableTop.content_rotation,
          content_filename: tableTop.content_filename,
          organization_data: tableTop.organization_data,
        };
      } else {
        return {
          tables_tabletops_id: tableTop.tables_tabletops_id,
          table_id: tableTop.table_id,
          type: tableTop.type,
          tables_tabletops_data_id: tableTop.tables_tabletops_data_id,
          content_date_posted: tableTop.content_date_posted,
          content_x_position: tableTop.content_x_position,
          content_y_position: tableTop.content_y_position,
          content_rotation: tableTop.content_rotation,
          content_filename: tableTop.content_filename,
        };
      }
    });

    res.send(returningTableTops);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
