import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { prisma } from "./prismaMiddleware";
import jwt, { Secret } from "jsonwebtoken";
import { Entity, TableMember } from "@FgTypes/types";

const verifyUser = async (token: string, table_id: string) => {
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

    const tableMembers = await prisma.tables_members.findMany({
      where: {
        table_id: table_id,
      },
    });

    let isInConversation = false;

    isInConversation = tableMembers.some(
      (member) => member.member_id === user.user_id
    );

    return isInConversation;
  } catch (error) {
    return false;
  }
};

export default function tableSocket(server: HttpServer) {
  const io = new SocketIOServer(server, {
    path: "/table-socket",
    cors: {
      origin: ["http://localhost:5000"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on(
      "sendMessage",
      async (token: string, table_id: string, message: string) => {
        const isInTable = await verifyUser(token, table_id);
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

        if (isInTable) {
          const recipients: TableMember[] =
            await prisma.tables_members.findMany({
              where: {
                table_id: table_id,
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
            io.to(`${table_id}_${entityUsernames[username]}`).emit(
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
      async (token: string, table_id: string, typing: boolean) => {
        const isInTable = await verifyUser(token, table_id);
        let user: jwt.JwtPayload;
        try {
          user = jwt.verify(
            token,
            process.env.TOKEN_KEY as Secret
          ) as jwt.JwtPayload;
        } catch {
          return;
        }

        if (isInTable) {
          const recipients: TableMember[] =
            await prisma.tables_members.findMany({
              where: {
                table_id: table_id,
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
            io.to(`${table_id}_${entityUsernames[username]}`).emit(
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

    socket.on("joinTable", async (token, table_id) => {
      const isInTable = await verifyUser(token, table_id);
      let user: jwt.JwtPayload;
      try {
        user = jwt.verify(
          token,
          process.env.TOKEN_KEY as Secret
        ) as jwt.JwtPayload;
      } catch {
        return;
      }

      if (isInTable) {
        socket.join(`${table_id}_${user.username}`);
      }
    });

    socket.on("leaveTable", async (token, table_id) => {
      const isInTable = await verifyUser(token, table_id);
      let user: jwt.JwtPayload;
      try {
        user = jwt.verify(
          token,
          process.env.TOKEN_KEY as Secret
        ) as jwt.JwtPayload;
      } catch {
        return;
      }

      if (isInTable) {
        socket.leave(`${table_id}_${user.username}`);
      }
    });

    socket.on("disconnect", () => {
      return;
    });
  });
}
