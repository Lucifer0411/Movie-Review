import React from 'react'

import '../assets/style/Navbar.css'
import userIcon from '../assets/images/user.png'
import logo from '../assets/images/web-logo.png'

function Navbar() {
  return (
    <header>
  <nav class="navbar navbar-expand-md shadow-lg text-light py-2 px-4 navbar-fixed-bottom align-items-center">
    <a href="#brand" class="navbar-brand">
      <div class="container ">
        <img className='rounded' src={logo} style={{height:40}}/>
      </div>
    </a>
    <ul className='navbar-nav'>
      <li class="nav-item ">
          <a href="#home" class="nav-link active">My Library</a>
        </li>
      </ul>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarnav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end align-item-center" id="navbarnav">
        <form class="d-flex" role="search">
        <input class="form-control me-2 " type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <a href="#brand" class="navbar-brand">
      <div class="container">
        <img src={userIcon}/>
      </div>
    </a>
      
    </div>
  </nav>
</header>
  )
}

export default Navbar
