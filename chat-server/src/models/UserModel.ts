import mongoose from "mongoose"

type User = {
    img:string
    full_name :string
    bio:string
    status:"active" | "inactivate"
    email: string
    password:string
    createAt:Date
    updateAt:Date
}


const userSchema = new mongoose.Schema<User>(
  {
    img: { type: String, required: true },
    full_name: { type: String, required: true },
    bio: { type: String, default: "" },
    status: { type: String, enum: ["active", "inactivate"], default: "active" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, 
  }
);



export const userModel =  mongoose.model<User>("User",userSchema)