import express from "express";
const router = express.Router();
import { v4 as uuid } from "uuid";
import verifyToken from "./verifyJWT";
import {
  Conversation,
  ConversationMember,
  Entity,
  Group,
  Individual,
  Message,
  Organization,
} from "@FgTypes/types";

// Get a user's full conversations
router.get("/user_conversations", verifyToken, async (req, res) => {
  try {
    const conversationsRelations = await req.db.conversations_members.findMany({
      where: {
        member_id: req.user.user_id,
      },
    });

    const conversationIds = conversationsRelations.map(
      (relation: ConversationMember) => relation.conversation_id
    );

    const conversations = await req.db.conversations.findMany({
      where: {
        conversation_id: { in: conversationIds },
      },
    });

    for (const conversationId of conversationIds) {
      const members = await req.db.conversations_members.findMany({
        where: {
          conversation_id: conversationId,
        },
      });

      const filteredMembers = members.filter(
        (member: ConversationMember) => member.member_id !== req.user.user_id
      );

      const membersIds = filteredMembers.map(
        (member: ConversationMember) => member.member_id
      );

      const individuals = await req.db.entities.findMany({
        where: {
          entity_id: { in: membersIds },
          entity_type: 1,
        },
      });

      const individualsIds = individuals.map(
        (individual: Entity) => individual.entity_id
      );

      const individualsData = await req.db.individuals.findMany({
        where: {
          individual_id: { in: individualsIds },
        },
      });

      const groups = await req.db.entities.findMany({
        where: {
          entity_id: { in: membersIds },
          entity_type: 2,
        },
      });

      const groupsIds = groups.map((group: Entity) => group.entity_id);

      const groupsData = await req.db.groups.findMany({
        where: {
          group_id: { in: groupsIds },
        },
      });

      const organizations = await req.db.entities.findMany({
        where: {
          entity_id: { in: membersIds },
          entity_type: 3,
        },
      });

      const organizationsIds = organizations.map(
        (organization: Entity) => organization.entity_id
      );

      const organizationsData = await req.db.organizations.findMany({
        where: {
          organization_id: { in: organizationsIds },
        },
      });

      const conversation: Conversation = conversations.find(
        (conversation: Conversation) =>
          conversation.conversation_id === conversationId
      );

      if (conversation) {
        conversation.members = filteredMembers;

        individualsData.forEach((individual: Individual) => {
          if (
            conversation.members?.some(
              (member: ConversationMember) =>
                member.member_id === individual.individual_id
            )
          ) {
            conversation.members.forEach((member: ConversationMember) => {
              if (member.member_id === individual.individual_id) {
                member.individual_data = {
                  individual_username: individual.individual_username,
                  individual_name: individual.individual_name,
                };
              }
            });
          }
        });

        groupsData.forEach((group: Group) => {
          if (
            conversation.members?.some(
              (member: ConversationMember) =>
                member.member_id === group.group_id
            )
          ) {
            conversation.members.forEach((member: ConversationMember) => {
              if (member.member_id === group.group_id) {
                member.group_data = {
                  group_handle: group.group_handle,
                  group_name: group.group_name,
                };
              }
            });
          }
        });

        organizationsData.forEach((organization: Organization) => {
          if (
            conversation.members?.some(
              (member: ConversationMember) =>
                member.member_id === organization.organization_id
            )
          ) {
            conversation.members.forEach((member: ConversationMember) => {
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

    res.send(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Insert a new row into conversations_messages_logs table only if sender is in the conversation
router.put("/new_conversation_message", verifyToken, async (req, res) => {
  const { conversation_id, message } = req.body;

  try {
    if (!conversation_id) {
      return;
    }

    const conversationMembers = await req.db.conversations_members.findMany({
      where: {
        conversation_id: conversation_id,
      },
    });

    const isInConversation = conversationMembers.some(
      (member: ConversationMember) => member.member_id === req.user.user_id
    );

    let result = "Authorization error";

    if (isInConversation) {
      result = await req.db.conversations_messages_logs.create({
        data: {
          conversations_messages_logs_id: uuid(),
          conversation_id: conversation_id,
          entity_id: req.user.user_id,
          message: message,
          message_date: new Date().toISOString(),
        },
      });

      await req.db.conversations.update({
        where: {
          conversation_id: conversation_id,
        },
        data: {
          last_message: message,
        },
      });
    }

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a conversation by id only if the user is in the conversation
router.get(
  "/conversation_by_conversation_id",
  verifyToken,
  async (req, res) => {
    const { conversation_id } = req.query;

    try {
      const conversationMembers = await req.db.conversations_members.findMany({
        where: {
          conversation_id: conversation_id,
        },
      });

      const isInConversation = conversationMembers.some(
        (member: ConversationMember) => member.member_id === req.user.user_id
      );

      let conversation = [];

      if (isInConversation) {
        conversation = await req.db.conversations_messages_logs.findMany({
          where: {
            conversation_id: conversation_id,
          },
        });

        const entityIds = conversation.map(
          (message: Message) => message.entity_id
        );

        const individuals = await req.db.entities.findMany({
          where: {
            entity_id: { in: entityIds },
            entity_type: 1,
          },
        });

        const individualsIds = individuals.map(
          (individual: Entity) => individual.entity_id
        );

        const individualsData = await req.db.individuals.findMany({
          where: {
            individual_id: { in: individualsIds },
          },
        });

        const groups = await req.db.entities.findMany({
          where: {
            entity_id: { in: entityIds },
            entity_type: 2,
          },
        });

        const groupsIds = groups.map((group: Entity) => group.entity_id);

        const groupsData = await req.db.groups.findMany({
          where: {
            group_id: { in: groupsIds },
          },
        });

        const organizations = await req.db.entities.findMany({
          where: {
            entity_id: { in: entityIds },
            entity_type: 3,
          },
        });

        const organizationsIds = organizations.map(
          (organization: Entity) => organization.entity_id
        );

        const organizationsData = await req.db.organizations.findMany({
          where: {
            organization_id: { in: organizationsIds },
          },
        });

        conversation = conversation.map((message: Message) => {
          let sender = "";
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

          if (individualMatch) {
            sender = individualMatch.individual_name;
          } else if (groupMatch) {
            sender = groupMatch.group_handle;
          } else if (organizationMatch) {
            sender = organizationMatch.organization_handle;
          }

          return {
            content: message.message,
            sender: sender,
            isUser: message.entity_id === req.user.user_id,
            message_date: message.message_date,
          };
        });
      }

      res.send(conversation);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Get a conversation by id only if the user is in the conversation
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

export default router;
