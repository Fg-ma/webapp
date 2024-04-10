import React, { createContext, useContext, useState } from "react";
import {
  ContactContextProviderProps,
  ContactContextType,
} from "@FgTypes/contextTypes";

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error(
      "useContactContext must be used within an ContactContextProvider",
    );
  }
  return context;
};

export function ContactContextProvider({
  children,
}: ContactContextProviderProps) {
  const [fluxContact, setFluxContact] = useState<{
    action: string;
    contact_id: string;
  }>({
    action: "",
    contact_id: "",
  });

  return (
    <ContactContext.Provider value={{ fluxContact, setFluxContact }}>
      {children}
    </ContactContext.Provider>
  );
}

export default ContactContext;
