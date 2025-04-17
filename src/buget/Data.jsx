import React from 'react'
import "./record.css"
import Menu from "@mui/icons-material/MenuOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import DataUsageOutlined from "@mui/icons-material/DataUsageOutlined";    // Data usage icon
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MoneyBagOutlined from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from "recharts";
import dayjs from 'dayjs';
import  Dateft from './Dateft.jsx'
import Side from './side.jsx'
import Error from '@mui/icons-material/ErrorOutlined';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
//const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Analysis() {

  dayjs.extend(isSameOrAfter )
  dayjs.extend(isSameOrBefore )

  const [data, setData] = useState([]);
  const [totaldata, setTotaldata] = useState([]);
  const [RdData, setRdData] = useState([]);
  const [total, settotal]=useState(0);

  const em=localStorage.getItem("userEmail")
  console.log(em,"in home ");

  const currency=localStorage.getItem("currency")
  console.log(currency,"in rd ");

  const mode=localStorage.getItem("mode")
  const [startD, setstartD]=useState(dayjs())

  const [dis, setDis] = useState("none");
  const ClickDis= () => {
    setDis("display");
  };


  const [currentDt,setcurrentDt]=useState(dayjs())
  const [totalExp, setTotalExp] = useState({
      income:0,
      expense:0
    });
    

  // Fetch expenses from the backend API
  const fetchExpenses = async () => {
    try {
      console.log(em)
      const res=await axios.post(`${backendUrl}/getRd`,{em})
      console.log(res.data.rd)
      setTotaldata(res.data.rd); 
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  //filter data by date
 const getDate=(date)=>{
     const dt=dayjs(date)
     return dt;
     
   }
   const getRecordBydate=()=>{

     console.log(dayjs(currentDt),"ccccc")
     let res
        if(mode==="daily"){
          
            res=totaldata.filter((i)=>getDate(i.date).isSame(currentDt,'day'))
           console.log(res)
           setRdData(res)
           
         }
         else if(mode==="monthly"){
           const start=currentDt.startOf('month')
           const end=currentDt.endOf('month')
           setstartD(start)
     
            res=totaldata.filter((i)=>getDate(i.date).isSameOrAfter(start,'day')&&getDate(i.date).isSameOrBefore(end,'day'))
           console.log(res)
           setRdData(res)
         }
         else {
           const start=currentDt.startOf('week').add(1,'day')
           const end=currentDt.endOf('week').add(1,'day')
           setstartD(start)
     
           res=totaldata.filter((i)=>getDate(i.date).isSameOrAfter(start,'day')&&getDate(i.date).isSameOrBefore(end,'day'))
           console.log(res)
           setRdData(res)
         }
        
          const exp=RdData.filter((i)=>i.typename==="Expense")
          setData(exp)
         
   }

   //total expenses
   function totalexpCal(){
    const exp=RdData.filter((i)=>i.typename==="Expense").reduce((sum,i)=>sum+i.amount,0)
    const inc=RdData.filter((i)=>i.typename==="Income").reduce((sum,i)=>sum+i.amount,0)
    setTotalExp({income:inc,expense:exp})
    console.log(inc," exp:",exp,totalExp)
    
  }
  useEffect(() => {
    fetchExpenses();
  }, []);
  useEffect(() => {
    totalam();
    totalexpCal();
    getRecordBydate()// we are using it in another use Effect because react immediately update date ,so if i do like it updates amount when data changes
    /*if (data.length > 0) {
      totalam();
    }*/
  }, [data]);//[] it run this effect only once not when data changes
  
  useEffect(()=>{
    getRecordBydate()
  },[currentDt])

  //total amount
  const totalam=()=>{
    const t = data.reduce((sum, item) => sum + item.amount, 0);
  settotal(t);
  console.log(total,"total")
  }

 
  const COLORS = ["rgb(6, 198, 241)","rgb(6, 225, 65)","rgba(247, 243, 1, 0.89)","rgba(248, 7, 59, 0.89)",,"rgba(246, 152, 3, 0.94)"]; // Colors for pie segments
  //peichart for Expenses
  function RenderPieChart(){

    const customLabel = ({payload }) => {
      return `${payload.category.name}: ${currency}${payload.amount}`
    
    };
      return (
        <div style={{ width: "100%", height: 400 }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Monthly Expenses</h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="amount" // Use 'amount' as the data key
                nameKey="category.name"
                label={customLabel}
              >
                
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                 
                ))}
              </Pie>
                  
              {/* Center text */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: "24px", fontWeight: "bold", fill: "#333" }}
              >
                Expenses
              </text>

              <Tooltip /> {/* Show tooltip on hover */}
            </PieChart>
          </ResponsiveContainer>
        </div>

  )
}

