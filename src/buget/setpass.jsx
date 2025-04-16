import React from 'react'
import "./setpass.css"
import { useEffect,useState } from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
//const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = process.env.VITE_BACKEND_URL;
function Setpass(){
  const [pass,setPass]=useState({
    pass:" "
  });

  const navigate=useNavigate()
  function p(event){
    event.preventDefault()
    setPass({...pass,[event.target.name]:event.target.value})
    console.log(pass,"hiiii")
  }
  async function passwrd(event){
    event.preventDefault()
    console.log(pass,"hiiii")

    const resp=await axios.post(`${backendUrl}/setpass`,pass, { withCredentials: true })
    if(resp.data){
      localStorage.setItem("userEmail",resp.data.us.email)
      const u=localStorage.getItem("userEmail")
            console.log(u);
      navigate("/home")
    }
  }
  return (
    <div className='set'> 
    <h3 >Set Password</h3>
    <form id="pass" onSubmit={passwrd}>
        <br/><label>Password</label><br/>
        <input type="password" placeholder=" Password" name="pass" style={{color: "black"}} id="passwrd" required onChange={p}/><br/>
        <button type="submit"> Submit </button>
    </form>
    </div>
  )
}

export default Setpass