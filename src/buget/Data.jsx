import React from 'react'
import "./Record.css"
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

function Analysis() {
  const [data, setData] = useState([]);
  const [total, settotal]=useState(0);
  const email=localStorage.getItem("userEmail")
  console.log(email,"in home ");
  const income=localStorage.getItem("Income")
  const expense=localStorage.getItem("Expense")
  

  // Fetch expenses from the backend API
  const fetchExpenses = async () => {
    try {
      console.log(email)
      const response = await axios.post("http://localhost:8000/expensesOverveiw",{email});
      setData(response.data.rdE); // Set expenses data from MongoDB
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
 
  useEffect(() => {
    fetchExpenses();
  }, []);
  useEffect(() => {
    totalam();// we are using it in another use Effect because react immediately update date ,so if i do like it updates amount when data changes
    /*if (data.length > 0) {
      totalam();
    }*/
  }, [data]);//[] it run this effect only once not when data changes
  
  const totalam=()=>{
    const t = data.reduce((sum, item) => sum + item.amount, 0);
  settotal(t);
  console.log(total,"total")
  }

 
  const COLORS = ["rgb(6, 198, 241)","rgb(6, 225, 65)","rgba(247, 243, 1, 0.89)","rgba(248, 7, 59, 0.89)",,"rgba(246, 152, 3, 0.94)"]; // Colors for pie segments
  //peichart for Expenses
  function RenderPieChart(){

    const customLabel = ({payload }) => {
      return `${payload.category.name}: ₹${payload.amount}`
    
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
          <div style={{float:"right",marginRight:"230px",color:"red"}}>-{i.amount}₹</div>
        </div>
        <div><progress max={total} value={i.amount} style={{ width: "300px",height: "30px",accentColor: "rgb(42, 133, 224)"}}></progress></div>
        
      </div>
      <div><p>{((i.amount / total) * 100).toFixed(2)}%</p></div>
    </div>
    
  ))
}
  
  return (
    <div>

      {/* header - money tracker*/}
        <div className='header'>
            <div><Menu style={{ fontSize: 30, color: "white",margin:" 10px 20px"}}/></div>
            <div style={{ fontSize: 28 ,fontWeight:700, paddingTop:10,paddingBottom:25}}>MoneyTrack</div>
            <div><SearchOutlinedIcon style={{ fontSize: 30, color: "white" ,margin:" 10px 20px"}} /></div>
        </div>

        {/* date */}
        <div className='header2'>
          <div>{/*
            <div><span id='gt' style={{ fontSize: 30 }}>&lt;</span> </div>
            <div  id='date'style={{ fontSize: 20}}>{ftHeadDate()}</div>
            <div><span  id='lt' style={{ fontSize: 30}}>&gt;</span> </div>*/}
            <Dateft/>
          </div>
          <div className='incmh'>
        <div className='incmname'>
          <div >EXPENSES</div>
          <div>INCOME</div>
          <div>BALANCE</div>
        </div>
        <div className='incmname'>
          <span style={{ color: 'rgb(247, 5, 5)' }}  >{expense?expense:"0"}₹</span>
          <span style={{ color: 'rgb(15, 161, 71)' }}>{income?income:"0"}₹</span>
          <span style={{ color: 'rgb(247, 5, 5)' }}>{income-expense?income-expense:"0"}₹</span>
        </div>
        </div>
       
     
          {/* bottom icons*/}
        </div>
        <div className='bottom'>
          <div className='bt'  id="icon" >
          <a href="http://localhost:3000/rd">
            <FactCheckOutlinedIcon     style={{fontSize:"30px"}}/>
            <p>Records</p>
            </a>
          </div>
          <div  className='bt'  style={{ color:"blue"}}>
            <DataUsageOutlined   style={{fontSize:"30px"}} />
            <p>Analysis</p>
          </div>
          <div className='bt' >
          <a href="http://localhost:3000/budget">
            <MoneyBagOutlined   style={{fontSize:"30px"}} />
            <p>Budget</p>
            </a>
          </div>
          <div  className='bt' >
          <a href="http://localhost:3000/amount">
            <AccountBalanceWalletOutlinedIcon   style={{fontSize:"30px"}}  />
            <p>Accounts</p>
            </a>
          </div>
          <div style={{float:"left"}} className='bt' >
          <a href="http://localhost:3000/categories">
                <CategoryOutlinedIcon   style={{fontSize:"30px"}} />
                <p>Categories</p>
                </a>
            </div>
        
        </div>
        <div ><button className='add' style={{backgroundColor:'white',color:"blue"}}>+</button></div>


        {/*body*/}

        <div className="body">
          {RenderPieChart()}
          
          <div className='rangebar'>
          <hr/>
           <div>
            {rnBar()}
           </div>
          </div>
        </div>


         
        
    </div>
  )
}

export default Analysis
