import mongoose, { Mongoose } from "mongoose"

type FriendReq = {
  requester : mongoose.Schema.Types.ObjectId
  recipient : mongoose.Schema.Types.ObjectId
  status : "pending" | "accepted" | "declined"
  createdAt: string  
}





 const friendReqSchema =  new mongoose.Schema <FriendReq>({
     requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
     recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
     status: {
         type: String,
         enum: ["pending", "accepted", "declined"],
         default: "pending"
       }
     }, { timestamps: true }

);




export const FriendReq = mongoose.model<FriendReq>("FriendReq", friendReqSchema);

 