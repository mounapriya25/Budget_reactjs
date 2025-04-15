import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './rd.css';
import Menu from '@mui/icons-material/MenuOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import DataUsageOutlined from '@mui/icons-material/DataUsageOutlined'; // Data usage icon
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import MoneyBagOutlined from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Delete from '@mui/icons-material/DeleteOutlined';
import Edit from '@mui/icons-material/EditOutlined';
import Close from '@mui/icons-material/CloseOutlined';
import Arrow from '@mui/icons-material/ArrowForwardOutlined';
import Error from '@mui/icons-material/ErrorOutlined';
import axios from "axios"
import dayjs from "dayjs"
import  Dateft from './Dateft.jsx'
import Side from './side.jsx'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'


function Rd() {

  dayjs.extend(isSameOrAfter )
  dayjs.extend(isSameOrBefore )


  const [currentDt,setcurrentDt]=useState(dayjs())
  
  
  const em=localStorage.getItem("userEmail")
  console.log(em,"in rd ");

  const currency=localStorage.getItem("currency")
  console.log(currency,"in rd ");

  const [startD, setstartD]=useState(dayjs())
  const mode=localStorage.getItem("mode")
  //const mode="weekly"
  console.log(mode,"in rd ");

  const [record,setRecord]=useState([])
  const [totalrecords,setTotalrecords]=useState([])
  const [subrecords,setsubrecords]=useState([])
  const nav=useNavigate()
  const [visibleId, setVisibleId] = useState(null);
  const [totalAm, setTotalAm] = useState({
    income:0,
    expense:0
  });
  
  
  const [dis, setDis] = useState("none");
  
  //get records
  const getRecord=async()=>{
    try{
      const res=await axios.post("http://localhost:8000/getRd",{em})
      console.log(res.data.rd)
      setTotalrecords(res.data.rd)
    }catch(err){
      console.log(err)

    }
  }

  //get settings
  const getSettings=async()=>{
    try{
      const res=await axios.post("http://localhost:8000/getSettings",{em})
      console.log(res.data.st)
      localStorage.setItem("theme",res.data.st.theme)
      localStorage.setItem("mode",res.data.st.mode)
      localStorage.setItem("currency",res.data.st.currency)
      
    }catch(err){
      console.log(err)

    }
  }
  //filter records by date
  const getDate=(date)=>{
      const dt=dayjs(date)
      return dt; 
    
    
  }


  const getRecordBydate=()=>{
    console.log(dayjs(currentDt),"ccccc")
    let res;
    if(mode==="daily"){
     
       res=totalrecords.filter((i)=>getDate(i.date).isSame(currentDt,'day'))
      console.log(res)
      setRecord(res)
    }
    else if(mode==="monthly"){
      const start=currentDt.startOf('month')
      const end=currentDt.endOf('month')
      setstartD(start)

       res=totalrecords.filter((i)=>getDate(i.date).isSameOrAfter(start,'day')&&getDate(i.date).isSameOrBefore(end,'day'))
      console.log(res)
      setsubrecords(res)
    }
    else {
      const start=currentDt.startOf('week').add(1,'day')
      const end=currentDt.endOf('week').add(1,'day')
      setstartD(start)

       res=totalrecords.filter((i)=>getDate(i.date).isSameOrAfter(start,'day')&&getDate(i.date).isSameOrBefore(end,'day'))
      console.log(res)
      setsubrecords(res)
    }
   
    
  }

  //display records based on date and mode
  function DateRd(){
    if(mode==="weekly"){
      let start=startD
      const end=start.add(7,'day')
      const rd=[];
      while(start.isSameOrBefore(end,"day")){
        const res=subrecords.filter((i)=>getDate(i.date).isSame(start,'day'))
        if(res.length>0){
          rd.push({date:start,rds:res})
        }
        start=start.add(1,'day')
      }
      return rd.map((i) => (
        <div key={i.date}>
          <h3>{formatDt(i.date)}</h3>
          <hr style={{ color: 'green', marginBottom: 0 }} />
          <div>{disRd(i.rds)}</div>
        </div>
       ));
    }
    
    else if(mode==="monthly"){
      let start=startD
      const end=start.endOf('month')
      const rd=[];
      while(start.isSameOrBefore(end,"day")){
        const res=subrecords.filter((i)=>getDate(i.date).isSame(start,'day'))
        if(res.length>0){
          rd.push({date:start,rds:res})
        }
        start=start.add(1,'day')
      }
      return rd.map((i) => (
        <div key={i.date}>
          <h3>{formatDt(i.date)}</h3>
          <hr style={{ color: 'green', marginBottom: 0 }} />
          <div>{disRd(i.rds)}</div>
        </div>
       ));
    }
    else {
      return(
        <div>
          <h3>{formatDt(currentDt)}</h3>
        <hr style={{ color: 'green', marginBottom: 0 }} />

        <div>{disRd(record)}</div></div>)
    }
    
  }
  useEffect(()=>{
    getRecord()
    getSettings()

  },[])
  useEffect(()=>{
    total()
  },[record,subrecords])

  useEffect(()=>{
   getRecordBydate()
  },[currentDt,totalrecords])

  
  function cancle(e,n){
    e.preventDefault()
    setVisibleId(null)
    
  }
  //total Expenses
  function total(){
    if(mode==="daily"){
      const exp=record.filter((i)=>i.typename==="Expense").reduce((sum,i)=>sum+i.amount,0)
      const inc=record.filter((i)=>i.typename==="Income").reduce((sum,i)=>sum+i.amount,0)
      setTotalAm({income:inc,expense:exp})
      console.log(inc," exp:",exp,totalAm)
    }
    else{
      console.log("dddddddddddddd")
      const exp=subrecords.filter((i)=>i.typename==="Expense").reduce((sum,i)=>sum+i.amount,0)
      const inc=subrecords.filter((i)=>i.typename==="Income").reduce((sum,i)=>sum+i.amount,0)
      setTotalAm({income:inc,expense:exp})
      console.log(inc," exp:",exp,totalAm)
    }
    
    
  }

  //date
  function disdate(d,t){
    const combined = `${d.split("T")[0]}T${t}:00`; // e.g., "2025-04-15T10:17:00"
  const date = new Date(combined);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata", // optional if you want to control timezone
  };

  return date.toLocaleString("en-US", options);
  }
 
  
  //edit
  function edit(e,id){

    const rd=record.find((i)=>i._id===id)
    if (!rd) return;
    const frm={
        email:em,
        id:rd._id,
        type:rd.typename,
        catId:rd.category?rd.category._id:null,
        accId1:rd.account1._id,
        accId2:rd.account2?rd.account2._id:null,
        note:rd.note,
        value:rd.amount,
        date:rd.date,
        time:rd.time
    }
    console.log(id,rd._id,frm)
   const operation="Update"
  
    nav("/add",{state:{frm,operation}})
  
  }
  function addRd(){
    const frm={
      email:em,
      id:"",
      type:"Income",
      catId:null,
      accId1:null,
      accId2:null,
      note:"",
      value:null,
      date:"",
      time:""
  }
  const operation="Add"
    nav("/add",{state:{frm,operation}})

  }
  async function delt(e,id){
    e.preventDefault()
    const undoAm1 =await axios.put("http://localhost:8000/putAmInEdit",{id})
    const rp= await axios.delete("http://localhost:8000/deleteRd",{data:{id}})
     
    getRecord()
  }
  const ClickDis= (e) => {
    e.preventDefault()
    setDis("display");
  };
