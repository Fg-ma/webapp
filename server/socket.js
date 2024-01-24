const { Server } = require("socket.io");

function socket(server) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("togglePinned", (relation, relation_id, pinned, date_pinned) => {
      io.emit("pinnedUpdated", { relation, relation_id, pinned, date_pinned });
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
}

module.exports = { socket };