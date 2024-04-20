import React, { createContext, useContext, useState } from "react";
import {
  LastMessageContextProviderProps,
  LastMessageContextType,
} from "@FgTypes/contextTypes";

const LastMessageContext = createContext<LastMessageContextType | undefined>(
  undefined,
);

export const useLastMessageContext = () => {
  const context = useContext(LastMessageContext);
  if (!context) {
    throw new Error(
      "useLastMessageContext must be used within an LastMessageContextProvider",
    );
  }
  return context;
};

export function LastMessageContextProvider({
  children,
}: LastMessageContextProviderProps) {
  const [lastMessage, setLastMessage] = useState<{
    conversation: {
      conversation_id: string | null;
      last_message: string | null;
    };
    table: {
      table_id: string | null;
      last_message: string | null;
    };
  }>({
    conversation: {
      conversation_id: "",
      last_message: "",
    },
    table: {
      table_id: "",
      last_message: "",
    },
  });

  return (
    <LastMessageContext.Provider value={{ lastMessage, setLastMessage }}>
      {children}
    </LastMessageContext.Provider>
  );
}

export default LastMessageContext;
