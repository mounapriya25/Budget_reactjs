import React from 'react'

function Home() {
    const u=localStorage.getItem("userEmail")
    console.log(u,"in home ");
  return (
    <div>home
      <div style={{ background: 'yellow', width: '300px', borderRadius: '5px', padding: '2px' }}>
      <progress
        max="100"
        value="50"
        style={{
          width: "300px",
          height: "20px",
          accentColor: "red", // Modern browsers support this
  }}
></progress>

        </div>
    </div>
    
  )
}

export default Home