//Range bar
function rnBar(){
  return data.map((i)=>(
    <div className='rnbar'>
     
      <div style={{position:'relative',bottom:"10px",top:"0px"}} ><img src={i.category.icon} alt={i.name} width={50} style={{borderRadius:"30px"}}  /></div> 
      <div className='pgbar' >
        <div>
          <div style={{float:"left",fontWeight:"bold",fontSize:"20px"}}>{i.category.name}</div>
          <div style={{float:"right",marginRight:"20%",fontWeight:"bold",color:"red"}}>-{i.amount}{currency}</div>
        </div>
        <div><progress max={total} value={i.amount} style={{ width: "90%",height: "30px",accentColor: "rgb(42, 133, 224)"}}></progress></div>
        
      </div>
      <div style={{fontWeight:"bold",color:"forestgreen"}}><p>{((i.amount / total) * 100).toFixed(2)}%</p></div>
    </div>
    
  ))
}
  
  return (
    <div>

      {/* header - money tracker*/}
        <div className='header'>
            <div><Menu style={{ fontSize: 30, color: "white",margin:" 10px 20px"}} onClick={ClickDis}/></div>
            <div style={{ fontSize: 28 ,fontWeight:700, paddingTop:10,paddingBottom:25}}>MoneyTrack</div>
            <div>{/*<SearchOutlinedIcon style={{ fontSize: 30, color: "white" ,margin:" 10px 20px"}} />*/}</div>
        </div>

        {/* date */}
        <div className='header2'>
          <div>{/*
            <div><span id='gt' style={{ fontSize: 30 }}>&lt;</span> </div>
            <div  id='date'style={{ fontSize: 20}}>{ftHeadDate()}</div>
            <div><span  id='lt' style={{ fontSize: 30}}>&gt;</span> </div>*/}
            <Dateft currentDt={currentDt} setcurrentDt={setcurrentDt}/>
          </div>
          <div className='incmh'>
        <div className='incmname'>
          <div >EXPENSES</div>
          <div>INCOME</div>
          <div>BALANCE</div>
        </div>
        <div className='incmname'>
          <span style={{ color: 'rgb(247, 5, 5)' }}  >{totalExp.expense?totalExp.expense:"0"}{currency}</span>
          <span style={{ color: 'rgb(15, 161, 71)' }}>{totalExp.income?totalExp.income:"0"}{currency}</span>
          <span style={{ color: 'rgb(247, 5, 5)' }}>{totalExp.income-totalExp.expense?totalExp.income-totalExp.expense:"0"}{currency}</span>
        </div>
        </div>
       
     
          {/* bottom icons*/}
        </div>
        <div className='bottom'>
          <div className='bt'  id="icon" >
          <a href="/rd">
            <FactCheckOutlinedIcon     style={{fontSize:"30px"}}/>
            <p>Records</p>
            </a>
          </div>
          <div  className='bt'  style={{ color:"blue"}}>
            <DataUsageOutlined   style={{fontSize:"30px"}} />
            <p>Analysis</p>
          </div>
          <div className='bt' >
          <a href="/budget">
            <MoneyBagOutlined   style={{fontSize:"30px"}} />
            <p>Budget</p>
            </a>
          </div>
          <div  className='bt' >
          <a href="/amount">
            <AccountBalanceWalletOutlinedIcon   style={{fontSize:"30px"}}  />
            <p>Accounts</p>
            </a>
          </div>
          <div style={{float:"left",marginRight:0}} className='bt' >
          <a href="/categories">
                <CategoryOutlinedIcon   style={{fontSize:"30px"}} />
                <p>Categories</p>
                </a>
            </div>
        
        </div>
        <div><Side dis={dis} setDis={setDis} style={{display:(dis!="none")?"block":"none"}}  className="overlay"/></div>
        
        


        {/*body*/}

        <div className="body">
          {data.length>0?(
            <div>
          {RenderPieChart()}
          
          <div className='rangebar'>
          <hr/>
           <div>
            {rnBar()}
           </div>
          </div></div>):(
            <div className='err'><Error style={{fontSize:"40px",margin:"20% 45% 0% "}} /><p style={{color:"rgb(133, 133, 137)",textAlign:"center"}}>No Expense Records Found</p></div>
          )}
        </div>


         
        
    </div>
  )
}

export default Analysis
