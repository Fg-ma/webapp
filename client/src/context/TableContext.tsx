import React, { createContext, useContext, useState } from "react";
import {
  TableContextProviderProps,
  TableContextType,
} from "@FgTypes/contextTypes";

const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error(
      "useTableContext must be used within an TableContextProvider",
    );
  }
  return context;
};

export function TableContextProvider({ children }: TableContextProviderProps) {
  const [fluxTable, setFluxTable] = useState<{
    action: string;
    table_id: string;
  }>({
    action: "",
    table_id: "",
  });

  return (
    <TableContext.Provider value={{ fluxTable, setFluxTable }}>
      {children}
    </TableContext.Provider>
  );
}

export default TableContext;
