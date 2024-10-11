import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import { createPost,getPostById,getPosts, updatePost } from '../controllers/post-controller.js';

export const postRouter=express.Router();

postRouter.post('/',protect,createPost)
postRouter.get('/',getPosts)
postRouter.get('/:id',getPostById)
postRouter.put('/:id',updatePost)
// postRouter.post('/login',loginUser)

export default postRouter
