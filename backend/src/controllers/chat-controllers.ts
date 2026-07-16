import { NextFunction, Request, Response } from "express";
import Users from "../models/Users";
import { configureOpenAI } from "../config/openai-config";

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // grab existing chats of the user
    const chats = user.chats.map(({ role, content }) => ({ role, content }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // send all the chats with the new one to OpenAI
    const openai = configureOpenAI();
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chats,
    });

    const assistantReply = chatResponse.choices[0].message;
    user.chats.push({
      role: assistantReply.role,
      content: assistantReply.content ?? "",
    });

    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong generating chat completion",
      cause: (error as Error).message,
    });
  }
};