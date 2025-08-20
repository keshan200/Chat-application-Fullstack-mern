import mongoose from "mongoose";

type Conversation = {
  participants: mongoose.Schema.Types.ObjectId[];
};

const conversationSchema = new mongoose.Schema<Conversation>({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ]
}, { timestamps: true });

export const ConversationModel = mongoose.model<Conversation>("Conversation", conversationSchema);
