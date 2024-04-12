import React, { createContext, useContext, useState } from "react";
import {
  ConversationContextProviderProps,
  ConversationContextType,
} from "@FgTypes/contextTypes";

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined,
);

export const useConversationContext = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversationContext must be used within an ConversationContextProvider",
    );
  }
  return context;
};

export function ConversationContextProvider({
  children,
}: ConversationContextProviderProps) {
  const [fluxConversation, setFluxConversation] = useState<{
    action: string;
    conversation_id: string;
  }>({
    action: "",
    conversation_id: "",
  });

  return (
    <ConversationContext.Provider
      value={{ fluxConversation, setFluxConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export default ConversationContext;
