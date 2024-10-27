import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import { createPost,getPostById,getPosts, updatePost,deletePost, getPostByUser,getPostImage } from '../controllers/post-controller.js';
import multer from 'multer';

export const postRouter=express.Router(); 

// const storage = multer.memoryStorage();
// const upload =multer({storage})
const storage = multer.diskStorage(
    {
        destination:function(req,file,cb){
            cb(null,'backend/uploads/images/')
        },
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
    }
);
// console.log('storage',storage);
const upload =multer({storage})
// const upload = multer({dest:'upload/'});
postRouter.post('/',upload.single("image"),protect,createPost)
postRouter.get('/',getPosts)
postRouter.get('/img/:id',getPostImage)
postRouter.get('/user/:userId',getPostByUser);
postRouter.get('/:id',getPostById)
postRouter.put('/:id',protect,updatePost)
postRouter.delete('/:id',protect,deletePost)




// postRouter.post('/login',loginUser)

export default postRouter
