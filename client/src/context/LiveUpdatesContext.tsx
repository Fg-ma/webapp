import React, { createContext, useContext, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import config from "@config";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

const LiveUpdatesSocketContext = createContext<{
  liveUpdatesSocket: Socket | null;
}>({
  liveUpdatesSocket: null,
});

export const useSocketContext = () => {
  const context = useContext(LiveUpdatesSocketContext);
  if (!context) {
    throw new Error("usePinned must be used within a PinnedProvider");
  }
  return context;
};

export function LiveUpdatesSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const liveUpdatesSocket = io(serverUrl, {
    path: "/live-updates-socket",
  });

  useEffect(() => {
    liveUpdatesSocket?.on("connection", () => {
      return;
    });

    return () => {
      liveUpdatesSocket?.disconnect();
    };
  }, []);

  return (
    <LiveUpdatesSocketContext.Provider value={{ liveUpdatesSocket }}>
      {children}
    </LiveUpdatesSocketContext.Provider>
  );
}
