import {Router} from 'express'
import { getAllUser, userLogin, userSignUp } from '../controllers/user-controller';
import { LoginValidator, signupValidator, validate } from '../utils/validator';
const userRouter = Router()



userRouter.get("/",getAllUser)
userRouter.post('/signup',validate(signupValidator),userSignUp)
userRouter.post('/login',validate(LoginValidator),userLogin)
export default userRouter;