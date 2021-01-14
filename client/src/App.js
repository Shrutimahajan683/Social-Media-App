import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/home'
import Login from './components/screens/login'
import Signup from './components/screens/signup'
import Profile from './components/screens/profile'
import Createpost from './components/screens/createpost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribesUserPosts'

export const UserContext=createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
   const user=JSON.parse(localStorage.getItem("user"))
   if(user){
     dispatch({type:"USER",payload:user})
    
   }
   else{
     history.push('/login')
   }
  },[])
  return(
    <Switch>
    <Route exact path="/">
    <Home />
  </Route>
  <Route path="/login">
    <Login />
  </Route>
  <Route path="/signup">
    <Signup />
  </Route>
  <Route exact path="/profile">
    <Profile />
  </Route>
  <Route path="/create">
    <Createpost />
  </Route>
  <Route path="/profile/:userid">
    <UserProfile />
  </Route>
  <Route path="/myfollowingposts">
    <SubscribedUserPosts />
  </Route>
  </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
   <Navbar />
   <Routing />
   </BrowserRouter>
   </UserContext.Provider>
  );
}

export default App;
