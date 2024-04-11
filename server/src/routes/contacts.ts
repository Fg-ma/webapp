import express from "express";
const router = express.Router();
import { v4 as uuid } from "uuid";
import { prisma } from "../prismaMiddleware";
import verifyToken from "./verifyJWT";
import {
  Entity,
  Contact,
  Organization,
  Group,
  Individual,
  Conversation,
  ConversationMember,
} from "@FgTypes/types";

async function getEntityData(entity_id: string) {
  const entity = await prisma.entities.findUnique({
    where: {
      entity_id: entity_id,
    },
  });

  if (entity?.entity_type === 1) {
    const entityData = await prisma.individuals.findUnique({
      where: {
        individual_id: entity_id,
      },
    });

    return { entity: entity, entityData: entityData };
  } else if (entity?.entity_type === 2) {
    const entityData = await prisma.groups.findUnique({
      where: {
        group_id: entity_id,
      },
    });

    return { entity: entity, entityData: entityData };
  } else if (entity?.entity_type === 3) {
    const entityData = await prisma.organizations.findUnique({
      where: {
        organization_id: entity_id,
      },
    });

    return { entity: entity, entityData: entityData };
  }
}

// Get a user's full conversations
router.get("/user_contacts", verifyToken, async (req, res) => {
  try {
    const contacts: Contact[] = await req.db.contacts.findMany({
      where: {
        contact_id_root: req.user.user_id,
      },
    });

    const conversationIds: string[] = contacts.map(
      (contact: Contact) => contact.conversation_id
    );

    const conversations: Conversation[] = await req.db.conversations.findMany({
      where: {
        conversation_id: { in: conversationIds },
      },
    });

    const contactIds: string[] = contacts.map(
      (contact: Contact) => contact.contact_id_target
    );

    const individuals: Entity[] = await req.db.entities.findMany({
      where: {
        entity_id: { in: contactIds },
        entity_type: 1,
      },
    });

    const individualsIds: string[] = individuals.map(
      (individual: Entity) => individual.entity_id
    );

    const individualsData: Individual[] = await req.db.individuals.findMany({
      where: {
        individual_id: { in: individualsIds },
      },
    });

    const groups: Entity[] = await req.db.entities.findMany({
      where: {
        entity_id: { in: contactIds },
        entity_type: 2,
      },
    });

    const groupsIds: string[] = groups.map((group: Entity) => group.entity_id);

    const groupsData: Group[] = await req.db.groups.findMany({
      where: {
        group_id: { in: groupsIds },
      },
    });

    const organizations: Entity[] = await req.db.entities.findMany({
      where: {
        entity_id: { in: contactIds },
        entity_type: 3,
      },
    });

    const organizationsIds: string[] = organizations.map(
      (organization: Entity) => organization.entity_id
    );

    const organizationsData: Organization[] =
      await req.db.organizations.findMany({
        where: {
          organization_id: { in: organizationsIds },
        },
      });

    const returningContacts = contacts.map((contact: Contact) => {
      const individualMatch = individualsData.find(
        (individual: Individual) =>
          individual.individual_id === contact.contact_id_target
      );
      const groupMatch = groupsData.find(
        (group: Group) => group.group_id === contact.contact_id_target
      );
      const organizationMatch = organizationsData.find(
        (organization: Organization) =>
          organization.organization_id === contact.contact_id_target
      );
      const conversationMatch = conversations.find(
        (conversation: Conversation) =>
          conversation.conversation_id === contact.conversation_id
      );

      let contact_name: string | null;
      let contact_username: string | null;
      let conversation_name: string | null;
      if (individualMatch) {
        if (individualMatch.individual_name) {
          contact_name = individualMatch.individual_name;
        } else {
          contact_name = individualMatch.individual_username;
        }
        contact_username = individualMatch.individual_username;
      } else if (groupMatch) {
        if (groupMatch.group_name) {
          contact_name = groupMatch.group_name;
        } else {
          contact_name = groupMatch.group_handle;
        }
        contact_username = groupMatch.group_handle;
      } else if (organizationMatch) {
        if (organizationMatch.organization_name) {
          contact_name = organizationMatch.organization_name;
        } else {
          contact_name = organizationMatch.organization_handle;
        }
        contact_username = organizationMatch.organization_handle;
      } else {
        contact_name = null;
        contact_username = null;
      }
      if (conversationMatch) {
        conversation_name = conversationMatch.conversation_name;
      } else {
        conversation_name = null;
      }

      return {
        contact_id: contact.contact_id,
        contact_name: contact_name,
        conversation_id: contact,
        conversation_name: conversation_name,
        contact_username_root: req.user.username,
        contact_username_target: contact_username,
        contact_creation_date: contact.contact_creation_date,
        last_message: contact.last_message,
        last_contact_date: contact.last_contact_date,
      };
    });

    res.send(returningContacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Creates a new contact and conversation if a conversation doesn't already exist
router.put("/set_contact_by_entity_username", verifyToken, async (req, res) => {
  const { entity_username } = req.body;

  try {
    if (!entity_username) {
      return;
    }

    const entity: Entity = await req.db.entities.findUnique({
      where: {
        entity_username: entity_username,
      },
    });

    const userConversations = await req.db.conversations_members.findMany({
      where: {
        member_id: req.user.user_id,
      },
    });

    const conversationIds = userConversations.map(
      (conversation: ConversationMember) => conversation.conversation_id
    );

    const sharedConversations = await req.db.conversations_members.findMany({
      where: {
        conversation_id: { in: conversationIds },
        member_id: entity.entity_id,
      },
    });

    const sharedConversationIds = sharedConversations.map(
      (conversation: ConversationMember) => conversation.conversation_id
    );

    const fullSharedConversations = await req.db.conversations_members.groupBy({
      by: ["conversation_id"],
      where: {
        conversation_id: {
          in: sharedConversationIds,
        },
      },
      having: {
        conversation_id: {
          _count: {
            equals: 2,
          },
        },
      },
    });

    if (fullSharedConversations.length === 0) {
      const currentTime = new Date().toISOString();
      const contact_id = uuid();
      const conversation_id = uuid();

      await req.db.contacts.create({
        data: {
          contact_id: contact_id,
          conversation_id: conversation_id,
          contact_id_root: req.user.user_id,
          contact_id_target: entity.entity_id,
          contact_creation_date: currentTime,
        },
      });

      await req.db.conversations.create({
        data: {
          conversation_id: conversation_id,
          conversation_creation_date: currentTime,
        },
      });

      await req.db.conversations_members.create({
        data: {
          conversations_members_id: uuid(),
          conversation_id: conversation_id,
          member_id: req.user.user_id,
        },
      });

      await req.db.conversations_members.create({
        data: {
          conversations_members_id: uuid(),
          conversation_id: conversation_id,
          member_id: entity.entity_id,
        },
      });

      const fullEntity = await getEntityData(entity.entity_id);

      if (
        fullEntity?.entity.entity_type === 1 &&
        fullEntity.entityData &&
        "individual_username" in fullEntity.entityData
      ) {
        if (fullEntity.entityData.individual_name) {
          res.send({
            contact_id: contact_id,
            conversation_id: conversation_id,
            conversation_name: null,
            members: [fullEntity.entityData.individual_name],
            conversation_creation_date: currentTime,
          });
        } else {
          res.send({
            contact_id: contact_id,
            conversation_id: conversation_id,
            conversation_name: null,
            members: [fullEntity.entityData.individual_username],
            conversation_creation_date: currentTime,
          });
        }
      } else if (
        fullEntity?.entity.entity_type === 2 &&
        fullEntity.entityData &&
        "group_handle" in fullEntity.entityData
      ) {
        if (fullEntity?.entityData.group_name) {
          res.send({
            contact_id: contact_id,
            conversation_id: conversation_id,
            conversation_name: null,
            members: [fullEntity.entityData.group_name],
            conversation_creation_date: currentTime,
          });
        } else {
          res.send({
            contact_id: contact_id,
            conversation_id: conversation_id,
            conversation_name: null,
            members: [fullEntity.entityData.group_handle],
            conversation_creation_date: currentTime,
          });
        }
      } else if (
        fullEntity?.entity.entity_type === 3 &&
        fullEntity.entityData &&
        "organization_handle" in fullEntity.entityData
      ) {
        if (fullEntity.entityData.organization_name) {
          res.send({
            contact_id: contact_id,
            conversation_id: conversation_id,
            conversation_name: null,
            members: [fullEntity?.entityData.organization_name],
            conversation_creation_date: currentTime,
          });
        } else {
          res.send({
            contact_id: contact_id,
            conversation_id: conversation_id,
            conversation_name: null,
            members: [fullEntity.entityData.organization_handle],
            conversation_creation_date: currentTime,
          });
        }
      }
    } else {
      const conversationData = await req.db.conversations.findUnique({
        where: {
          conversation_id: fullSharedConversations[0].conversation_id,
        },
      });

      const currentTime = new Date().toISOString();
      const contact_id = uuid();

      try {
        await req.db.contacts.create({
          data: {
            contact_id: contact_id,
            conversation_id: fullSharedConversations[0].conversation_id,
            contact_id_root: req.user.user_id,
            contact_id_target: entity.entity_id,
            contact_creation_date: currentTime,
            last_message: conversationData.last_message,
          },
        });
      } catch {}

      const conversationMembersData =
        await req.db.conversations_members.findMany({
          where: {
            conversation_id: fullSharedConversations[0].conversation_id,
          },
        });

      const conversationMembersIds = conversationMembersData.map(
        (member: ConversationMember) => member.member_id
      );

      let memberId = "";

      for (const index in conversationMembersIds) {
        if (conversationMembersIds[index] !== req.user.user_id) {
          memberId = conversationMembersIds[index];
        }
      }

      let members: string[] = [];

      const fullEntity = await getEntityData(memberId);

      if (
        fullEntity?.entity.entity_type === 1 &&
        fullEntity.entityData &&
        "individual_username" in fullEntity.entityData
      ) {
        if (fullEntity.entityData.individual_name) {
          members.push(fullEntity.entityData.individual_name);
        } else {
          members.push(fullEntity.entityData.individual_username);
        }
      } else if (
        fullEntity?.entity.entity_type === 2 &&
        fullEntity.entityData &&
        "group_handle" in fullEntity.entityData
      ) {
        if (fullEntity?.entityData.group_name) {
          members.push(fullEntity.entityData.group_name);
        } else {
          members.push(fullEntity.entityData.group_handle);
        }
      } else if (
        fullEntity?.entity.entity_type === 3 &&
        fullEntity.entityData &&
        "organization_handle" in fullEntity.entityData
      ) {
        if (fullEntity.entityData.organization_name) {
          members.push(fullEntity.entityData.organization_name);
        } else {
          members.push(fullEntity.entityData.organization_handle);
        }
      }

      res.send({
        contact_id: contact_id,
        conversation_id: fullSharedConversations[0].conversation_id,
        conversation_name: conversationData.conversation_name,
        members: members,
        conversation_creation_date: conversationData.conversation_creation_date,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a contact by contact_id
router.get("/get_contact_by_contact_id", verifyToken, async (req, res) => {
  const { contact_id } = req.query;

  try {
    const user: Entity = await req.db.entities.findUnique({
      where: {
        entity_id: req.user.user_id,
      },
    });

    const contact: Contact = await req.db.contacts.findUnique({
      where: {
        contact_id: contact_id,
        contact_id_root: req.user.user_id,
      },
    });

    if (!contact || !contact.conversation_id) {
      res.status(500).send("Internal Server Error");
    }

    const conversation: Conversation = await req.db.conversations.findUnique({
      where: {
        conversation_id: contact.conversation_id,
      },
    });

    const entity: Entity = await req.db.entities.findUnique({
      where: {
        entity_id: contact.contact_id_target,
      },
    });

    let entityData;
    if (entity.entity_type === 1) {
      entityData = await req.db.individuals.findUnique({
        where: {
          individual_id: contact.contact_id_target,
        },
      });

      if (entityData.individual_name) {
        res.send({
          contact_id: contact.contact_id,
          conversation_name: conversation.conversation_name,
          conversation_id: conversation.conversation_id,
          contact_name: entityData.individual_name,
          contact_username_root: user.entity_username,
          contact_username_target: entityData.individual_username,
          contact_creation_date: contact.contact_creation_date,
          last_message: contact.last_message,
          last_contact_date: contact.last_contact_date,
        });
      } else {
        res.send({
          contact_id: contact.contact_id,
          conversation_name: conversation.conversation_name,
          conversation_id: conversation.conversation_id,
          contact_name: entityData.organization_handle,
          contact_username_root: user.entity_username,
          contact_username_target: entityData.organization_handle,
          contact_creation_date: contact.contact_creation_date,
          last_message: contact.last_message,
          last_contact_date: contact.last_contact_date,
        });
      }
    } else if (entity.entity_type === 2) {
      entityData = await req.db.groups.findUnique({
        where: {
          group_id: contact.contact_id_target,
        },
      });

      if (entityData.group_name) {
        res.send({
          contact_id: contact.contact_id,
          conversation_name: conversation.conversation_name,
          conversation_id: conversation.conversation_id,
          contact_name: entityData.group_name,
          contact_username_root: user.entity_username,
          contact_username_target: entityData.group_handle,
          contact_creation_date: contact.contact_creation_date,
          last_message: contact.last_message,
          last_contact_date: contact.last_contact_date,
        });
      } else {
        res.send({
          contact_id: contact.contact_id,
          conversation_name: conversation.conversation_name,
          conversation_id: conversation.conversation_id,
          contact_name: entityData.organization_handle,
          contact_username_root: user.entity_username,
          contact_username_target: entityData.organization_handle,
          contact_creation_date: contact.contact_creation_date,
          last_message: contact.last_message,
          last_contact_date: contact.last_contact_date,
        });
      }
    } else if (entity.entity_type === 3) {
      entityData = await req.db.organizations.findUnique({
        where: {
          organization_id: contact.contact_id_target,
        },
      });

      if (entityData.organization_name) {
        res.send({
          contact_id: contact.contact_id,
          conversation_name: conversation.conversation_name,
          conversation_id: conversation.conversation_id,
          contact_name: entityData.organization_name,
          contact_username_root: user.entity_username,
          contact_username_target: entityData.organization_handle,
          contact_creation_date: contact.contact_creation_date,
          last_message: contact.last_message,
          last_contact_date: contact.last_contact_date,
        });
      } else {
        res.send({
          contact_id: contact.contact_id,
          conversation_name: conversation.conversation_name,
          conversation_id: conversation.conversation_id,
          contact_name: entityData.organization_handle,
          contact_username_root: user.entity_username,
          contact_username_target: entityData.organization_handle,
          contact_creation_date: contact.contact_creation_date,
          last_message: contact.last_message,
          last_contact_date: contact.last_contact_date,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
