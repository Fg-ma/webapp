import React, { useEffect, useLayoutEffect, useState } from "react";
import Axios from "axios";
import config from "@config";
import { useSocketContext } from "@context/LiveUpdatesContext";
import { Contact } from "@FgTypes/rightTypes";
import { ContactCard } from "./ContactCard";
import { useLastMessageContext } from "@context/LastMessageContext";
import { useContactContext } from "@context/ContactContext";
import { useIndexedDBContext } from "@context/IDBContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Contacts() {
  const { liveUpdatesSocket } = useSocketContext();
  const { lastMessage } = useLastMessageContext();
  const { fluxContact, setFluxContact } = useContactContext();
  const { storeContacts, getStoredContacts, deleteStoredContacts } =
    useIndexedDBContext();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [newContact, setNewContact] = useState<Contact>();

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
      const storedContacts = await getStoredContacts();

      if (storedContacts.length === 0) {
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

          const sortedData = sortData(response.data);

          setContacts(sortedData);
          setNewContact(undefined);
          await storeContacts(sortedData);
        } catch (error) {
          console.error("Error fetching entity data:", error);
        }
      } else {
        setContacts(storedContacts);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchNewContact = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/contacts/get_contact_by_contact_id`,
          {
            params: {
              contact_id: fluxContact.contact_id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const newContact = { ...response.data, animate: true };

        setNewContact(newContact);

        const storingContacts: Contact[] = contacts.map((contact) => ({
          ...contact,
          animate: false,
        }));

        await deleteStoredContacts();
        await storeContacts([
          { ...response.data, animate: true },
          ...storingContacts,
        ]);
      } catch (error) {
        console.error("Error fetching Contact data:", error);
      }
    };

    const deleteOldContact = async () => {
      const newContacts = contacts.filter(
        (contact) => contact.contact_id !== fluxContact.contact_id,
      );

      setContacts(newContacts);

      await deleteStoredContacts();
      await storeContacts(newContacts);
    };

    if (fluxContact?.action === "newContact") {
      fetchNewContact();
      setFluxContact({
        action: "",
        contact_id: "",
      });
    } else if (fluxContact?.action === "deletedRelation") {
      deleteOldContact();
      setFluxContact({
        action: "",
        contact_id: "",
      });
    }
  }, [fluxContact]);

  useEffect(() => {
    if (lastMessage.conversation_id === "") {
      return;
    }

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

  let newContactCard;
  if (newContact) {
    const foundContact = contacts.find(
      (contact) => contact.contact_id === newContact.contact_id,
    );
    if (!foundContact) {
      newContactCard = (
        <ContactCard
          key={newContact.contact_id}
          entity_username={newContact.contact_username_target}
          animate={newContact.animate}
          conversation_id={newContact.conversation_id}
          conversation_name={newContact.conversation_name}
          contact_name={newContact.contact_name}
          last_message={newContact.last_message}
          contact_creation_date={newContact.contact_creation_date}
        />
      );
    }
  }

  const contactCards = contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.contact_id}
        entity_username={contact.contact_username_target}
        conversation_id={contact.conversation_id}
        conversation_name={contact.conversation_name}
        contact_name={contact.contact_name}
        last_message={contact.last_message}
        contact_creation_date={contact.contact_creation_date}
      />
    );
  });

  return (
    <div>
      {newContactCard}
      {contactCards}
    </div>
  );
}
