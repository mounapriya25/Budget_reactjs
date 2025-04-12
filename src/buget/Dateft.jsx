import React from 'react'
import dayjs from 'dayjs'
import { useState,useEffect } from 'react'
function Dateft() {
  const [currentDt,setcurrentDt]=useState(dayjs())
  
  const headdate=(date)=>{
      return date.format("MMM DD, YYYY")
    }
    const prevdate=()=>{
      console.log("hello")
      const prev=currentDt.subtract(1,"day")
      setcurrentDt(prev)
      
    }
    const nextdate=()=>{
      console.log("hello")
      const prev=currentDt.add(1,"day")
      setcurrentDt(prev)
      
    }
  return (
    <div className="h">
          <div >
            <button id="gt" style={{ fontSize: 30 }} onClick={prevdate}>
              &lt;
            </button>
          </div>
          <div id="date" style={{ fontSize: 20 }}>
           {headdate(currentDt)}
          </div>
          <div>
            <button id="lt" style={{ fontSize: 30 }} onClick={nextdate}>
              &gt;
            </button>
          </div>
    </div>
  )
}

export default Dateft