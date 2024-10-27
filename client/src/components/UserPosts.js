// src/components/UserPosts.js

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserPosts = () => {
  const { user } = useSelector((state) => state.auth); // Get the logged-in user details
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // console.log('userid',user._id);
        const response = await axios.get(`http://localhost:8000/api/posts/user/${user._id}`);
        // console.log('reponse',response.data)
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    if (user) {
      fetchPosts();
    }
  }, [user]);

  return (
    <div>
      {posts.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPosts;
