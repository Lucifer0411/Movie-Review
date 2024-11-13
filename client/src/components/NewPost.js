// src/components/NewPost.js

import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const NewPost = () => {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    image: '',
    rating: ''
  });

  const { title, description, rating } = postData;
//   const { token } = useSelector((state) => state.auth); // Get token from Redux store (assuming you're storing it)

  const navigate = useNavigate();

  const onChange = (e) => {
    if(e.target.name==='image'){
      // console.log(e.target.files[0]);
      setPostData({...postData,[e.target.name]:e.target.files[0]})
      return;
    }
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // console.log('data',postData);
        const formData =new FormData();
        formData.append('title',postData.title)
        formData.append('description',postData.description)
        formData.append('image',postData.image)
        formData.append('rating',postData.rating)
        const storedString = localStorage.getItem("user");
        const user = JSON.parse(storedString);
        const token=user.token;
        if(!token){
          console.log('token does not authenticated');
          
        }
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,// Pass JWT token in the request header
            // Pass the token for authorization
          },
        };
        const res=await axios.post(`${API_URL}/api/posts`,formData,config)
        if(res){
          console.log("new post added");
        }
      navigate('/dashboard'); // Redirect to the dashboard after post creation
    } catch (err) {
      console.error('Error creating post', err);
    }   
  };

  return (
    <div className="new-post">
      <h2>Create New Post</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={title} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={description} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input type="file" name="image" accept='image/*'   onChange={onChange} />
        </div>
        <div>
          {/* {console.log(postData.image)} */}
          {/* {postData.image=="" || postData.image==null ? "" : <img src={postData.image} width={100} height={100}/>} */}
        </div>
        <div className="form-group">
          <label>Rating</label>
          <input type="number" name="rating" value={rating} onChange={onChange} required min="1" max="10" />
        </div>
        <button type="submit" className="btn">Create Post</button>
      </form>
      <button>
        <Link to='/'>Home</Link>
      </button>
    </div>
  );
};

export default NewPost;
