import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Axios from "axios";
import config from "@config";
import { Message, Typing, TablesPageState } from "@FgTypes/middleTypes";
import TableConversationHeader from "./TableConversationHeader";
import UserBubble from "@components/messagingBubbles/UserBubble";
import RecipientsBubbles from "@components/messagingBubbles/RecipientsBubbles";
import { useSelector } from "react-redux";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function TableConversation() {
  const tableSocket = io(serverUrl, {
    path: "/table-socket",
  });
  const table_id = useSelector(
    (state: TablesPageState) => state.page.main.pagePayload.ids.table_id,
  );
  const [tableConversation, setTableConversation] = useState<Message[]>([]);
  const [typing, setTyping] = useState<Typing[]>([]);
  const [tableConversationContent, setTableConversationContent] = useState<
    React.JSX.Element[]
  >([]);
  const [typingBubbles, setTypingBubbles] = useState<
    (JSX.Element | undefined)[]
  >([]);
  const tableSize = useRef(2);
  const token = localStorage.getItem("token");

  const joinTable = (table_id: string) => {
    if (!token) {
      return;
    }

    tableSocket.emit("joinTable", token, table_id);
  };

  const leaveTable = (table_id: string) => {
    if (!token) {
      return;
    }

    tableSocket.emit("leaveTable", token, table_id);
  };

  const sortData = (data: Message[]) => {
    const parseDate = (dateString: string | null) =>
      dateString
        ? new Date(dateString).getTime()
        : new Date("2000-01-01T01:01:01.000Z").getTime();

    data.sort((a, b) => parseDate(a.message_date) - parseDate(b.message_date));

    return [...data];
  };

  // Establish socket connection
  useEffect(() => {
    tableSocket.on("connection", () => {
      return;
    });

    return () => {
      tableSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    setTyping([]);
    setTypingBubbles([]);
    setTableConversation([]);
    setTableConversationContent([]);

    if (table_id) {
      joinTable(table_id);
    }

    // Handle incoming messages from the server
    tableSocket.on("newMessage", async (newMessage: Message) => {
      if (!token) {
        return;
      }

      const response = await Axios.get(`${serverUrl}/tables/isUser`, {
        params: {
          sender: newMessage.sender,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const message = {
        content: newMessage.content,
        sender: newMessage.sender,
        isUser: response.data.isUser,
        message_date: newMessage.message_date,
      };

      setTableConversation((prevTableConversation) => [
        ...prevTableConversation,
        message,
      ]);
    });

    // Handle typing changes
    tableSocket.on("typingStatusChange", async (typingStatus: Typing) => {
      if (typingStatus.typing) {
        setTyping((prev) => {
          let matchedSender = false;
          for (const i in prev) {
            if (prev[i].sender === typingStatus.sender) {
              matchedSender = true;
            }
          }

          if (matchedSender) {
            return prev;
          } else {
            return [...prev, typingStatus];
          }
        });
      } else if (!typingStatus.typing) {
        setTyping((prev) => {
          let matchedSender = false;
          let matchedIndex;
          for (const i in prev) {
            if (prev[i].sender === typingStatus.sender) {
              matchedSender = true;
              matchedIndex = parseInt(i);
            }
          }

          if (matchedSender && matchedIndex !== undefined) {
            let returningTyping = prev
              .slice(0, matchedIndex)
              .concat(prev.slice(matchedIndex + 1));

            return returningTyping;
          }
          return prev;
        });
      }
    });

    const fetchTableConversationData = async () => {
      try {
        if (!token) {
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/tables/table_conversation_by_table_id`,
          {
            params: {
              table_id: table_id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        tableSize.current = response.data.tableSize;
        setTableConversation(sortData(response.data.tableConversation));
      } catch (error) {
        console.error("Error fetching table conversation data:", error);
      }
    };

    if (table_id) {
      fetchTableConversationData();
    }

    return () => {
      if (table_id) {
        leaveTable(table_id);
      }
      tableSocket.off("newMessage");
      tableSocket.off("typingStatusChange");
    };
  }, [table_id]);

  useEffect(() => {
    const fetchTypingData = async () => {
      const typingPromises = typing.map(async (type) => {
        let isUser = false;

        if (!token) {
          return;
        }

        try {
          const response = await Axios.get(`${serverUrl}/auth/isUser`, {
            params: {
              target: type.sender,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          isUser = response.data;
        } catch (error) {
          isUser = false;
        }

        if (!isUser) {
          return (
            <RecipientsBubbles
              key={`typing_bubble_${type.sender}`}
              message={"typing"}
              conversationSize={tableSize.current}
              sender={type.sender}
            />
          );
        } else {
          return;
        }
      });

      const resolvedTypingBubbles = await Promise.all(typingPromises);

      setTypingBubbles(resolvedTypingBubbles);
    };

    fetchTypingData();
  }, [token, typing, tableSize]);

  useEffect(() => {
    const renderContent = () => {
      return tableConversation.map((message, index) => {
        if (message.isUser) {
          return <UserBubble key={index} message={message.content} />;
        } else {
          return (
            <RecipientsBubbles
              key={index}
              message={message.content}
              conversationSize={tableSize.current}
              sender={message.sender}
            />
          );
        }
      });
    };

    setTableConversationContent(renderContent());
  }, [tableConversation]);

  return (
    <div className="w-full grow flex flex-col items-center justify-start pt-10 pl-9 pb-8">
      <TableConversationHeader />
      {tableConversationContent}
      {typingBubbles}
    </div>
  );
}
