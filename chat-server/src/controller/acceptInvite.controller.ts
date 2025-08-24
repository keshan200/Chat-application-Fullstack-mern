import { ConversationModel } from "../models/ConversionModel";
import { FriendReq } from "../models/FriendReqModel";
import { Request,Response } from "express";
import { MessageModel } from "../models/MessageModel";

export const acceptInvite = async (req: Request, res: Response) => {
  try {
    const { friendReqId } = req.params; 

    const friendReq = await FriendReq.findById(friendReqId)

    if (!friendReq) return res.status(404).json({ message: "Friend request not found" });

    friendReq.status = "accepted";
    await friendReq.save();


  let conversation = await ConversationModel.findOne({
    participants: { $all: [friendReq.requester, friendReq.recipient] }
  });

  if (!conversation) {
    conversation = await ConversationModel.create({
      participants: [friendReq.requester, friendReq.recipient]
    });
  }


    res.json({ message: "Friend request accepted", friendReq });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};





export const getSendChatList = async (socket: any, userId: string) => {
  const conversations = await ConversationModel.find({ participants: userId })
  
  .populate("participants", "full_name img status")
  .lean() as (any & { lastMessage?: string; time?: Date })[];

  for (let convo of conversations) {
    const lastMsg = await MessageModel.findOne({ conversation: convo._id })
      .sort({ createdAt: -1 })
      .lean();
    convo.lastMessage = lastMsg?.text || "";
    convo.time = lastMsg?.createdAt || convo.updatedAt;
  }

  socket.emit("chat_list", conversations);
};




export const getAcceptedChats = async (socket: any, userId: string) => {
  try {
    
    const acceptedFriendReqs = await FriendReq.find({
      status: "accepted",
      $or: [{ requester: userId }, { recipient: userId }],
    });

    const conversations: any[] = [];

    for (let req of acceptedFriendReqs) {
     
      let convo = await ConversationModel.findOne({
        participants: { $all: [req.requester, req.recipient] },
      })
        .populate("participants")
        .lean() as any;

      if (!convo) {
        convo = await ConversationModel.create({
          participants: [req.requester, req.recipient],
        });
        convo = convo.toObject();
      }

      //get last ms
      const lastMsg = await MessageModel.findOne({ conversation: convo._id })
        .sort({ createdAt: -1 })
        .lean() as any;

      convo.lastMessage = lastMsg?.text || "";
      convo.time = lastMsg?.createdAt || convo.updatedAt;

      conversations.push(convo);
    }

    socket.emit("chat_list", conversations);
  } catch (error) {
    console.error("Error fetching accepted chats:", error);
  }
};




