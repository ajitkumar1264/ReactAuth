import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Login() {

const [first, setfirst] = useState({email:"",password:""});

const nav=useNavigate();

const handleonchange=(e)=>{
  e.preventDefault();
  setfirst({...first,[e.target.name]:e.target.value})
}

const loginhandle=async()=>{
  
  await fetch("http://localhost:4000/auth/send",{
    method:"POST",
    credentials: 'include',
    headers:{
      "Content-type":" application/json; charset=utf-8",
    },
    body:JSON.stringify(first)
  }).then(response=>{
       return response.json();
  }).then((res)=>{
    console.log(res);
    if(res.login){
      alert("The User is Login Successfully!");
      nav('/');
    }
    else{
      if(res.err==="pass")
      {
        alert("password incorrect");
      }
      if(res.err==="Uexists")
      {
        alert("User not found")
      }
    }
  }).catch((err)=>{
    console.log(err.message);
  })
         
}
  return (
    <>
      <div className="con1">
      <h1> Login Page</h1>
        <input type="email" name="email" onChange={(e)=>handleonchange(e)} placeholder="Enter the Email Address" /> <br /> <br />
        <input type="password" name="password" onChange={(e)=>handleonchange(e)} placeholder="Enter the password" /> <br /> <br />
        <button onClick={loginhandle}>Login</button>

      </div>
    </>
  );
}

export default Login;
