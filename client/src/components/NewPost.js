// src/components/NewPost.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NewPost = () => {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    image: '',
    rating: ''
  });
  // const [img ,setImg]=useState('');

  const { title, description, image, rating } = postData;
//   const { token } = useSelector((state) => state.auth); // Get token from Redux store (assuming you're storing it)
const storedString = localStorage.getItem("user");
const userData = JSON.parse(storedString);
const token=userData.token;
// console.log('token',token);

  const navigate = useNavigate();

  const onChange = (e) => {
    if(e.target.name=='image'){
      // console.log(e.target.files[0]);
      setPostData({...postData,[e.target.name]:e.target.files[0]})
      return;
    }
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  const convertToBase64=(e)=>{
    console.log(e);
    let reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=()=>{
      console.log(reader.result);
      setPostData({...postData,image:reader.result})
      
      // setImg(reader.result)
    };
    reader.onerror=error=>{
      console.log('Error:',error);
    };
    
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,// Pass JWT token in the request header
      }
    };

    try {
        // console.log('data',postData);
        const formData =new FormData();
        formData.append('title',postData.title)
        formData.append('description',postData.description)
        formData.append('image',postData.image)
        formData.append('rating',postData.rating)
      const res = await axios.post('http://localhost:8000/api/posts', formData, config); // Make API request to create a new post
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
