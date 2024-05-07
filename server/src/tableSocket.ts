import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import { prisma } from "./prismaMiddleware";
import jwt, { Secret } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { Entity, TableMember, TableTop } from "@FgTypes/types";

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

    socket.on("broadcasting", async (token, table_id) => {
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
        io.to(table_id).emit("broadcast", user.username);
      }
    });

    socket.on("receivedBroadcast", async (token, table_id, broadcaster) => {
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
        if (broadcaster !== user.username) {
          console.log(table_id, broadcaster, user.username);
          io.to(`${table_id}_${broadcaster}`).emit("receivers", user.username);
        }
      }
    });

    socket.on(
      "offering",
      async (
        token,
        table_id,
        offer: RTCSessionDescriptionInit,
        receiver: string
      ) => {
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
          io.to(`${table_id}_${receiver}`).emit("offer", offer, user.username);
        }
      }
    );

    socket.on(
      "answering",
      async (
        token,
        table_id,
        answer: RTCSessionDescriptionInit,
        userOffering: string
      ) => {
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
          io.to(`${table_id}_${userOffering}`).emit(
            "answer",
            answer,
            user.username
          );
        }
      }
    );

    socket.on(
      "sendingCandidate",
      async (
        token,
        table_id,
        candidate: RTCIceCandidateInit,
        senderId: string
      ) => {
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
          io.to(senderId).emit("candidate", candidate, socket.id);
        }
      }
    );

    socket.on("broadcasterOffer", (data) => {
      const { table_id, offer } = data;
      socket.to(table_id).emit("broadcasterOffer", offer);
    });
  });
}
