import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { chatCompletionValidator } from "../utils/validator";
import { generateChatCompletion } from "../controllers/chat-controllers";
//protected api
const chatRouter= Router()

chatRouter.post('/new',verifyToken,generateChatCompletion)

export default chatRouter