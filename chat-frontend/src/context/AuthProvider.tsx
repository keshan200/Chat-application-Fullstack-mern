import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import type { User } from "../types/User"
import apiClient , { setHeader } from "../service/apiClient"
import router from "../router"





interface AuthProviderProps{
   children :React.ReactNode
}


export const AuthProvider  = ({children}:AuthProviderProps) => {
   
   const [isLoggedIn , setIsLoggedIn] = useState<boolean>(false)
   const [accessToken , setAccessToken] =  useState<string>("")
   const [isAuthenticating , setIsAuthenticating] =  useState<boolean>(true)
   const [user, setUser] = useState<User | null>(null)
   

   const login  =  (token:string) => {
    setIsLoggedIn(true)
    setAccessToken(token)
   }
   
   const logout =  () => setIsLoggedIn(false)


   useEffect(()=>{
      setHeader(accessToken)
   },[accessToken])

  
   useEffect(() => {
    const tryRefresh =  async () => {
        try{
         
            const result =  await apiClient .post("/auth/refresh-token")
            setAccessToken(result.data.accessToken)
            setIsLoggedIn(true)
            setUser(result.data.user);

            const currentPath = window.location.pathname

            if(children === "/login" || currentPath === "/signup" || currentPath === "/"){
                console.log ("currentPath" , currentPath)
                router.navigate("")
            }

        }catch(error:any){
              setAccessToken("")
              setIsLoggedIn(false)
        }finally{
            setIsAuthenticating(false)
        }
    }

    tryRefresh()
   },[])


    return<AuthContext.Provider value={{isLoggedIn,login,logout,isAuthenticating,user,setUser}}>{children}</AuthContext.Provider>

}