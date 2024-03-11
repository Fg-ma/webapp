import express from "express";
const router = express.Router();
import { v4 as uuid } from "uuid";
import verifyToken from "./verifyJWT";

// Get a user's full conversations
router.get("/user_conversations", verifyToken, async (req, res) => {
  try {
    const conversationsRelations = await req.db.conversations_members.findMany({
      where: {
        member_id: req.user.user_id,
      },
    });

    const conversationIds = conversationsRelations.map(
      (relation: any) => relation.conversation_id
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
        (member: any) => member.member_id !== req.user.user_id
      );

      const membersIds = filteredMembers.map((member: any) => member.member_id);

      const individuals = await req.db.entities.findMany({
        where: {
          entity_id: { in: membersIds },
          entity_type: 1,
        },
      });

      const individualsIds = individuals.map(
        (individual: any) => individual.entity_id
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

      const groupsIds = groups.map((group: any) => group.entity_id);

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
        (organization: any) => organization.entity_id
      );

      const organizationsData = await req.db.organizations.findMany({
        where: {
          organization_id: { in: organizationsIds },
        },
      });

      const conversation = conversations.find(
        (c: any) => c.conversation_id === conversationId
      );

      if (conversation) {
        conversation.members = filteredMembers;

        individualsData.forEach((individual: any) => {
          if (
            conversation.members.some(
              (member: any) => member.member_id === individual.individual_id
            )
          ) {
            conversation.members.forEach((member: any) => {
              if (member.member_id === individual.individual_id) {
                member.individual_data = {
                  individual_username: individual.individual_username,
                  individual_name: individual.individual_name,
                };
              }
            });
          }
        });

        groupsData.forEach((group: any) => {
          if (
            conversation.members.some(
              (member: any) => member.member_id === group.group_id
            )
          ) {
            conversation.members.forEach((member: any) => {
              if (member.member_id === group.group_id) {
                member.group_data = {
                  group_handle: group.group_handle,
                  group_name: group.group_name,
                };
              }
            });
          }
        });

        organizationsData.forEach((organization: any) => {
          if (
            conversation.members.some(
              (member: any) => member.member_id === organization.organization_id
            )
          ) {
            conversation.members.forEach((member: any) => {
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
    const conversationMembers = await req.db.conversations_members.findMany({
      where: {
        conversation_id: conversation_id,
      },
    });

    const isInConversation = conversationMembers.some(
      (member: any) => member.member_id === req.user.user_id
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
        (member: any) => member.member_id === req.user.user_id
      );

      let conversation = [];

      if (isInConversation) {
        conversation = await req.db.conversations_messages_logs.findMany({
          where: {
            conversation_id: conversation_id,
          },
        });

        const entityIds = conversation.map((message: any) => message.entity_id);

        const individuals = await req.db.entities.findMany({
          where: {
            entity_id: { in: entityIds },
            entity_type: 1,
          },
        });

        const individualsIds = individuals.map(
          (individual: any) => individual.entity_id
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

        const groupsIds = groups.map((group: any) => group.entity_id);

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
          (organization: any) => organization.entity_id
        );

        const organizationsData = await req.db.organizations.findMany({
          where: {
            organization_id: { in: organizationsIds },
          },
        });

        conversation = conversation.map((message: any) => {
          let sender = "";
          const currentEntityId = message.entity_id;

          const individualMatch = individualsData.find(
            (individual: any) => individual.individual_id === currentEntityId
          );

          const groupMatch = groupsData.find(
            (group: any) => group.group_id === currentEntityId
          );

          const organizationMatch = organizationsData.find(
            (organization: any) =>
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

export default router;
