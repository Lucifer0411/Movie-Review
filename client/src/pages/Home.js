// src/components/Home.js

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/style/Home.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../store/authSlice';
import { API_URL } from '../config';


const Home = () => {
  const {user } = useSelector((state) => state.auth);
const [posts, setPosts] = useState([]);
const dispatch=useDispatch();
  // console.log('user',user);
  
    // Fetch posts from backend
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/posts`);  // Make sure your API route matches the backend route
          setPosts(res.data);  // Set posts in state


          
        } catch (err) {
          console.error('Error fetching posts', err);
        }
      };
      fetchPosts();
    }, []);
  
    const handleLogout=()=>{
      dispatch(logout())
      dispatch(reset())
      // navigate('/')
    }
  return (
    <div className="home">
      <header className="home-header">
        <h1>Fir Agye</h1>
        
      </header>

      {/* Show different content based on authentication state */}
      {user ? (
        <div>
          <h2>Hello, {user?.name} jhatu!</h2>
          <p>Jo karna ha karo, mujhe kya</p>
          <Link to="/dashboard" className="btn">Go to your Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Discover and review movies and web series! Create an account or log in to start.</p>
          <div>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn">Sign Up</Link>
          </div>
        </div>
      )}
    {/* post handling starts here */}
    <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <img src={`${API_URL}/api/posts/img/${post.image}`} alt={post.title} className="post-image" />
              <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                {/* <Link to={`http://localhost:8000/api/posts/:${post._id}`} className="btn">Read More</Link> */}
                {localStorage.getItem('user') && <Link to={`/post/${post._id}`} className="btn">Read More</Link>}
                
              </div>
            </div>
          ))
        ) : (
          <p>No posts to display</p>
        )}
      </div>

    </div>
  );
};

export default Home;
