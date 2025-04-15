import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const u=localStorage.getItem("userEmail")
    console.log(u,"in home ");
    const nav=useNavigate()
    useEffect(()=>{
      nav("/rd");
    },[nav])
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