import { createContext } from "react"
import type { User } from "../types/User"



export interface AuthContextType {
    

    isLoggedIn : boolean
    login:(accessToken:string) => void
    logout:() => void
    isAuthenticating:boolean
    loading? :boolean
    
    user: User | null;
    setUser: (user: User | null) => void;
   

}

export const AuthContext =  createContext<AuthContextType | undefined>(undefined)



