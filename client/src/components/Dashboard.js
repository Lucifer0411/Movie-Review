
// src/components/Dashboard.js

import UserPosts from './UserPosts';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../store/authSlice';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    // State to control whether the new component is shown or not
    const dispatch =useDispatch();
    // Function to handle button click
  
    const handleLogout=()=>{
      dispatch(logout())
      dispatch(reset())
      // navigate('/')
    }
  return (
    <div>
      <h1>My Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <button>
        <Link to='/'>Home</Link>
      </button>

      <Link to="/new-post" className="btn">Create New Post</Link>
      
      {/* Section for displaying the user's posts */}
      <section>
        <h2>My Posts</h2>
        <UserPosts />
      </section>

    </div>
  );
};

export default Dashboard;
