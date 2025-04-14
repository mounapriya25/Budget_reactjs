import React from 'react'
import dayjs from 'dayjs'
import { useState,useEffect } from 'react'


export function BudgetDateft({ currentDt, setcurrentDt }) {

  const headdate=(date)=>{
      return date.format("MMM DD, YYYY")
    }
    function prevDate(){
        return currentDt.subtract(1,"month")
    }
    const prevdate=()=>{
      console.log("hello")
      const prev=prevDate()
      setcurrentDt(prev)
      
    }

    function nextDate(){
       return currentDt.add(1,"month")
    }
    const nextdate=()=>{
      console.log("hello")
      const prev=nextDate()
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


function Dateft({ currentDt, setcurrentDt }) {

  const mode=localStorage.getItem("mode")
  console.log(mode,"in rd ");
  

  const [startWeek, setstartweek]=useState(dayjs().startOf('week').add(1,"day"))
  const [endWeek, setendweek]=useState(startWeek.add(6,"day"))

  const headdate=(date)=>{
      return date.format("MMM DD, YYYY")
    }

    const weekdate=(date)=>{
      return date.format("MMM DD")
    }
    function prevDate(){
      if(mode==="daily"){
        return currentDt.subtract(1,"day")
      }
      else if(mode==="weekly"){
        const newStart = startWeek.subtract(7, "day");
        setstartweek(newStart);
        setendweek(newStart.add(6, "day"));
        return newStart
      }
      else{
        return currentDt.subtract(1,"month")
      }
      
    }
    const prevdate=()=>{
      console.log("hello")
      const prev=prevDate()
      setcurrentDt(prev)
      
    }

    function nextDate(){
      if(mode==="daily"){
        return currentDt.add(1,"day")
      }
      else if(mode==="weekly"){
        const newStart = startWeek.add(7, "day");
        setstartweek(newStart);
        setendweek(newStart.add(6, "day"));
        return newStart;
      }
      else{
        return currentDt.add(1,"month")
      }
      
    }
    const nextdate=()=>{
      console.log("hello")
      const prev=nextDate()
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
           {mode!="weekly"?headdate(currentDt):`${weekdate(startWeek)}-${weekdate(endWeek)}`}
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