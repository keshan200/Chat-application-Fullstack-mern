import { FriendReq } from "../models/FriendReqModel";
import { Request,Response } from "express";

export const acceptInvite = async (req: Request, res: Response) => {
  try {
    const { friendReqId } = req.params; 

    const friendReq = await FriendReq.findById(friendReqId)

    if (!friendReq) return res.status(404).json({ message: "Friend request not found" });

    friendReq.status = "accepted";
    await friendReq.save();
    res.json({ message: "Friend request accepted", friendReq });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};