import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import io from "socket.io-client";
import config from "@config";
import { Message, ConverationId } from "@FgTypes/middleTypes";
import MessagesTextField from "./MessagesTextField";
import MessagesConversationBody from "./MessagesConversationBody";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

export default function MessagesPage() {
  const messageSocket = io(serverUrl);
  const [isMessagesPageOverflowing, setIsMessagesPageOverflowing] =
    useState(false);
  const [inputValue, setInputValue] = useState("");
  const conversationSize = useRef(3);
  const [conversation, setConversation] = useState<Message[]>([]);
  const MessagesPageRef = useRef<HTMLDivElement>(null);
  const conversation_id = useSelector(
    (state: ConverationId) => state.page.main.pagePayload.ids.conversation_id,
  );
  const [previousConversationId, setPreviousConversationId] = useState<
    string | null
  >(null);

  const joinConversation = (conversation_id: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    messageSocket.emit(
      "joinConversation",
      token,
      conversation_id,
      (response: any) => {
        if (response.error) {
          console.error("Error joining conversation:", response.error);
        }
      },
    );
  };

  const leaveConversation = (conversation_id: string) => {
    messageSocket.emit(
      "leaveConversation",
      conversation_id,
      (response: any) => {
        if (response.error) {
          console.error("Error leaving conversation:", response.error);
        }
      },
    );
  };

  useEffect(() => {
    if (previousConversationId) {
      leaveConversation(previousConversationId);
    }

    if (conversation_id) {
      joinConversation(conversation_id);
    }

    // Handle incoming messages from the server
    messageSocket.on("newMessage", (newMessage: Message) => {
      setConversation((prevConversation) => [...prevConversation, newMessage]);
    });

    const sortData = (data: any[]) => {
      const parseDate = (dateString: string | null) =>
        dateString
          ? new Date(dateString).getTime()
          : new Date("2000-01-01T01:01:01.000Z").getTime();

      data.sort(
        (a, b) => parseDate(b.message_date) - parseDate(a.message_date),
      );

      return [...data];
    };

    const fetchConversationData = async () => {
      try {
        const token = localStorage.getItem("token");

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

        setConversation(sortData(response.data));
      } catch (error) {
        console.error("Error fetching entity data:", error);
      }
    };

    fetchConversationData();

    setPreviousConversationId(conversation_id);
  }, [conversation_id]);

  // Establish socket connection
  useEffect(() => {
    messageSocket.on("connection", () => {
      return;
    });

    return () => {
      if (conversation_id) {
        leaveConversation(conversation_id);
      }
      messageSocket.off("newMessage");
      messageSocket.disconnect();
    };
  }, []);

  // Check if the child is overflowing
  useEffect(() => {
    if (!MessagesPageRef.current) return;

    setIsMessagesPageOverflowing(
      MessagesPageRef.current.scrollHeight >
        MessagesPageRef.current.clientHeight,
    );
  }, [inputValue]);

  // Set intial scroll to bottom
  useEffect(() => {
    if (!MessagesPageRef.current) return;

    MessagesPageRef.current.scrollTop = MessagesPageRef.current.scrollHeight;
  }, []);

  return (
    <div
      className={`w-full h-full ${
        isMessagesPageOverflowing ? "pr-3 pl-5" : "px-5"
      }`}
    >
      <div
        ref={MessagesPageRef}
        className="flex flex-col w-full h-full overflow-y-auto"
      >
        <MessagesConversationBody
          conversation={conversation}
          conversationSize={conversationSize.current}
        />
        <MessagesTextField
          inputValue={inputValue}
          conversation_id={conversation_id}
          setInputValue={setInputValue}
          messageSocket={messageSocket}
        />
      </div>
    </div>
  );
}
