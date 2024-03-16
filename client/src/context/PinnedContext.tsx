import React, { createContext, useContext, useState } from "react";
import { PinnedProviderProps, PinnedContextType } from "@FgTypes/contextTypes";

const PinnedContext = createContext<PinnedContextType | undefined>(undefined);

export function usePinned() {
  const context = useContext(PinnedContext);
  if (!context) {
    throw new Error("usePinned must be used within a PinnedProvider");
  }
  return context;
}

export function PinnedProvider({ children }: PinnedProviderProps) {
  const [pinnedState, setPinnedState] = useState<{
    relation_id: string;
    type: string;
  }>({ relation_id: "", type: "" });

  return (
    <PinnedContext.Provider value={{ pinnedState, setPinnedState }}>
      {children}
    </PinnedContext.Provider>
  );
}
