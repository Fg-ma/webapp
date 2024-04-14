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
    path: "/message-socket",
    cors: {
      origin: ["http://localhost:5000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on(
      "sendMessage",
      async (token: string, conversation_id: string, message: string) => {
        const isInConversation = await verifyUser(token, conversation_id);
        const user = jwt.verify(token, process.env.TOKEN_KEY as Secret);
        const message_date = new Date().toISOString();

        if (isInConversation && typeof user !== "string") {
          io.to(conversation_id).emit("newMessage", {
            content: message,
            sender: user.username,
            message_date: message_date,
          });
        } else {
          console.log("Authorization denied");
        }
      }
    );

    socket.on(
      "typing",
      async (token: string, conversation_id: string, typing: boolean) => {
        const isInConversation = await verifyUser(token, conversation_id);
        const user = jwt.verify(token, process.env.TOKEN_KEY as Secret);

        if (isInConversation && typeof user !== "string") {
          io.to(conversation_id).emit("typingStatusChange", {
            typing: typing,
            sender: user.username,
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
      } else {
        console.log("Authorization denied");
      }
    });

    socket.on("leaveConversation", (conversation_id) => {
      socket.leave(conversation_id);
    });

    socket.on("disconnect", () => {
      return;
    });
  });
}
