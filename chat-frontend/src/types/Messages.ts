import type { User } from "./User";


export interface Messages {
  _id: string;                    
  conversation: string;           
  sender: User;                  
  receiver: User;               
  text: string;                    
  type: "text" | "image" | "file"; 
  seen: boolean;                  
  createdAt: string;              
  updatedAt?: string;              
}
