import React, { createContext, useContext, useState } from "react";

type LastMessageContextType = {
  lastMessage: {
    conversation_id: string;
    last_message: string;
  };
  setLastMessage: React.Dispatch<
    React.SetStateAction<{
      conversation_id: string;
      last_message: string;
    }>
  >;
};

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

type LastMessageContextProviderProps = {
  children: React.ReactNode;
};

export const LastMessageContextProvider: React.FC<
  LastMessageContextProviderProps
> = ({ children }) => {
  const [lastMessage, setLastMessage] = useState<{
    conversation_id: string;
    last_message: string;
  }>({
    conversation_id: "",
    last_message: "",
  });

  return (
    <LastMessageContext.Provider value={{ lastMessage, setLastMessage }}>
      {children}
    </LastMessageContext.Provider>
  );
};

export default LastMessageContext;
