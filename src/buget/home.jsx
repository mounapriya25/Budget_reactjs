import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

function Home() {

    const nav=useNavigate()
    useEffect(()=>{
      const storedEmail = Cookies.get("userEmail");
      console.log("cookie:", storedEmail);

    if (storedEmail) {
      localStorage.setItem("userEmail",storedEmail)
      console.log("Email from cookie:", storedEmail);
    }
    else{
      console.log("not founddd")
    }
      //nav("/rd");
  }, []);

  return (
    <div>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🎉 Welcome back,{storedEmail}</h2>
      <p>Redirecting you to your dashboard...</p>
    </div>
    </div>
    
  )
}

export default Home