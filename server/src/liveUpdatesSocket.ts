import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { prisma } from "./prismaMiddleware";
import jwt, { Secret } from "jsonwebtoken";
import { ConversationMember, Entity } from "@FgTypes/types";

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

export default function liveUpdatesSocket(server: HttpServer) {
  const io = new SocketIOServer(server, {
    path: "/live-updates-socket",
    cors: {
      origin: ["http://localhost:5000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on(
      "outgoingMessage",
      async (token: string, conversation_id: string, message: string) => {
        const isInConversation = await verifyUser(token, conversation_id);
        const user = jwt.verify(token, process.env.TOKEN_KEY as Secret);

        if (isInConversation && typeof user !== "string") {
          const recipients: ConversationMember[] =
            await prisma.conversations_members.findMany({
              where: {
                conversation_id: conversation_id,
              },
            });

          const validRecipients = recipients.filter(
            (recipient) => recipient.member_id !== user.user_id
          );

          const validRecipientIds = validRecipients.map(
            (recipient) => recipient.member_id
          );

          const entities: Entity[] = await prisma.entities.findMany({
            where: {
              entity_id: { in: validRecipientIds },
            },
          });

          const entityUsernames = entities.map(
            (entity) => entity.entity_username
          );

          for (const username in entityUsernames) {
            io.to(`live_${entityUsernames[username]}`).emit("incomingMessage", {
              content: message,
              conversation_id: conversation_id,
            });
          }
        } else {
          console.log("Authorization denied");
        }
      }
    );

    socket.on("joinSession", async (token) => {
      const user = jwt.verify(token, process.env.TOKEN_KEY as Secret);

      if (user && typeof user !== "string") {
        socket.join(`live_${user.username}`);
      } else {
        console.log("Authorization denied");
      }
    });

    socket.on("leaveSession", (token) => {
      const user = jwt.verify(token, process.env.TOKEN_KEY as Secret);
      if (user && typeof user !== "string") {
        socket.leave(`live_${user.username}`);
      } else {
        console.log("Authorization denied");
      }
    });

    socket.on("disconnect", () => {
      return;
    });
  });
}
