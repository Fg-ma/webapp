import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { prisma } from "./prismaMiddleware";
import jwt, { Secret } from "jsonwebtoken";
import { ConversationMember, Entity } from "@FgTypes/types";

const verifyUser = async (token: string, conversation_id: string) => {
  try {
    let user: jwt.JwtPayload;
    try {
      user = jwt.verify(
        token,
        process.env.TOKEN_KEY as Secret
      ) as jwt.JwtPayload;
    } catch {
      return false;
    }

    const conversationMembers = await prisma.conversations_members.findMany({
      where: {
        conversation_id: conversation_id,
      },
    });

    let isInConversation = false;

    isInConversation = conversationMembers.some(
      (member) => member.member_id === user.user_id
    );

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
        let user: jwt.JwtPayload;
        try {
          user = jwt.verify(
            token,
            process.env.TOKEN_KEY as Secret
          ) as jwt.JwtPayload;
        } catch {
          return;
        }
        const message_date = new Date().toISOString();

        if (isInConversation) {
          const recipients: ConversationMember[] =
            await prisma.conversations_members.findMany({
              where: {
                conversation_id: conversation_id,
              },
            });

          const recipientIds = recipients.map(
            (recipient) => recipient.member_id
          );

          const entities: Entity[] = await prisma.entities.findMany({
            where: {
              entity_id: { in: recipientIds },
            },
          });

          const entityUsernames = entities.map(
            (entity) => entity.entity_username
          );

          for (const username in entityUsernames) {
            io.to(`${conversation_id}_${entityUsernames[username]}`).emit(
              "newMessage",
              {
                content: message,
                sender: user.username,
                message_date: message_date,
              }
            );
          }
        }
      }
    );

    socket.on(
      "typing",
      async (token: string, conversation_id: string, typing: boolean) => {
        const isInConversation = await verifyUser(token, conversation_id);
        let user: jwt.JwtPayload;
        try {
          user = jwt.verify(
            token,
            process.env.TOKEN_KEY as Secret
          ) as jwt.JwtPayload;
        } catch {
          return;
        }

        if (isInConversation) {
          const recipients: ConversationMember[] =
            await prisma.conversations_members.findMany({
              where: {
                conversation_id: conversation_id,
              },
            });

          const recipientIds = recipients.map(
            (recipient) => recipient.member_id
          );

          const entities: Entity[] = await prisma.entities.findMany({
            where: {
              entity_id: { in: recipientIds },
            },
          });

          const entityUsernames = entities.map(
            (entity) => entity.entity_username
          );

          for (const username in entityUsernames) {
            io.to(`${conversation_id}_${entityUsernames[username]}`).emit(
              "typingStatusChange",
              {
                typing: typing,
                sender: user.username,
              }
            );
          }
        }
      }
    );

    socket.on("joinConversation", async (token, conversation_id) => {
      const isInConversation = await verifyUser(token, conversation_id);
      let user: jwt.JwtPayload;
      try {
        user = jwt.verify(
          token,
          process.env.TOKEN_KEY as Secret
        ) as jwt.JwtPayload;
      } catch {
        return;
      }

      if (isInConversation) {
        socket.join(`${conversation_id}_${user.username}`);
      }
    });

    socket.on("leaveConversation", async (token, conversation_id) => {
      const isInConversation = await verifyUser(token, conversation_id);
      let user: jwt.JwtPayload;
      try {
        user = jwt.verify(
          token,
          process.env.TOKEN_KEY as Secret
        ) as jwt.JwtPayload;
      } catch {
        return;
      }

      if (isInConversation) {
        socket.leave(`${conversation_id}_${user.username}`);
      }
    });

    socket.on("disconnect", () => {
      return;
    });
  });
}
