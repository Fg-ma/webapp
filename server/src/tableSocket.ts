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

    const tableMembers: TableMember[] = await prisma.tables_members.findMany({
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
          io.to(table_id).emit("newMessage", {
            content: message,
            sender: user.username,
            message_date: message_date,
          });
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
          io.to(table_id).emit("typingStatusChange", {
            typing: typing,
            sender: user.username,
          });
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
        socket.join(table_id);
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
        socket.leave(table_id);
        socket.leave(`${table_id}_${user.username}`);
      }
    });

    socket.on("joinRoom", async (token, table_id) => {
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
        await prisma.tables_members.update({
          where: {
            table_id_member_id: {
              table_id: table_id,
              member_id: user.user_id,
            },
          },
          data: {
            live: 1,
          },
        });

        const tableMembers: TableMember[] =
          await prisma.tables_members.findMany({
            where: {
              table_id: table_id,
            },
          });

        const liveTableMembers = tableMembers.filter(
          (member) => member.live === 1
        );

        const nonuserMembers = liveTableMembers.filter(
          (member) => member.member_id !== user.user_id
        );

        const nonuserMembersIds = nonuserMembers.map(
          (member) => member.member_id
        );

        const entities: Entity[] = await prisma.entities.findMany({
          where: {
            entity_id: {
              in: nonuserMembersIds,
            },
          },
        });

        const members = entities.map((entity) => entity.entity_username);

        socket.emit("allLiveMembers", members, user.username);
      }
    });

    socket.on("sendingSignal", (table_id, userToSignal, callerID, signal) => {
      io.to(`${table_id}_${userToSignal}`).emit("userJoined", signal, callerID);
    });

    socket.on("returningSignal", async (token, table_id, signal, callerID) => {
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
        io.to(`${table_id}_${callerID}`).emit(
          "receivingReturnedSignal",
          signal,
          user.username
        );
      }
    });

    socket.on("userDisconnect", async (token, table_id) => {
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
        await prisma.tables_members.update({
          where: {
            table_id_member_id: {
              table_id: table_id,
              member_id: user.user_id,
            },
          },
          data: {
            live: 0,
          },
        });

        io.to(table_id).emit("userDisconnected", user.username);
      }
    });
  });
}
