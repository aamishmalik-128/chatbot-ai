import {Request,Response, NextFunction } from "express";
import { body,ValidationChain, validationResult } from "express-validator";



export const validate = (validations:ValidationChain[])=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        for(let validation of validations){
            const result = await validation.run(req)
            if(!result.isEmpty())
                break
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
           return next()
        }
    return res.status(422).json({errors:errors.array()})
    }
}


export const signupValidator=[
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").trim().isEmail().withMessage("Actual email is required"),
    body("password").trim().isLength({min:6}).withMessage("Password is Should contain minimum 5 characters")
]

export const LoginValidator=[
    body("email").trim().isEmail().withMessage("Actual Email is required"),
    body("password").trim().isLength({min:6}).withMessage("Password doesnot Match or is less than the required string" ),
]