import type { User } from "./User";

export interface Acceptchats {
  _id: string;                      
  requester: User;               
  recipient: User;                
  status: "pending" | "accepted" | "declined";
  createdAt: string;               
  updatedAt?: string;   
  
  participants: User[];   
  lastMessage?: string; 
  time?: string;        
}