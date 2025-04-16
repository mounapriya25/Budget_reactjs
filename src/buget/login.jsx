import React from 'react'
import './lauth.css'
import { useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", backendUrl); 
function Login() {
    const [form,setForm]=useState({
        email:"",
        password:""
    });

    const nav = useNavigate()
     const [resp,setResp]=useState("")

    function github(e){
        e.preventDefault()
        window.location.href=`${backendUrl}/auth/github`
    }
    function google(e){
        e.preventDefault()
        window.location.href=`${backendUrl}/auth/google`
    }
    async function loginform(event){
        event.preventDefault();
        console.log(form.email,form.password)
        const res=await axios.post(`${backendUrl}/loginform`,form)
        if(res.data.message=="success"){
            const rp=await axios.post(`${backendUrl}/home`,{},{headers:{Authorization:`Bearer ${res.data.token}`},
                withCredentials: true}) 
            console.log(rp)
            setResp(rp)
            if(rp.data.message=="successfully login"){
                localStorage.setItem("userEmail",rp.data.ud.email)
                const u=localStorage.getItem("userEmail")
                console.log(u);
                nav("/home")
                setForm({
                    email:"",
                    password:""
                })
            }
        }

    }
    
    function sform(event){
        event.preventDefault();
        setForm({...form,[event.target.name]:event.target.value});
    }
  return (
    
        <div className="login">
        <h2>Login </h2>
          <form onSubmit={loginform}>
                    <label  >Email</label><br/>
                    <input type="Email" id="email" name="email" placeholder=" Enter email address" onChange={sform}/><br/>
                
                    <label ><span>Password</span>
                     {/*   <span style={{color: "rgb(34, 139, 34)",float: "right", fontSize : "small", marginRight: "60px"}}>Forgot Password?</span>*/}
                    </label><br/>
                    <input type="password" id="passwrd" name="password" placeholder="Enter your password" required onChange={sform}/><br/>
                    <button type="submit" className="login-buttn">Login</button>
                    <p style={{color:"red"}}>{resp}</p>
                </form>  
                    
                    <p className="switch-theme">Don't have an account? <a href="/signin" style={{color:"blue"}}>Sign up</a></p>



                    <div className="divider">
                        <hr className="line" style={{marginLeft:"60px"}}/>
                        <span>or</span>
                        <hr className="line" style={{marginRight: "60px"}}/>
                    </div>
                    <button className="authbutt"  style={{marginLeft:"45px"}}onClick={(e)=>{google(e) }}>  <div>
                            <div className="butt" style={{paddingTop:"5px"}}><img src="https://i.pinimg.com/736x/68/3d/9a/683d9a1a8150ee8b29bfd25d46804605.jpg" width="23px" height="23px"></img></div> 
                             <div className="butt" style={{paddingTop:"8px"}}>Google</div>
                         </div>
                         </button>
                        <button className="authbutt" onClick={(e)=>{github(e) }}><div>
                        <div className="butt" style={{paddingTop:"0px "}}><img src="https://static.vecteezy.com/system/resources/thumbnails/016/833/872/small/github-logo-git-hub-icon-on-white-background-free-vector.jpg" width="30px" height="30px"></img></div> 
                            <div className="butt"  style={{paddingTop:"8px"}}>Git Hub</div>
                        </div>
                        </button>     
                    </div> 
    
  )
}
export default Login