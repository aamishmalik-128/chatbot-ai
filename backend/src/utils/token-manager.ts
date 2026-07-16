
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
export const createToken = (id:string,email:string)=>{
    const payload ={id, email};
    if(!process.env.SECRET_KEY){
        throw new Error("SECRET_KEY is not defined") 
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY,{
        expiresIn:"7d",
    })
    return token

}

export const verifyToken = async(req:Request, res:Response,next:NextFunction)=>{
    const token = (req as any).signedCookies?.auth_cookie
    console.log(token)
    if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as { id: string; email: string };
    (req as any).user = decoded; // attach for downstream handlers
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  console.log("token verification successful")
}