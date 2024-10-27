import express from 'express'
import protect from '../middlewares/authMiddleware.js';
import { createReview, getReviewsForPost } from '../controllers/review-controller.js';


export const reviewRouter=express.Router();

reviewRouter.post('/',protect,createReview)
reviewRouter.get('/:id/reviews',getReviewsForPost)

export default reviewRouter
