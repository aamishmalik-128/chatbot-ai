import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { chatCompletionValidator } from "../utils/validator";
//protected api
const chatRouter= Router()

chatRouter.post('/new',chatCompletionValidator,verifyToken)

export default chatRouter