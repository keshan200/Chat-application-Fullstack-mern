import { Server } from "socket.io";
import { onlineUsers, registerUser, sendMessage } from "../controller/message.controller";
import { getAcceptedChats, getSendChatList } from "../controller/acceptInvite.controller";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register_user", registerUser(socket));
    socket.on("send_message", sendMessage(io, socket));

    socket.on("disconnect", () => {
      for (const userId in onlineUsers) {
        if (onlineUsers[userId] === socket.id) {
          delete onlineUsers[userId];
          break;
        }
      }
      console.log("User disconnected:", socket.id);
    });

      socket.on("accepted_user", (userId: string) => {
      console.log("User registered:", userId);
      getAcceptedChats(socket ,userId)
    });
  });
};


