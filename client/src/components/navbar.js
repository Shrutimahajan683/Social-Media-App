import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const Navbar=()=>{
  const history=useHistory()
const {state,dispatch}=useContext(UserContext)
const renderList=()=>{
  if(state){
    return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Createpost</Link></li>,
        <li>
            <button className="btn waves-effect waves-light" 
        onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/login')
        }
        }
        >
       Logout
  </button>
        </li>
    ]
  }
  else{
    return [
      <li><Link to="/login">Login</Link></li>,
      <li><Link to="/signup">Signup</Link></li>
    ]
  }
}

 return(<nav>
    <div className="nav-wrapper" >
      <Link to={state?"/":"/login"} className="brand-logo left">Social Media App</Link>
      <ul id="nav-mobile" className="right ">
        {renderList()}
      </ul>
    </div>
  </nav>)
}

export default Navbar