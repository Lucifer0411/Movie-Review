import { Image } from "../models/imageModel.js";
import { Post } from "../models/postModel.js";
import asyncHandler from 'express-async-handler'
import path from 'path'


export const createPost = asyncHandler(
    async (req, res,file) => {
        const { title, description} = req.body;
        const {path,filename} =req.file
        // console.log(req.file);
        
        const image=await Image({path,filename})
        await image.save();

          // console.log('msg: image uploaded success');
          const newPost = new Post({
            title,
            description,
            image,
            createdBy: req.user // Get the user id from the auth middleware
          });
      
          await newPost.save();
          if(newPost){
          res.status(201).json(newPost);
          }else{
            res.status(500)
            throw new Error('Server Error')
          }
        
      }
)

export const getPosts = asyncHandler(
    async (req, res) => {
        try {
          const posts = await Post.find()
          res.json(posts);
        } catch (error) {
          res.status(500)
          next(error)
        }
      }
)

//Get post Image
export const getPostImage = asyncHandler(
  async (req, res,next) => {
      const {id}=req.params
      try {
        // console.log('img id',id);
        
        const image=await Image.findById(id)
        if(!image){
          res.send({'msg':'image not found'})
        }
        const __dirname = path.resolve();
        console.log("dir",__dirname);
        
        const imagePath=path.join(__dirname,'uploads','images',image.filename)
        // console.log('path',imagePath);
        return res.sendFile(imagePath)
      } catch (error) {
        res.status(500)
        next(error)
      }
    }
)

// Get posts by user ID

export const getPostByUser=asyncHandler(
  async (req, res) => {
    try {
      const posts = await Post.find({ createdBy: req.params.userId });
        
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
)

export const getPostById = asyncHandler(
    async (req, res) => {
      try {
        // console.log('id',req.params.id);

        let id=req.params.id.replace(':','');
        
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
      }
)

export const updatePost = asyncHandler(
    async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
      
          if (!post) return res.status(404).json({ message: "Post not found" });
          // console.log('postid',post.createdBy.toString(),"post uses",req.user._id.toString());
          
          if (post.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });
      
          const { title, description, image } = req.body;
          post.title = title || post.title;
          post.description = description || post.description;
          post.image = image || post.image;
      
          await post.save();
          res.json(post);
        } catch (error) {
          res.status(500)
          next(error)
        }
      }
)

export const deletePost =asyncHandler(
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      // console.log(post);
      
      if (!post) return res.status(404).json({ message: "Post not found" });
      if (post.createdBy.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Not authorized" });
  
      await Post.deleteOne(post)
      res.json({ message: "Post removed" });
    } catch (error) {
      res.status(500)
      next(error)
    }
  }
)

  
  
