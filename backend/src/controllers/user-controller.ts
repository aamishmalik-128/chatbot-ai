import { Request, Response, NextFunction } from "express";
import Users from "../models/Users";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token-manager";

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await Users.find();
    return res.status(200).json({ message: "All users fetched" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({
        message: "error in fetching users",
        cause: (error as Error).message,
      });
  }
};

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;
    let hashedPassword = bcrypt.hashSync(password, 10);
    const user = new Users({ name, email, password: hashedPassword });
    await user.save();
    res.clearCookie("auth_token",{
        httpOnly:true,
        signed:true,
        path:"/"
    });
    const token = createToken(user._id.toString(),user.email )
    const expires = new Date();
    expires.setDate(expires.getDate()+7);
    res.cookie("auth_cookie",token,{path:"/",expires,httpOnly:true,signed:true})
    return res
      .status(200)
      .json({
        message: "User Created Successfully",
        id: user._id,
        email: user.email,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({
        message: "Couldnot create the user",
        cause: (error as Error).message,
      });
  }
};
export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    console.log(req.body);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    let isCorrectPassword = bcrypt.compareSync(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
      
    }
    res.clearCookie("auth_token",{
        httpOnly:true,
        signed:true,
        path:"/"
    });
    const token = createToken(user._id.toString(),user.email )
    const expires = new Date();
    expires.setDate(expires.getDate()+7);
    res.cookie("auth_cookie",token,{path:"/",expires,httpOnly:true,signed:true})
    return res.status(200).json({
        message: "Login successful",
        name:user.name,
        email:user.email
      });
  } catch (error) {
    return res.status(401).json({ message: "Incorrect Password" });
  }
};

// user-controller.ts (or wherever verifyUser belongs)
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user?.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await Users.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong verifying user",
      cause: (error as Error).message,
    });
  }
};