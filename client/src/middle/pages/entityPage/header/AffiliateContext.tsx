// AffiliateContext.tsx
import React, { createContext, useContext, useState } from "react";

type AffiliateContextType = {
  affiliateRelation: any;
  setAffiliateRelation: React.Dispatch<React.SetStateAction<any>>;
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
  const [affiliateRelation, setAffiliateRelation] = useState<any>(null);

  return (
    <AffiliateContext.Provider
      value={{ affiliateRelation, setAffiliateRelation }}
    >
      {children}
    </AffiliateContext.Provider>
  );
};

export default AffiliateContext;
