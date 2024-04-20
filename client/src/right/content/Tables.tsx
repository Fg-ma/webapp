import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import config from "@config";
import { useSocketContext } from "@context/LiveUpdatesContext";
import { useLastMessageContext } from "@context/LastMessageContext";
import { useIndexedDBContext } from "@context/IDBContext";
import { useTableContext } from "@context/TableContext";
import { TableCard } from "./TableCard";
import { IncomingMessage, RightFilterState, Table } from "@FgTypes/rightTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function Tables() {
  const { liveUpdatesSocket } = useSocketContext();
  const { lastMessage } = useLastMessageContext();
  const { fluxTable, setFluxTable } = useTableContext();
  const { storeTable, storeTables, getStoredTables, deleteStoredTables } =
    useIndexedDBContext();
  //const filter = useSelector(
  //  (state: RightFilterState) =>
  //    state.filters.conversations.filterPayload.value,
  //);
  const [tables, setTables] = useState<Table[]>([]);
  //const [filterConversations, setFilterConversations] = useState<
  //  Conversation[]
  //>([]);
  //const [noFilteredMatchesFound, setNoFilteredMatchesFound] = useState(false);
  const [newTable, setNewTable] = useState<Table>();

  const sortData = (data: Table[]) => {
    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    const sortedData = [...data];

    sortedData.sort((a, b) => {
      if (a.last_message_date !== null && b.last_message_date !== null) {
        return parseDate(b.last_message_date) - parseDate(a.last_message_date);
      } else if (a.last_message_date !== null && b.last_message_date === null) {
        return (
          parseDate(b.table_creation_date) - parseDate(a.last_message_date)
        );
      } else if (a.last_message_date === null && b.last_message_date !== null) {
        return (
          parseDate(b.last_message_date) - parseDate(a.table_creation_date)
        );
      } else {
        return (
          parseDate(b.table_creation_date) - parseDate(a.table_creation_date)
        );
      }
    });

    return [...sortedData];
  };

  useEffect(() => {
    const fetchTables = async () => {
      const storedTables = await getStoredTables();

      if (storedTables.length === 0) {
        try {
          const token = localStorage.getItem("token");

          if (!token) {
            return;
          }

          const response = await Axios.get(`${serverUrl}/tables/user_tables`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const sortedData = sortData(response.data);

          setTables(sortedData);
          await storeTables(sortedData);
        } catch (error) {
          console.error("Error fetching tables data:", error);
        }
      } else {
        setTables(sortData(storedTables));
      }
    };

    fetchTables();
  }, []);

  // Handles filtering tables
  //useEffect(() => {
  //  if (!filter) {
  //    setNoFilteredMatchesFound(false);
  //    setFilterConversations([]);
  //    return;
  //  }
  //
  //  const lowerCaseFilter = filter.toLowerCase();
  //
  //  let allConversations = conversations;
  //  if (newConversation) {
  //    allConversations = [newConversation, ...conversations];
  //  }
  //
  //  const filteredConversations = allConversations.filter((conversation) => {
  //    let last_message = conversation.last_message?.toLowerCase();
  //    if (conversation.last_message?.toLowerCase().includes("\n")) {
  //      last_message = conversation.last_message?.toLowerCase().split("\n")[0];
  //    }
  //
  //    if (last_message?.includes(lowerCaseFilter)) {
  //      return true;
  //    }
  //
  //    if (
  //      conversation.conversation_name?.toLowerCase().includes(lowerCaseFilter)
  //    ) {
  //      return true;
  //    }
  //
  //    for (const memberIndex in conversation.members) {
  //      const individualData =
  //        conversation.members[memberIndex].individual_data;
  //      if (individualData) {
  //        if (individualData.individual_name) {
  //          if (
  //            individualData.individual_name
  //              .toLowerCase()
  //              .includes(lowerCaseFilter)
  //          ) {
  //            return true;
  //          }
  //        } else {
  //          if (
  //            individualData.individual_username
  //              .toLowerCase()
  //              .includes(lowerCaseFilter)
  //          ) {
  //            return true;
  //          }
  //        }
  //      }
  //
  //      const groupData = conversation.members[memberIndex].group_data;
  //      if (groupData) {
  //        if (groupData.group_name) {
  //          if (groupData.group_name.toLowerCase().includes(lowerCaseFilter)) {
  //            return true;
  //          }
  //        } else {
  //          if (
  //            groupData.group_handle.toLowerCase().includes(lowerCaseFilter)
  //          ) {
  //            return true;
  //          }
  //        }
  //      }
  //
  //      const organizationData =
  //        conversation.members[memberIndex].organization_data;
  //      if (organizationData) {
  //        if (organizationData.organization_name) {
  //          if (
  //            organizationData.organization_name
  //              .toLowerCase()
  //              .includes(lowerCaseFilter)
  //          ) {
  //            return true;
  //          }
  //        } else {
  //          if (
  //            organizationData.organization_handle
  //              .toLowerCase()
  //              .includes(lowerCaseFilter)
  //          ) {
  //            return true;
  //          }
  //        }
  //      }
  //    }
  //
  //    return false;
  //  });
  //
  //  if (filterConversations.length === 0) {
  //    setNoFilteredMatchesFound(true);
  //  }
  //
  //  setFilterConversations(filteredConversations);
  //}, [filter]);

  // Handles adding and removing new tables
  useEffect(() => {
    const fetchNewConversation = async () => {
      const storedConversations = await getStoredConversations();

      if (storedConversations.length !== 0) {
        try {
          const token = localStorage.getItem("token");

          if (!token) {
            console.error("Token not found in local storage");
            return;
          }

          const response = await Axios.get(
            `${serverUrl}/conversations/get_conversation_by_conversation_id`,
            {
              params: {
                conversation_id: fluxConversation.conversation_id,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const newConversation = { ...response.data, animate: true };

          setNewConversation(newConversation);

          await storeConversation({ ...response.data, animate: false });
        } catch (error) {
          console.error("Error fetching Conversation data:", error);
        }
      }
    };

    const deleteOldConversation = async () => {
      const newConversations = conversations.filter(
        (conversation) =>
          conversation.conversation_id !== fluxConversation.conversation_id,
      );

      setConversations(newConversations);

      await deleteStoredConversations();
      await storeConversations(newConversations);
    };

    if (fluxConversation?.action === "newConversation") {
      fetchNewConversation();
      setFluxConversation({
        action: "",
        conversation_id: "",
      });
    } else if (fluxConversation?.action === "deletedConversation") {
      deleteOldConversation();
      setFluxConversation({
        action: "",
        conversation_id: "",
      });
    }
  }, [fluxConversation]);

  // Update last message and message position
  useEffect(() => {
    const updatedTables = tables.map((table) => {
      if (table.table_id === lastMessage.table.table_id) {
        return {
          ...table,
          last_message: lastMessage.table.last_message,
        };
      }
      return table;
    });

    const indexToUpdate = updatedTables.findIndex(
      (table) => table.table_id === lastMessage.table.table_id,
    );

    if (indexToUpdate !== -1) {
      const updatedTable = updatedTables.splice(indexToUpdate, 1)[0];
      updatedTables.unshift(updatedTable);
    }

    setTables(updatedTables);
  }, [lastMessage]);

  // Establish incomingMessage live update socket connection
  useEffect(() => {
    const asyncStoreTables = async (tables: Table[]) => {
      await deleteStoredTables();
      await storeTables(tables);
    };

    liveUpdatesSocket?.on(
      "incomingMessage",
      (incomingMessage: IncomingMessage) => {
        if (newTable) {
          setNewTable((prevTable) => {
            if (prevTable?.table_id === incomingMessage.table.table_id) {
              const updatedTable = {
                ...prevTable,
                last_message: incomingMessage.table.content,
              };
              asyncStoreTables([updatedTable, ...tables]);
              return updatedTable;
            }
          });
        }

        setTables((prevTables) => {
          const updatedTables = prevTables.map((table) => {
            if (table.table_id === incomingMessage.table.table_id) {
              return {
                ...table,
                last_message: incomingMessage.table.content,
              };
            }
            return table;
          });

          const indexToUpdate = updatedTables.findIndex(
            (table) => table.table_id === incomingMessage.table.table_id,
          );

          if (indexToUpdate !== -1) {
            const updatedTable = updatedTables.splice(indexToUpdate, 1)[0];
            updatedTables.unshift(updatedTable);
          }

          asyncStoreTables(updatedTables);
          return updatedTables;
        });
      },
    );

    return () => {
      liveUpdatesSocket?.off("incomingMessage");
    };
  }, []);

  let newTableCard;
  if (newTable) {
    const foundTable = tables.find(
      (table) => table.table_id === newTable.table_id,
    );
    if (!foundTable) {
      newTableCard = (
        <TableCard
          key={newTable.table_id}
          table_id={newTable.table_id}
          table_name={newTable.table_name}
          last_message={newTable.last_message}
          members={newTable.members}
          table_creation_date={newTable.table_creation_date}
          tables_pictures_id={newTable.tables_pictures_id}
        />
      );
    }
  }

  //const filteredConversationsCards = filterConversations.map((conversation) => {
  //  return (
  //    <ConversationCard
  //      key={conversation.conversation_id}
  //      conversation_id={conversation.conversation_id}
  //      conversation_name={conversation.conversation_name}
  //      last_message={conversation.last_message}
  //      members={conversation.members}
  //      conversation_creation_date={conversation.conversation_creation_date}
  //      conversations_pictures_id={conversation.conversations_pictures_id}
  //      filter={filter}
  //    />
  //  );
  //});

  const tablesCards = tables.map((table) => {
    return (
      <TableCard
        key={table.table_id}
        table_id={table.table_id}
        table_name={table.table_name}
        last_message={table.last_message}
        members={table.members}
        table_creation_date={table.table_creation_date}
        tables_pictures_id={table.tables_pictures_id}
      />
    );
  });

  return <div>{tablesCards}</div>;
}

//{filteredConversationsCards}
//      {!noFilteredMatchesFound &&
//        filteredConversationsCards.length === 0 &&
//        newConversationCard}
//      {!noFilteredMatchesFound &&
//        filteredConversationsCards.length === 0 &&
//        conversationsCards}
