import { Post } from "../models/postModel.js";

import asyncHandler from 'express-async-handler'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

export const createPost = asyncHandler(
    async (req, res) => {
        const { title, description, image } = req.body;
      
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
            res.status(500).json('server Error')
          }
        
      }
)

export const getPosts = asyncHandler(
    async (req, res) => {
        try {
          const posts = await Post.find()
        //   console.log('posts',posts);
          
          res.json(posts);
        } catch (error) {
          res.status(500).json({ message: "Server error" });
        }
      }
)

export const getPostById = asyncHandler(
    async (req, res) => {
        try {
            // console.log('id',req.params.id);
          const post = await Post.findById(req.params.id)
          if (!post) return res.status(404).json({ message: "Post not found" });
        //   console.log('post',post);
          res.json(post);
        } catch (error) {
          res.status(500).json({ message: "Server error" });
        }
      }
)

export const updatePost = asyncHandler(
    async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
      
          if (!post) return res.status(404).json({ message: "Post not found" });
          if (post.createdBy.toString() !== req.user) return res.status(401).json({ message: "Not authorized" });
      
          const { title, description, image } = req.body;
          post.title = title || post.title;
          post.description = description || post.description;
          post.image = image || post.image;
      
          await post.save();
          res.json(post);
        } catch (error) {
          res.status(500).json({ message: "Server error" });
        }
      }
)
  
  
