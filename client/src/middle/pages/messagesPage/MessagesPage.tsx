import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import io from "socket.io-client";
import config from "@config";
import {
  Message,
  ConverationId,
  MessagePageProps,
  Typing,
} from "@FgTypes/middleTypes";
import MessagesTextField from "./MessagesTextField";
import MessagesConversationBody from "./MessagesConversationBody";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function MessagesPage({ middleSpaceRef }: MessagePageProps) {
  const messageSocket = io(serverUrl, {
    path: "/message-socket",
  });
  const [conversation, setConversation] = useState<Message[]>([]);
  const [textFieldSnap, setTextFieldSnap] = useState(true);
  const [previousConversationId, setPreviousConversationId] = useState<
    string | null
  >(null);
  const conversationSize = useRef(2);
  const messagesPageRef = useRef<HTMLDivElement>(null);
  const conversation_id = useSelector(
    (state: ConverationId) => state.page.main.pagePayload.ids.conversation_id,
  );
  const [typing, setTyping] = useState<Typing[]>([]);
  const token = localStorage.getItem("token");

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
    messageSocket.on("connection", () => {
      return;
    });

    return () => {
      messageSocket.disconnect();
    };
  }, []);

  const joinConversation = (conversation_id: string) => {
    if (!token) {
      return;
    }

    messageSocket.emit("joinConversation", token, conversation_id);
  };

  const leaveConversation = (conversation_id: string) => {
    if (!token) {
      return;
    }

    messageSocket.emit("leaveConversation", token, conversation_id);
  };

  useEffect(() => {
    if (previousConversationId) {
      leaveConversation(previousConversationId);
    }

    if (conversation_id) {
      joinConversation(conversation_id);
    }

    // Handle incoming messages from the server
    messageSocket.on("newMessage", async (newMessage: Message) => {
      if (!token) {
        return;
      }
      const response = await Axios.get(`${serverUrl}/conversations/isUser`, {
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

      setConversation((prevConversation) => [...prevConversation, message]);
    });

    // Handle typing changes
    messageSocket.on("typingStatusChange", async (typingStatus: Typing) => {
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

    const fetchConversationData = async () => {
      try {
        if (!token) {
          return;
        }

        const response = await Axios.get(
          `${serverUrl}/conversations/conversation_by_conversation_id`,
          {
            params: {
              conversation_id: conversation_id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        conversationSize.current = response.data.conversationSize;
        setConversation(sortData(response.data.conversation));
      } catch (error) {
        console.error("Error fetching entity data:", error);
      }
    };

    if (conversation_id) {
      fetchConversationData();
    }

    setPreviousConversationId(conversation_id);

    return () => {
      if (conversation_id) {
        leaveConversation(conversation_id);
      }
      messageSocket.off("newMessage");
      messageSocket.off("typingStatusChange");
    };
  }, [conversation_id]);

  // Set intial scroll to bottom
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!messagesPageRef.current) return;
      messagesPageRef.current.scrollTop = messagesPageRef.current.scrollHeight;
      handleScroll();
    }, 50);

    return () => clearTimeout(timeout);
  }, [conversation_id]);

  const handleScroll = () => {
    if (!messagesPageRef.current || !middleSpaceRef.current) return;

    if (
      messagesPageRef.current.scrollTop >=
      messagesPageRef.current.scrollHeight -
        middleSpaceRef.current.clientHeight -
        32
    ) {
      setTextFieldSnap(true);
    } else {
      setTextFieldSnap(false);
    }
  };

  // Handles snapping the MessageTextField component
  useEffect(() => {
    messagesPageRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      messagesPageRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={messagesPageRef}
      className={`flex flex-col pl-9 w-full h-full overflow-y-auto overflow-x-hidden items-center ${
        !textFieldSnap && "pb-30"
      }`}
      style={{
        scrollbarGutter: "stable",
      }}
    >
      <MessagesConversationBody
        conversation={conversation}
        conversationSize={conversationSize.current}
        typing={typing}
      />
      <MessagesTextField
        conversation_id={conversation_id}
        messageSocket={messageSocket}
        messagesPageRef={messagesPageRef}
        textFieldSnap={textFieldSnap}
      />
    </div>
  );
}
