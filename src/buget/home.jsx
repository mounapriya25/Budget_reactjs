import React from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const u=localStorage.getItem("userEmail")
    console.log(u,"in home ");
    const nav=useNavigate()
  return (
    <div>
       {nav("/rd")}
    </div>
    
  )
}

export default Home