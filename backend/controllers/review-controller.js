import {Review} from '../models/reviewModel.js'
import {Post} from '../models/postModel.js'
import asyncHandler from 'express-async-handler'


export const createReview = asyncHandler(
    async (req, res) => {
        const { content, rating, postId } = req.body;
      
        try {
          const post = await Post.findById(postId);
          if (!post) return res.status(404).json({ message: "Post not found" });
      
          const newReview = new Review({
            content,
            rating,
            createdBy: req.user, // From auth middleware
            post: postId
          });
      
          await newReview.save();
      
          // Update post with new review
          post.reviews.push(newReview._id);
          await post.save();
      
          // Optionally, update the average rating
          const reviews = await Review.find({ post: postId });
          const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
          post.averageRating = avgRating;
          await post.save();
      
          res.status(201).json(newReview);
        } catch (error) {
          res.status(500).json({ message: "Server error" });
        }
      }
)


export const getReviewsForPost = asyncHandler(
    async (req, res) => {
        try {
          const reviews = await Review.find({ post: req.params.id }).populate('createdBy', 'name');
          // console.log("createdby",reviews[0].createdBy.name);
          res.json(reviews);
        } catch (error) {
          res.status(500).json({ message: "Server error" });
        }
      }
)
  