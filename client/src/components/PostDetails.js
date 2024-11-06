// src/components/PostDetails.js

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
// import { useSelector } from 'react-redux';


const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [rating, setRating] = useState(0);
  const [content, setComment] = useState('');
  const [error, setError] = useState(null);
  const [reviews,setReviews]=useState([])

  // const { token, user } = useSelector((state) => state.auth); // Get user and token from Redux
  const storedString = localStorage.getItem("user");
const user = JSON.parse(storedString);
const token=user.token;


const submitReview =useCallback(async (e) => {
  e.preventDefault();
  if (rating <= 0 || content.trim() === '') {
    setError('Please provide a valid rating and content');
    // return;
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,// Pass JWT token in the request header
      // Pass the token for authorization
    },
  };

  try {
    // console.log('id',id);
    let postId=id
    const res = await axios.post(
      `http://localhost:8000/api/reviews/`,
      { content,rating,postId},
      config
    );
    setPost({ ...post, reviews: res.data }); // Update the reviews in the state
    setRating(0); // Reset form
    setComment('');
    setError(null);
  } catch (err) {
    console.error('Error submitting review', err);
    setError('Failed to submit review');
  }
},[content,id,post,rating,token])


useEffect(() => {
  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error('Error fetching post details', err);
    }
  };
  fetchPost();
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/reviews/${id}/reviews`);
      setReviews(res.data);
      return;
    } catch (err) {
      console.log('error',err);
      
    }
  };
  fetchReviews();
  
}, [id,submitReview]);


  return post ? (
    <div className="post-details">
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>Rating: {post.averageRating ? post.averageRating.toFixed(1) : 'No rating yet'}</p>

      <div className="reviews">
        <h3>Reviews</h3>
        {/* {console.log(reviews.createdBy.name)} */}
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review">
              {/* {console.log(review.rating)} */}
              <strong>{review.createdBy.name}</strong>
              <p>Rating: {review.rating} / 10</p>
              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>

      {user && (
        <div className="add-review">
          <h3>Add Your Review</h3>
          {error && <p className="error">{error}</p>}
          <form onSubmit={submitReview}>
            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                min="1"
                max="10"
                required
              />
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                value={content}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">
              Submit Review
            </button>
            <Link to='/'>Home</Link>
          </form>
        </div>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default PostDetails;
