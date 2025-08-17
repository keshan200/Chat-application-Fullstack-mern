import mongoose from "mongoose"

type User = {
    img?:string
    full_name :string
    bio?:string 
    email: string
    password:string

    createAt: Date; 
    updateAt: Date;
    status:"active" | "inactivate"
}


const userSchema = new mongoose.Schema<User>(
 {
    img: { 
      type: String,
      default: "/uploads/default.png",
      trim: true 
    },
    full_name: { 
      type: String, 
      required: [true, "Full name is required"], 
      minlength: [3, "Full name must be at least 3 characters"], 
      maxlength: [50, "Full name cannot exceed 50 characters"], 
      trim: true 
    },
    bio: { 
      type: String, 
      default: "", 
      maxlength: [200, "Bio cannot exceed 200 characters"], 
      trim: true 
    },
    status: { 
      type: String, 
      enum: ["active", "inactive"], 
      default: "active" 
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: [true, "Password is required"], 
      minlength: [6, "Password must be at least 6 characters"], 
      maxlength: [128, "Password cannot exceed 128 characters"] 
    },
  },
  {
    timestamps: true,
  }
);



export const userModel =  mongoose.model<User>("User",userSchema)