import express from "express";
const router = express.Router();
import verifyToken from "./verifyJWT";
import {
  Entity,
  Contact,
  Organization,
  Group,
  Individual,
  Conversation,
} from "@FgTypes/types";

// Get a user's full conversations
router.get("/user_contacts", verifyToken, async (req, res) => {
  try {
    const contacts = await req.db.contacts.findMany({
      where: {
        contact_id_root: req.user.user_id,
      },
    });

    const conversationIds = contacts.map(
      (contact: Contact) => contact.conversation_id
    );

    const conversations = await req.db.conversations.findMany({
      where: {
        conversation_id: { in: conversationIds },
      },
    });

    const contactIds = contacts.map(
      (contact: Contact) => contact.contact_id_target
    );

    const individuals = await req.db.entities.findMany({
      where: {
        entity_id: { in: contactIds },
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
        entity_id: { in: contactIds },
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
        entity_id: { in: contactIds },
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

    contacts.forEach((contact: Contact) => {
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

      if (individualMatch) {
        if (individualMatch.individual_name) {
          contact.contact_name = individualMatch.individual_name;
        } else {
          contact.contact_name = individualMatch.individual_username;
        }
      } else if (groupMatch) {
        if (groupMatch.group_name) {
          contact.contact_name = groupMatch.group_name;
        } else {
          contact.contact_name = groupMatch.group_handle;
        }
      } else if (organizationMatch) {
        if (organizationMatch.organization_name) {
          contact.contact_name = organizationMatch.organization_name;
        } else {
          contact.contact_name = organizationMatch.organization_handle;
        }
      } else {
        contact.contact_name = null;
      }
      if (conversationMatch) {
        contact.conversation_name = conversationMatch.conversation_name;
      } else {
        contact.conversation_name = null;
      }
    });

    res.send(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
