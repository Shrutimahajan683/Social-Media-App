import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Createpost=()=>{
  const history=useHistory()
  const [title,setTitle]=useState("")
  const [body,setBody]=useState("")
  const [image,setImage]=useState("")
  const [url,setUrl]=useState("")
  useEffect(()=>{
    if(url)
    {
      fetch("http://localhost:5000/createpost",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            title,
            body,
            pic:url
           })
       }
       ).then(res=>res.json())
       .then(data=>{
           
           if(data.error)
          M.toast({html: data.error,classes:"#e57373 red lighten-2"})
          else
          {
              M.toast({html:"Created post",classes:"#b2dfdb teal lighten-4"})
              history.push('/')
          }
       }).catch(err=>{
           console.log(err)
       })
    }
  },[url])

const postDetails=()=>{
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
  



return(
    <div className="card input-filled"
    style={{
        margin:"30px auto",
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"
    }}
    >
         <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)} />
         <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)} />
         <div className="file-field input-field">
      <div className="btn">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
      
    </div>
    <button className="btn waves-effect waves-light" 
     onClick={()=>postDetails()}>
       Submit Post
  </button>
    </div>
)
}

export default Createpost