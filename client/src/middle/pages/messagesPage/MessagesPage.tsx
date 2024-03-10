import React, { useState, useEffect, useRef } from "react";
import config from "@config";
import { Message } from "@FgTypes/middleTypes";
import MessagesTextField from "./MessagesTextField";
import MessagesConversationBody from "./MessagesConversationBody";
import io from "socket.io-client";

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

  // Establish socket connection
  useEffect(() => {
    messageSocket.on("connection", () => {
      console.log("Connected to socket server");
    });

    // Handle incoming messages from the server
    messageSocket.on("newMessage", (newMessage: Message) => {
      setConversation((prevConversation) => [...prevConversation, newMessage]);
    });

    return () => {
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
          setInputValue={setInputValue}
          messageSocket={messageSocket}
        />
      </div>
    </div>
  );
}
