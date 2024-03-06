import React, { createContext, useContext, useState } from "react";

interface PinnedContextType {
  pinnedState: { relation_id: string; type: string };
  setPinnedState: React.Dispatch<React.SetStateAction<any>>;
}

const PinnedContext = createContext<PinnedContextType | undefined>(undefined);

export function usePinned() {
  const context = useContext(PinnedContext);
  if (!context) {
    throw new Error("usePinned must be used within a PinnedProvider");
  }
  return context;
}

export function PinnedProvider({ children }: { children: React.ReactNode }) {
  const [pinnedState, setPinnedState] = useState<any>([]);

  return (
    <PinnedContext.Provider value={{ pinnedState, setPinnedState }}>
      {children}
    </PinnedContext.Provider>
  );
}
