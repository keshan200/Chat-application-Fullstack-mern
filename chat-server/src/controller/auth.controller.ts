import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { userModel } from "../models/UserModel";
import { APIError } from "../errors/ApiErros";
import bcrypt from "bcrypt"



const create_access_token = (userId:string) => {
    return jwt.sign({
        id: userId
    },
    process.env.ACCESS_SECRET_TOKEN!,
    {expiresIn:"2m"}
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