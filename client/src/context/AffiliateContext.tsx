import React, { createContext, useContext, useState } from "react";
import {
  AffiliateContextProviderProps,
  AffiliateContextType,
} from "@FgTypes/contextTypes";

const AffiliateContext = createContext<AffiliateContextType | undefined>(
  undefined,
);

export const useAffiliateContext = () => {
  const context = useContext(AffiliateContext);
  if (!context) {
    throw new Error(
      "useAffiliateContext must be used within an AffiliateContextProvider",
    );
  }
  return context;
};

export function AffiliateContextProvider({
  children,
}: AffiliateContextProviderProps) {
  const [affiliateRelation, setAffiliateRelation] = useState<{
    action: string;
    affiliate_username_root: string;
    affiliate_username_target: string;
    affiliate_relation_date: string;
    affiliate_relation_id: string;
    entity_type: number;
  }>({
    action: "",
    affiliate_username_root: "",
    affiliate_username_target: "",
    affiliate_relation_date: "",
    affiliate_relation_id: "",
    entity_type: 0,
  });

  return (
    <AffiliateContext.Provider
      value={{ affiliateRelation, setAffiliateRelation }}
    >
      {children}
    </AffiliateContext.Provider>
  );
}

export default AffiliateContext;
