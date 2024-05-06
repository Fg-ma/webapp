import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import config from "@config";
import { useLiveUpdatesSocketContext } from "@context/LiveUpdatesSocketContext";
import {
  Contact,
  IncomingMessage,
  RightFilterState,
} from "@FgTypes/rightTypes";
import { ContactCard } from "./ContactCard";
import { useLastMessageContext } from "@context/LastMessageContext";
import { useContactContext } from "@context/ContactContext";
import { useIndexedDBContext } from "@context/IDBContext";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Contacts() {
  const { liveUpdatesSocket } = useLiveUpdatesSocketContext();
  const { lastMessage } = useLastMessageContext();
  const { fluxContact, setFluxContact } = useContactContext();
  const {
    storeContact,
    storeContacts,
    getStoredContacts,
    deleteStoredContacts,
  } = useIndexedDBContext();
  const filter = useSelector(
    (state: RightFilterState) => state.filters.contacts.filterPayload.value,
  );
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filterContacts, setFilterContacts] = useState<Contact[]>([]);
  const [noFilteredMatchesFound, setNoFilteredMatchesFound] = useState(false);
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
          await storeContacts(sortedData);
        } catch (error) {
          console.error("Error fetching contacts data:", error);
        }
      } else {
        setContacts(sortData(storedContacts));
      }
    };

    fetchContacts();
  }, []);

  // Handles filtering contacts
  useEffect(() => {
    if (!filter) {
      setNoFilteredMatchesFound(false);
      setFilterContacts([]);
      return;
    }

    const lowerCaseFilter = filter.toLowerCase();

    let allContacts = contacts;
    if (newContact) {
      allContacts = [newContact, ...contacts];
    }

    const filteredContacts = allContacts.filter((contact) => {
      let last_message = contact.last_message?.toLowerCase();
      if (contact.last_message?.toLowerCase().includes("\n")) {
        last_message = contact.last_message?.toLowerCase().split("\n")[0];
      }

      if (last_message?.includes(lowerCaseFilter)) {
        return true;
      }

      if (contact.contact_name?.toLowerCase().includes(lowerCaseFilter)) {
        return true;
      }

      return false;
    });

    if (filteredContacts.length === 0) {
      setNoFilteredMatchesFound(true);
    }

    setFilterContacts(filteredContacts);
  }, [filter]);

  // Handles adding and removing new contacts
  useEffect(() => {
    const fetchNewContact = async () => {
      const storedContacts = await getStoredContacts();

      if (storedContacts.length !== 0) {
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

          await storeContact({ ...response.data, animate: false });
        } catch (error) {
          console.error("Error fetching Contact data:", error);
        }
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
    } else if (fluxContact?.action === "deletedContact") {
      deleteOldContact();
      setFluxContact({
        action: "",
        contact_id: "",
      });
    }
  }, [fluxContact]);

  // Update last message and message position
  useEffect(() => {
    if (lastMessage.conversation.conversation_id === "") {
      return;
    }

    const updatedContacts = contacts.map((contact) => {
      if (
        contact.conversation_id === lastMessage.conversation.conversation_id
      ) {
        return {
          ...contact,
          last_message: lastMessage.conversation.last_message,
        };
      }
      return contact;
    });

    const indexToUpdate = updatedContacts.findIndex(
      (contact) =>
        contact.conversation_id === lastMessage.conversation.conversation_id,
    );

    if (indexToUpdate !== -1) {
      const updatedContact = updatedContacts.splice(indexToUpdate, 1)[0];
      updatedContacts.unshift(updatedContact);
    }

    setContacts(updatedContacts);
  }, [lastMessage]);

  // Establish incomingMessage live update socket connection
  useEffect(() => {
    const asyncStoreContacts = async (contacts: Contact[]) => {
      await deleteStoredContacts();
      await storeContacts(contacts);
    };

    liveUpdatesSocket?.on(
      "incomingMessage",
      (incomingMessage: IncomingMessage) => {
        if (newContact) {
          setNewContact((prevContact) => {
            if (
              prevContact?.conversation_id ===
              incomingMessage.conversation.conversation_id
            ) {
              const updatedContact = {
                ...prevContact,
                last_message: incomingMessage.conversation.content,
              };
              asyncStoreContacts([updatedContact, ...contacts]);
              return updatedContact;
            }
          });
        }

        setContacts((prevContacts) => {
          const updatedContacts = prevContacts.map((contact) => {
            if (
              contact.conversation_id ===
              incomingMessage.conversation.conversation_id
            ) {
              return {
                ...contact,
                last_message: incomingMessage.conversation.content,
              };
            }
            return contact;
          });

          const indexToUpdate = updatedContacts.findIndex(
            (contact) =>
              contact.conversation_id ===
              incomingMessage.conversation.conversation_id,
          );

          if (indexToUpdate !== -1) {
            const updatedContact = updatedContacts.splice(indexToUpdate, 1)[0];
            updatedContacts.unshift(updatedContact);
          }

          asyncStoreContacts(updatedContacts);
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
          entity_type={newContact.entity_type}
          animate={newContact.animate}
          conversation_id={newContact.conversation_id}
          conversation_name={newContact.conversation_name}
          contact_name={newContact.contact_name}
          last_message={newContact.last_message}
          contact_creation_date={newContact.contact_creation_date}
          contacts_pictures_id={newContact.contacts_pictures_id}
        />
      );
    }
  }

  const filteredContactsCards = filterContacts.map((contact) => {
    return (
      <ContactCard
        key={contact.contact_id}
        entity_username={contact.contact_username_target}
        entity_type={contact.entity_type}
        conversation_id={contact.conversation_id}
        conversation_name={contact.conversation_name}
        contact_name={contact.contact_name}
        last_message={contact.last_message}
        contact_creation_date={contact.contact_creation_date}
        contacts_pictures_id={contact.contacts_pictures_id}
        filter={filter}
      />
    );
  });

  const contactsCards = contacts.map((contact) => {
    return (
      <ContactCard
        key={contact.contact_id}
        entity_username={contact.contact_username_target}
        entity_type={contact.entity_type}
        conversation_id={contact.conversation_id}
        conversation_name={contact.conversation_name}
        contact_name={contact.contact_name}
        last_message={contact.last_message}
        contact_creation_date={contact.contact_creation_date}
        contacts_pictures_id={contact.contacts_pictures_id}
      />
    );
  });

  return (
    <div className="my-4 ml-9 flex flex-col space-y-4">
      {filteredContactsCards}
      {!noFilteredMatchesFound &&
        filteredContactsCards.length === 0 &&
        newContactCard}
      {!noFilteredMatchesFound &&
        filteredContactsCards.length === 0 &&
        contactsCards}
    </div>
  );
}