//transfer
  const disTran=(id)=>{
    const rd=record.find((i)=>i._id===id)
    console.log(id,rd,"heiiii")
    /*if(rd.account2!=null && rd.typename==="Transfer"){
      console.log(rd,"hiiiii")
      return(
        
              <div>
                <div style={{float:"left"}}><Arrow style={{margin:" 5px 10px 0px ",color: 'rgb(143, 164, 249)'}} ></Arrow></div>
                
              <div style={{float:"left"}}><img src={rd.account2.icon} alt={rd.account2.name} width={28} style={{borderRadius:"10px",marginRight:10}}  /></div>
              <div style={{float:"left"}}><p style={{color: 'rgb(143, 164, 249)'}}>{rd.account2.name}</p></div>
            </div>
              
            
       
      )
    }*/
  }
  const formatDt=(date)=>{
    return dayjs(date).format('MMMM DD,dddd')
  }
  const dispTRanRd=(id)=>{
    const rd=record.find((i)=>i._id===id)
    console.log(id,rd,"heiiii")
    if(rd.account2!=null ){
      console.log(rd,"hiiiii")
      return(
        
              <div>
                <div style={{float:"left",marginLeft:"20%"}}><p>To Account2 :</p></div>
                <div style={{float:"left"}}><img src={rd.account2.icon} alt={rd.name} width={48} style={{borderRadius:"10px",margin:"10px 10px 20px 20px"}}  /></div>
                <p style={{float:"left",color:"rgb(89, 91, 94)"}}>{rd.account2.name}</p>
               
            </div>
       
      )
    }
    else{
      return(
        <div>
           <div style={{float:"left",marginLeft:"20%"}}><p>Category :</p></div>
          <div style={{float:"left"}}><img src={rd.category.icon} alt={rd.name} width={48} style={{borderRadius:"10px",margin:"10px 10px 20px 20px"}}  /></div>
          <p style={{float:"left",color:"rgb(89, 91, 94)"}}>{rd.category.name}</p>
        </div>
      )
    }
  }
  function disdt(id){
   
    return record.filter((i)=>i._id===id).map((i)=>(
      <div className='data' style={{display:"block"}} >
      <div className='data1' style={{backgroundColor:i.typename==="Expense"?"red":"blue"}}>
        <div>
          <Close style={{float:"left" ,margin:20}} onClick={(e)=>cancle(e,i.name)}></Close>
          <Edit style={{float:"right",margin:20}} onClick={(e)=>edit(e,i._id)}></Edit>
          <Delete style={{float:"right",margin:20}} onClick={(e)=>delt(e,i._id)}></Delete>
          
        </div>
          <p style={{color:"white",paddingTop:80}}>{i.typename}</p>
          <p style={{color:"white",fontSize:30,lineHeight:0}}>{i.amount}{currency}</p>
          <div style={{float:"right",marginRight:20}}>{disdate(i.date,i.time)}</div>
      </div>
      <div className='data2'>
        <div style={{float:"left",marginLeft:"20%"}}><p>Account : </p></div>
        <div style={{float:"left"}}><img src={i.account1.icon} alt={i.name} width={48} style={{borderRadius:"10px",margin:"10px 10px 20px 20px"}}  /></div>
        <p style={{float:"left",color:"rgb(89, 91, 94)"}}>{i.account1.name}</p>

        <div>{dispTRanRd(i._id)}</div>
       
        <p style={{float:"right",margin:"0px 30%",fontSize:"medium"}}>{i.note}</p>
      </div>
    </div>
    ))
  }
  //display records
  function disRd(DateRds){
    return DateRds.map((i)=>(
        <div className='trd'>
          <div className="labs" onClick={(e)=>{e.preventDefault(); setVisibleId(i._id)}}>
            <div className="labels">
            <div style={{position:'relative',bottom:"10px",top:"0px"}} ><img src={(i.typename!=="Transfer")?i.category.icon:"http://localhost:8000/images/icons8-exchange-96.png"} alt={i.name} width={50} style={{borderRadius:"30px"}}  /></div> 
            </div>
            <div className="labels name">
              <p style={{ fontSize: '18px', marginTop: '10px', fontWeight: 'bold', color: 'rgb(6, 54, 246)' }}>
              {/*{i.category?i.category.name:"Transfer"}*/}
              {(i.typename!=="Transfer")?i.category.name:"Transfer"}
              </p>
              <div>
                <div style={{float:"left"}}><img src={i.account1.icon} alt={i.name} width={28} style={{borderRadius:"10px",marginRight:10}}  /></div>
                <div style={{float:"left"}}><p style={{color: 'rgb(143, 164, 249)'}}>{i.account1.name}</p></div>
                <div>{disTran(i._id)}</div>
              </div>
              
              
            </div>
            <div style={{ float: 'right', color: 'red', margin: '15px 18px',fontWeight:"bold" }} className="amt">
              {i.amount}{currency}
            </div>
 
          </div> 
          <div>{visibleId === i._id && disdt(i._id)}</div>
          </div>
         
    ))}
  

  return (
    <div>
      {/* Header - Money Tracker */}
      <div className="header">
        <div>
          <Menu style={{ fontSize: 30, color: 'white', margin: '10px 20px' }} onClick={ClickDis}/>
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, paddingTop: 10, paddingBottom: 25 }}>
          MoneyTrack
        </div>
        <div>
          {/*<SearchOutlinedIcon style={{ fontSize: 30, color: 'white', margin: '10px 20px' }} />*/}
        </div>
      </div>

      {/* Date Section */}
      <div className="header2">
        <div >
          <Dateft currentDt={currentDt} setcurrentDt={setcurrentDt}/>
         
        </div>
       
        {/* Expense, Income, and Balance */}
        <div className='incomeh'>
        <div className='incomename'>
          <div >EXPENSES</div>
          <div>INCOME</div>
          <div>BALANCE</div>
        </div>
        <div className='incomename'>
          <span style={{ color: 'rgb(247, 5, 5)' }}  >{totalAm.expense}{currency}</span>
          <span style={{ color: 'rgb(15, 161, 71)' }}>{totalAm.income}{currency}</span>
          <span style={{ color: 'rgb(247, 5, 5)' }}>{totalAm.income-totalAm.expense}{currency}</span>
        </div>
        </div>
        </div> 
     
      
      {/* Bottom Icons */}
      <div className="bottom">
        <div className="bt" id="icon" style={{ color: 'blue' }} >
        
          <FactCheckOutlinedIcon style={{ fontSize: '30px' }} />
          <p>Records</p>
          
        </div>
        <div className="bt" >
        <a href="http://localhost:3000/analysis">
          <DataUsageOutlined style={{ fontSize: '30px' }} />
          <p>Analysis</p>
          </a>
        </div>
        <div className="bt" >
        <a href="http://localhost:3000/budget">
          <MoneyBagOutlined style={{ fontSize: '30px' }} />
          <p>Budget</p>
          </a>
        </div>
        <div className="bt" >
        <a href="http://localhost:3000/amount">
          <AccountBalanceWalletOutlinedIcon style={{ fontSize: '30px' }} />
          <p>Accounts</p>
          </a>
        </div>
        
        <div  className="bt" style={{ float: 'left' ,marginRight:"0px"}}   >
        <a href="http://localhost:3000/categories">
          <CategoryOutlinedIcon style={{ fontSize: '30px' }} />
          <p>Categories</p>
          </a>
        </div>
      </div>
      
      <Side dis={dis} setDis={setDis} className={`sidebar ${dis === "display" ? "display" : ""}`} />

        

      {/* Body */}
      <div className="body">
       {/*} <h3>{formatDt(Date.now())}</h3>
        <hr style={{ color: 'green', marginBottom: 0 }} />

        <div>{disRd()}</div>*/}
        <div>{DateRd()}</div>
        
        <div>
        <button className="addbt" onClick={addRd}>Add New Record</button>
      </div>
          <div>

          </div>
            
        </div>
      </div>
    
  );
}

export default Rd;
