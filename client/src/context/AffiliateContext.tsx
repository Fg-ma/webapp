// AffiliateContext.tsx
import React, { createContext, useContext, useState } from "react";

type AffiliateContextType = {
  affiliateRelation: {
    action: string;
    affiliate_id_root: string;
    affiliate_id_target: string;
    affiliate_relation_date: string;
    affiliate_relation_id: string;
    entity_type: number;
  };
  setAffiliateRelation: React.Dispatch<
    React.SetStateAction<{
      action: string;
      affiliate_id_root: string;
      affiliate_id_target: string;
      affiliate_relation_date: string;
      affiliate_relation_id: string;
      entity_type: number;
    }>
  >;
};

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

type AffiliateContextProviderProps = {
  children: React.ReactNode;
};

export const AffiliateContextProvider: React.FC<
  AffiliateContextProviderProps
> = ({ children }) => {
  const [affiliateRelation, setAffiliateRelation] = useState<{
    action: string;
    affiliate_id_root: string;
    affiliate_id_target: string;
    affiliate_relation_date: string;
    affiliate_relation_id: string;
    entity_type: number;
  }>({
    action: "",
    affiliate_id_root: "",
    affiliate_id_target: "",
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
};

export default AffiliateContext;
