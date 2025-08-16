import { NextFunction } from "express";
import { Request,Response } from "express";
import { APIError } from "../errors/ApiErros";
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken"



declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role?: string;
      };
    }
  }
}

export const authenticateToken = (req:Request,res:Response,next:NextFunction) =>{

    try{
       const authHeader =  req.headers["authorization"]
       const token = authHeader && authHeader.split(" ")[1]

       if(!token){
          throw new APIError(401,"Access Token out")
       }

       jwt.verify(

         
         token,
         process.env.ACCESS_SECRET_TOKEN!,

         (error,decoded) =>{

       
              if(error){
                if(error instanceof TokenExpiredError){
                    return new APIError(401,"Access Token Expired")
                }else if (error instanceof JsonWebTokenError){
                    throw new APIError(401,"Invalid Access Token")
                }else{
                    throw new APIError(401,"Error Verifying Access Token")
                }
              }

              if(!decoded || typeof decoded === "string"){
                throw new APIError(401,"Error Access Token Payload Error")
              }
               
              req.user = {
                  id: (decoded as JwtPayload).id,
                  role: (decoded as JwtPayload).role,
               };
            console.log("User info from token:", req.user);
               

              next()

         } 
       )

    }catch(error){
        next(error)
    }

}


