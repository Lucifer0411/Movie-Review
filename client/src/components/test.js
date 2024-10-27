// src/components/PostDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/style/PostDetails.css'

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

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
  }, [id]);

  return post ? (
    <div className="post-details">
      <img src={post.image} alt={post.title} className="post-details-image" />
      <div className="post-details-content">
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <p>Rating: {post.rating}</p>
        {/* Add more details here if needed */}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default PostDetails;
