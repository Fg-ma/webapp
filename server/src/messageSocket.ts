import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

export default function messageSocket(server: HttpServer) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: ["http://localhost:5000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on(
      "sendMessage",
      (message: string, sender: string, isUser: string) => {
        io.emit("newMessage", {
          content: message,
          sender: sender,
          isUser: isUser,
        });
      }
    );

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
}
