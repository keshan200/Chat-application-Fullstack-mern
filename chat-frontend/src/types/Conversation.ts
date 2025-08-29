import type { User } from "./User";

export interface Conversation {
  _id: string;
  participants: User[];  
  createdAt: string;      
  updatedAt: string;    
  
}
