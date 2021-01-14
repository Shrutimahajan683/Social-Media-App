import React,{useState,useEffect} from 'react'
import {Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Login = ()=>{
    const history=useHistory()
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState(undefined)
    useEffect(()=>{
      if(url){
          uploadfields()
      }
    },[url])

    const uploadpic=()=>{
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","social-media-app")
        data.append("cloud_name","dxjlzpwzs")
        fetch("https://api.cloudinary.com/v1_1/dxjlzpwzs/image/upload",{
          method:"post",
          body:data
        })
        .then(res=>res.json())
        .then(data=>{
          setUrl(data.url)
        })
        .catch(err=>{
          console.log(err)
        })
    }
    const uploadfields=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "please add valid email id",classes:"#e57373 red lighten-2"})
            return
        }
        
        fetch("http://localhost:5000/signup",{
         method:"post",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
             name,
             password,
             email,
             pic:url
            })
        }
        ).then(res=>res.json())
        .then(data=>{
            if(data.error)
           M.toast({html: data.error,classes:"#e57373 red lighten-2"})
           else
           {
               M.toast({html:data.message,classes:"#b2dfdb teal lighten-4"})
               history.push('/login')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData=()=>{
        if(image){
            uploadpic()
        }
        else{
        uploadfields()
        }
        
    }
    return(
<div className="mycard">
<div className="card auth-card input-field">
        <h2>Social Media App</h2>
        <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
         <div className="file-field input-field">
      <div className="btn">
        <span>Upload pic</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
      
    </div>
        <button className="btn waves-effect waves-light"
        onClick={()=>PostData()} >
       Signup
  </button>
       <h5>
           <Link to="/login">Already have an account ?
           </Link>
       </h5>

      </div>
</div>
    )
  
}
export default Login