import React from 'react'
import './lauth.css'
import {useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Sigin() {
    const [form,setForm]=useState({
        username:"",
        email:"",
        password:""
    })
    const [rp,setRp]=useState("")
    const nav=useNavigate()
    async function signfrm(e){
        e.preventDefault()
        console.log(form)
       // const resp=await axios.post("http://localhost:8000/siginform",form)
       const resp=await axios.post(`${backendUrl}/siginform`,form)
        setRp(resp.data.message)
        if(resp.data.message=="Sucessfully sigin"){
            localStorage.setItem("userEmail",resp.data.us.email)
            const u=localStorage.getItem("userEmail")
            console.log(u);
            nav("/home")
            setForm({
                username:"",
                email:"",
                password:""
            })
        }
        
    }
    function sfrm(e){
        e.preventDefault()
       setForm({...form,[e.target.name]:e.target.value})

    }
    function google(e){
        e.preventDefault();
        window.location.href=`${backendUrl}/auth/google`
    }
    function github(e){
        e.preventDefault();
        window.location.href=`${backendUrl}/auth/github`
    }
    
  return (
    <div className="login" style={{height:"580px"}}>
    <h2>Sign In </h2>
    
    
        <form onSubmit={signfrm}>
            <label className='label' >User name</label><br/>
            <input type="text" id="name" name="username" placeholder=" Enter your name" required  onChange={sfrm}/><br/>
        
                <label className='label'>Email</label><br/>
                <input type="Email" id="email" name="email" placeholder=" Enter email address" required onChange={sfrm}/><br/>
            
                <label className='label' >Password</label><br/>
                <input type="password" id="passwrd" name="password" placeholder="Enter your password" required onChange={sfrm}/><br/>
                <button type="submit" className="login-buttn">Sign in</button>
                <p style={{color:"red"}}>{rp}</p>
                <p className="switch-theme" style={{paddingLeft:"0px"}}>Already registered ? <a href="/login" style={{color:"blue"}}> Login</a></p>
                    
                <div className="divider">
                    <hr className="line"/>
                    <span>or</span>
                    <hr className="line" style={{marginRight: "60px"}}/>
                </div>
                </form>


                    <button className="authbutt" style={{marginLeft: "45px"}} onClick={google}>  <div>
                        <div className="butt" style={{paddingTop:"5px "}}><img src="https://i.pinimg.com/736x/68/3d/9a/683d9a1a8150ee8b29bfd25d46804605.jpg" width="23px" height="23px"/></div> 
                         <div className="butt" style={{paddingTop:"8px"}}>Google</div>
                     </div>
                     </button>
                    <button className="authbutt" onClick={github}>  <div>
                    <div className="butt" style={{paddingTop:"0px"}}><img src="https://static.vecteezy.com/system/resources/thumbnails/016/833/872/small/github-logo-git-hub-icon-on-white-background-free-vector.jpg" width="30px" height="30px"/></div> 
                        <div className="butt"  style={{paddingTop:"8px"}}>Git Hub</div>
                    </div>
                    </button>
                    
                
            
        
    
    
</div> 
  )
}

export default Sigin