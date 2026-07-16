import {Router} from 'express'
import { getAllUser, userLogin, userSignUp, verifyUser } from '../controllers/user-controller';
import { LoginValidator, signupValidator, validate } from '../utils/validator';
import { verifyToken } from '../utils/token-manager';
const userRouter = Router()



userRouter.get("/",getAllUser)
userRouter.post('/signup',validate(signupValidator),userSignUp)
userRouter.post('/login',validate(LoginValidator),userLogin)
userRouter.get('/auth-status',verifyToken ,verifyUser)
export default userRouter;