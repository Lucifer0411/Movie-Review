import express from 'express'
import { registerUser,loginUser } from '../controllers/user-controller.js';

export const userRouter=express.Router();

userRouter.post('/',registerUser)
userRouter.post('/login',loginUser)
// userRouter.get('/me',protect,getMe)

export default userRouter
