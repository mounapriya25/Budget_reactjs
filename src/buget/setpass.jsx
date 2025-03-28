import React from 'react'
import "./setpass.css"
import { useEffect,useState } from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'


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

    const resp=await axios.post("http://localhost:8000/setpass",pass, { withCredentials: true })
    if(resp.data){
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