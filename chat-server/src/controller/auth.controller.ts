import {Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken"
import { userModel } from "../models/UserModel";
import { APIError } from "../errors/ApiErros";
import bcrypt from "bcrypt"



const create_access_token = (userId:string) => {
    return jwt.sign({
        id: userId
    },
    process.env.ACCESS_SECRET_TOKEN!,
    {expiresIn:"10s"}
)}



const create_refresh_token = (userId:string) => {
  return jwt.sign (
      {userId},
      process.env.REFRESH_SECRET_TOKEN!,
      {expiresIn : "3d"}
)}



export const signUp =  async (req:Request ,res :Response , next:NextFunction) => {

    try{
      const {full_name,email,password} =  req.body

      const exixtingUser =  await userModel.findOne({email})
      const hashedPassword =  await bcrypt.hash(password,10)

      if(exixtingUser) {
        throw new APIError(400 , "user already registerd")
      }
      
      const newUser =  await userModel.create({
         full_name,
         email,
         password:hashedPassword
      })
      

      res.status(201).json({
        success :true,
        message : "user Registerd successfully",

        user:{
           id : newUser._id,
           full_name:newUser.full_name,
           email:newUser.email
        }

      })
      

    }catch(error:any){
      next(error)
    }

} 


export const login  = async(req:Request,res:Response,next:NextFunction) => {

     try{

       const {email,password} = req.body
       const user =  await userModel.findOne({email})
       
       if(!user){
        throw new APIError(404,"user not found")
       }

       const isMatch = await bcrypt.compare(password,user.password)

       if(!isMatch){
         throw new APIError(401,"Invalid Credentials")
       }

       const AccessToken =  create_access_token(user._id.toString())
       const RefreshToken =  create_refresh_token(user._id.toString())

       console.log("log in refresh token",RefreshToken)

       const isProd =  process.env.NODE_ENV === "production"

       res.cookie("refreshToken",RefreshToken,{
          httpOnly:true,
          secure:isProd,
          sameSite:isProd ? "strict":"lax" ,
          maxAge:7 * 24 * 60 * 60 * 1000,
          path:"/api/auth/refresh-token"
       })


       const userWithoutPass = {
           id:user.id,
           full_name:user.full_name,
           img:user.img,
           email:user.email,
           AccessToken
       }

      

       res.status(201).json(userWithoutPass)

     }catch(error){
          next(error)
     }

}



export const refreshToken = async (req:Request,res:Response,next:NextFunction) =>{
   
   try{

     const token  =  req.cookies?.refreshToken
     
     console.log("refreshtoken?>>>>>>>>>>>>>>>",token)

     if(!token){
      throw new APIError(401,"Refresh Token missing")
     }

     jwt.verify(

       token,
       process.env.REFRESH_SECRET_TOKEN!,
       async (error:Error | null,decoded:string | JwtPayload |undefined)=>{       
         if(error){
             if(error instanceof TokenExpiredError){
                  throw new APIError(401,"Access Token Expired")
            }else if (error instanceof JsonWebTokenError){
                  throw new APIError(401,"Invalid Access Token")
            }else{
                  throw new APIError(401,"Error Verifying Access Token")
            }
         }
        
          if(!decoded || typeof decoded === "string"){
               throw new APIError(401,"Error Access Token Payload Error")
          }

          const userID = decoded.userId as string;
          const user =  await userModel.findById(userID)

          if(!user){
            throw new APIError(401,"user not found")
          }

          const newAcessToken = create_access_token(user._id.toString())
          res.status(200).json({accessToken : newAcessToken})
       })

   }catch(error){
         console.log(error)
          next(error)
   }
} 


export const getAllUsers =  async(req:Request,res:Response,next:NextFunction) =>{

    try{
       const users = await userModel.find().select("-password")
       res.status(201).json(users) 
    }catch(error:any){
       res.status(500).json({message:"internal server error"})
    } 

}


export const logout = (req:Request,res:Response,next:NextFunction) =>{
    
   try{

    const isProd = process.env.NODE_ENV === "production"

    res.cookie("refreshToken","",{

      httpOnly:true,
      secure:isProd,
      expires:new Date(0),
      path:"/api/auth/refresh-token"
    })
    
    res.status(200).json({message:"Logout successful"})

   }catch(error:any){
     next(error)
   }

}