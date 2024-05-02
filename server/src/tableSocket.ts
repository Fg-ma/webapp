import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import ss from "socket.io-stream";
import { v4 as uuid } from "uuid";
import { prisma } from "./prismaMiddleware";
import jwt, { Secret } from "jsonwebtoken";
import { Readable } from "stream";

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
      }
    });

    socket.on("stream", (stream, data) => {
      console.log("Received stream:", stream, data);
      // Broadcast the incoming stream to all clients in the same table
      io.to(data.tableId).emit("incomingStream", stream);
    });

    socket.on("userConnected", (table_id, stream, member_table_id) => {
      console.log(stream);
      socket
        .to(table_id)
        .emit("incomingNewUser", table_id, stream, member_table_id);

      socket.on("disconnect", () => {
        socket.to(table_id).emit("user-disconnected", member_table_id);
      });
    });

    socket.on("userConnected", async (token, table_id, member_table_id) => {
      const isInTable = await verifyUser(token, table_id);
      if (isInTable) {
        // Generate a unique identifier for the stream
        const streamId = uuid();
        // Create a stream and send it using socket.io-stream
        const streamSocket = ss.createStream();
        // Emit the stream event to the client with the streamId
        socket.emit("stream", streamSocket, { table_id });
        // Pipe the incoming stream to the streamSocket
        ss(socket).on(streamId, (incomingStream: Readable) => {
          // Broadcast the incoming stream to all clients in the same table
          socket
            .to(table_id)
            .emit("incomingStream", incomingStream, member_table_id);
        });
      }
    });
  });
}
