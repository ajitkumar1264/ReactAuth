import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "./Home.css";

function Register() {


    const [first, setfirst] = useState({name:"",email:"",password:""});

    const nav=useNavigate();

    const handleonchange=(e)=>{
        e.preventDefault();
        setfirst({...first,[e.target.name]:e.target.value})
      }

      const registerhandle=async()=>{

        await fetch("http://localhost:4000/auth/regi",{
          method:"POST",
          headers:{
            "Content-type":"application/json; charset=utf-8",
          },
          body:JSON.stringify(first)
        }).then((res)=>{
            return res.json();
        }).then((resp)=>{
          console.log(resp)
          if(resp.Register){
            alert("User Registered Successfully!");
            nav("/login");
          }
         
        }).catch((err)=>{
            console.log(err.message);
        })

      }

  return (
    <>
    
    <div className='con1'>
    <h1>Register Page</h1>
    <input type="text" name="name" onChange={(e)=>handleonchange(e)} placeholder="Enter the Name" />  <br /> <br />
    <input type="email" name="email" onChange={(e)=>handleonchange(e)} placeholder="Enter the Email Address" /> <br /> <br />
    <input type="password" name="password" onChange={(e)=>handleonchange(e)} placeholder="Enter the password" /> <br /> <br />
    <button onClick={registerhandle}>Register</button>

  </div>
    
    </>
  )
}

export default Register