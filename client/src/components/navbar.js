import React from 'react'
import {Link } from 'react-router-dom'

const Navbar=()=>{
 return(<nav>
    <div className="nav-wrapper" >
      <Link to="/" className="brand-logo left">Social Media App</Link>
      <ul id="nav-mobile" className="right ">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/create">Createpost</Link></li>
      </ul>
    </div>
  </nav>)
}

export default Navbar