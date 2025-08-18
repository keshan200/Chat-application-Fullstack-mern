import mongoose from "mongoose";



type Message = {

   conversation: mongoose.Schema.Types.ObjectId
   sender:  mongoose.Schema.Types.ObjectId           
   receiver: mongoose.Schema.Types.ObjectId                     
   text: string;                  
   type: "text" | "image" | "file"
   seen: boolean                
   createdAt: string             
   updatedAt?: string 
   


}



const messageSchema = new mongoose.Schema<Message>({
  conversation: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Conversation", 
    
  },
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: [true, "Sender ID is required"] 
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Receiver ID is required"]
  },
  text: { 
    type: String, 
    required: [true, "Message text is required"], 
    trim: true, 
    minlength: [1, "Message cannot be empty"], 
    maxlength: [1000, "Message is too long"] 
  },
  type: { 
    type: String, 
    enum: {
      values: ["text", "image", "file"],
      message: "{VALUE} is not a supported message type"
    },
    default: "text"
  },
  seen: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

export const MessageModel = mongoose.model<Message>("Message", messageSchema);

