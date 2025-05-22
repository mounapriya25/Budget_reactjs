import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Home() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
    async function em(){
      try{
      const res = await axios.get(`${backendUrl}/setemail`,{withCredentials:true})
       localStorage.setItem("userEmail",res.data.email)
       console.log(res.data.email)
      }catch(e){
        console.log(e)
      }
      
      //nav("/rd");
    }
    const nav=useNavigate()
    useEffect(()=>{
      em()
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🎉 Welcome back,</h2>
      <p>Redirecting you to your dashboard...</p>
    </div>
    </div>
    
  )
}

export default Home