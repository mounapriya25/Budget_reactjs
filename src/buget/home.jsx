import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

function Home() {
   
    console.log(u,"in home ");
    const nav=useNavigate()
    useEffect(()=>{
      const storedEmail = Cookies.get("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      console.log("Email from cookie:", storedEmail);
    }
    
      nav("/rd");
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🎉 Welcome back, {u}!</h2>
      <p>Redirecting you to your dashboard...</p>
    </div>
    </div>
    
  )
}

export default Home