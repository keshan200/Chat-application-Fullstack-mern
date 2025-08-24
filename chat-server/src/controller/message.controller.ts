import { Socket ,Server} from "socket.io";
import { MessageModel } from "../models/MessageModel";
import { userModel } from "../models/UserModel";
import { getSendChatList } from "./acceptInvite.controller";
import { Request, Response } from "express"
import mongoose from "mongoose";

export const onlineUsers: { [userId: string]: string } = {};


export const registerUser = (socket: Socket) => (userId: string) => {
  onlineUsers[userId] = socket.id;
  console.log("Online Users:", onlineUsers);
};


export const sendMessage = (io:Server ,  socket :Socket) => async (data:any) => {

try{

    const { conversationId, senderId, receiverId, text, type } = data;

    const sender = await userModel.findById(senderId);
    const receiver = await userModel.findById(receiverId);
    if (!sender || !receiver) {
      return socket.emit("error_message", { message: "Sender or receiver not found" });
    }

  
    const newMessage = await MessageModel.create({
      conversation: conversationId,
      sender: senderId,
      receiver: receiverId,
      text,
      type
    });

  
    const receiverSocket = onlineUsers[receiverId];
    
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive_message", newMessage);
    }
    socket.emit("message_sent", newMessage);

    }catch(error:any){
        console.error(error);
        socket.emit("error_message", { message: "Message send failed" });
}}





export const getMessagesByConversation = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;

    
    const convId = new mongoose.Types.ObjectId(conversationId);

    const messages = await MessageModel.find({ conversation: convId })
      .sort({ createdAt: 1 })
      .populate("sender", "_id full_name")
      .populate("receiver", "_id full_name");

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load messages" });
  }
};
