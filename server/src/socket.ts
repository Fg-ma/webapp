import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

function socket(server: HttpServer) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:5000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("togglePinned", (relation, relation_id, pinned, date_pinned) => {
      io.emit("pinnedUpdated", {
        relation,
        relation_id,
        pinned,
        date_pinned,
      });
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
}

export default socket;
