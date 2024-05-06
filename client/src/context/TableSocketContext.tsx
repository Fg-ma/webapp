import React, { createContext, useContext, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import config from "@config";
import { TableSocketProviderProps } from "@FgTypes/contextTypes";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

const TableSocketContext = createContext<{
  tableSocket: Socket;
}>({
  tableSocket: io(serverUrl, {
    path: "/table-socket",
  }),
});

export const useTableSocketContext = () => {
  const context = useContext(TableSocketContext);
  if (!context) {
    throw new Error(
      "useTableSocketContext must be used within a TableSocketProvider",
    );
  }
  return context;
};

export function TableSocketProvider({ children }: TableSocketProviderProps) {
  const tableSocket = io(serverUrl, {
    path: "/table-socket",
  });

  useEffect(() => {
    tableSocket?.on("connection", () => {
      return;
    });

    return () => {
      tableSocket?.disconnect();
    };
  }, []);

  return (
    <TableSocketContext.Provider value={{ tableSocket }}>
      {children}
    </TableSocketContext.Provider>
  );
}

export default TableSocketContext;
