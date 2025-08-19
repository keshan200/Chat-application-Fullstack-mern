import { FriendReq } from "../models/FriendReqModel";
import { userModel } from "../models/UserModel";
import { sendMail } from "../util/emailService";
import {Request, Response } from "express";


export const sendInvite = async (req:Request, res :Response) => {
  try {
    const { requesterId, recipientEmail } = req.body;

    const recipient = await userModel.findOne({ email: recipientEmail });

    if (!recipient)
         return res.status(404).json({ message: "Recipient not found" });

   
    const friendReq = await FriendReq.create({
      requester: requesterId,
      recipient: recipient._id,
    });

  
    const acceptUrl = `${process.env.ACCEPT_URL}/accept/${friendReq._id}`;

    await sendMail(
      recipient.email,
      "Friend Invite",
      `You got a friend invite! Accept here: ${acceptUrl}`
    );

    res.json({ message: "Invite sent", friendReq });
  } catch (error : any) {
    res.status(500).json({ error: error.message });
  }
};
