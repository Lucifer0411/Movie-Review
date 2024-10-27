import express from 'express'
import { registerUser,loginUser, updateUserProfile } from '../controllers/user-controller.js';
import protect from '../middlewares/authMiddleware.js';

export const userRouter=express.Router();

userRouter.post('/',registerUser)
userRouter.post('/login',loginUser)
userRouter.put('/:userId',protect, updateUserProfile)
// userRouter.get('/me',protect,getMe)

export default userRouter
