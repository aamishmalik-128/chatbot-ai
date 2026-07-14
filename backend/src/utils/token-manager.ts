
import jwt from 'jsonwebtoken';
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