
// src/App.js

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PostDetails from './components/PostDetails';
import NewPost from './components/NewPost';
import Upload from './components/Upload';



function App() {
  return (
    <Router>
      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home/>} />
      <Route path="/post/:id" element={<PostDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path='/upload' element={<Upload/>}/>
      <Route
        path="/new-post"
        element={
          <PrivateRoute>
            <NewPost />
          </PrivateRoute>
        }
      />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
    <Routes>
    <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
    </Router>
  );
}

export default App;
