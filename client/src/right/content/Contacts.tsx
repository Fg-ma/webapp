import React, { useEffect, useState } from "react";
import Axios from "axios";
import config from "@config";
import { useSocketContext } from "@context/LiveUpdatesContext";
import { Contact } from "@FgTypes/rightTypes";
import { ContactCard } from "./RightSpaceCards";
import { useLastMessageContext } from "@context/LastMessageContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Contacts() {
  const { liveUpdatesSocket } = useSocketContext();
  const { lastMessage } = useLastMessageContext();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const sortData = (data: Contact[]) => {
    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    const sortedData = [...data];

    sortedData.sort((a, b) => {
      if (a.last_contact_date !== null && b.last_contact_date !== null) {
        return parseDate(b.last_contact_date) - parseDate(a.last_contact_date);
      } else if (a.last_contact_date !== null && b.last_contact_date === null) {
        return (
          parseDate(b.contact_creation_date) - parseDate(a.last_contact_date)
        );
      } else if (a.last_contact_date === null && b.last_contact_date !== null) {
        return (
          parseDate(b.last_contact_date) - parseDate(a.contact_creation_date)
        );
      } else {
        return (
          parseDate(b.contact_creation_date) -
          parseDate(a.contact_creation_date)
        );
      }
    });

    return [...sortedData];
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/contacts/user_contacts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setContacts(sortData(response.data));
      } catch (error) {
        console.error("Error fetching entity data:", error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const updatedContacts = contacts.map((contact) => {
      if (contact.conversation_id === lastMessage.conversation_id) {
        return {
          ...contact,
          last_message: lastMessage.last_message,
        };
      }
      return contact;
    });

    const indexToUpdate = updatedContacts.findIndex(
      (contact) => contact.conversation_id === lastMessage.conversation_id,
    );

    if (indexToUpdate !== -1) {
      const updatedConversation = updatedContacts.splice(indexToUpdate, 1)[0];
      updatedContacts.unshift(updatedConversation);
    }

    setContacts(updatedContacts);
  }, [lastMessage]);

  // Establish incomingMessage live update socket connection
  useEffect(() => {
    liveUpdatesSocket?.on(
      "incomingMessage",
      (incomingMessage: { content: string; conversation_id: string }) => {
        setContacts((prevContacts) => {
          const updatedContacts = prevContacts.map((contact) => {
            if (contact.conversation_id === incomingMessage.conversation_id) {
              return {
                ...contact,
                last_message: incomingMessage.content,
              };
            }
            return contact;
          });

          const indexToUpdate = updatedContacts.findIndex(
            (contact) =>
              contact.conversation_id === incomingMessage.conversation_id,
          );

          if (indexToUpdate !== -1) {
            const updatedContact = updatedContacts.splice(indexToUpdate, 1)[0];
            updatedContacts.unshift(updatedContact);
          }

          return updatedContacts;
        });
      },
    );

    return () => {
      liveUpdatesSocket?.off("incomingMessage");
    };
  }, []);

  const contactCards = contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.contact_id}
        conversation_id={contact.conversation_id}
        conversation_name={contact.conversation_name}
        contact_name={contact.contact_name}
        last_message={contact.last_message}
        contact_creation_date={contact.contact_creation_date}
      />
    );
  });

  return <div>{contactCards}</div>;
}
