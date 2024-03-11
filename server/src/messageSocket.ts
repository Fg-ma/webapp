import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { prisma } from "./prismaMiddleware";
import jwt, { Secret } from "jsonwebtoken";

const verifyUser = async (token: string, conversation_id: string) => {
  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY as Secret);

    const conversationMembers = await prisma.conversations_members.findMany({
      where: {
        conversation_id: conversation_id,
      },
    });

    let isInConversation = false;

    if (typeof user !== "string") {
      isInConversation = conversationMembers.some(
        (member) => member.member_id === user.user_id
      );
    }

    return isInConversation;
  } catch (error) {
    return false;
  }
};

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
      async (
        token: string,
        conversation_id: string,
        message: string,
        sender: string,
        isUser: string
      ) => {
        const isInConversation = await verifyUser(token, conversation_id);

        if (isInConversation) {
          io.to(conversation_id).emit("newMessage", {
            content: message,
            sender: sender,
            isUser: isUser,
          });
        } else {
          console.log("Authorization denied");
        }
      }
    );

    socket.on("joinConversation", async (token, conversation_id) => {
      const isInConversation = await verifyUser(token, conversation_id);

      if (isInConversation) {
        socket.join(conversation_id);
        console.log(`${socket.id} joined room: ${conversation_id}`);
      } else {
        console.log("Authorization denied");
      }
    });

    socket.on("leaveConversation", (conversation_id) => {
      socket.leave(conversation_id);
      console.log(`${socket.id} left room: ${conversation_id}`);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
}
