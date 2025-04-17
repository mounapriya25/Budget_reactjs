import React, { useEffect } from 'react'
import "./add.css"
import {useState} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'


import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import axios from 'axios';
//const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = process.env.REACT_APP_BACKEND_URL;
function Add() {
    
    const[operation ,setOperation]=useState("")
    const [frm,setFrm]=useState({})
    const [cat,setCat]=useState([])//categories fetch from mg
    const [act,setAct]=useState([])//accounts fetch from mg
    const [acc2,setAcc2]=useState("Category");//Category or Account
    const nav=useNavigate()
    const location=useLocation()
    console.log(location.state)

    
   
//get cat and account
    const getDet=async()=>{
        try{
            const email=frm.email
            console.log(frm.email)
            const res=await axios.post(`${backendUrl}/getcatAcc`,{email})
            console.log(res.data)
            setCat(res.data.cat)
            setAct(res.data.acc)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        setFrm(location.state.frm);
        setOperation(location.state.operation)
        if((!frm.catId || operation!="Add" )&& frm.type==="Transfer" ){
            setAcc2("Account")
        }
        
    },[])

    useEffect(() => {
        console.log("Form changed:", frm)
    }, [frm])
    
    useEffect(() => {
        if(frm.email){
            getDet();
        } 

    }, [frm.email])
    
    
    //When you use curly braces {}, you're telling JavaScript you're writing a code block.
    //In that case, you must use return to return a value.
    //When you use parentheses (), it implicitly returns the result of the expression — you don’t need return.
    function getCat(){
        
        return cat.filter((i)=> i.type === frm.type).map((i)=>(
            <div>
                <div style={{borderRadius:"10px",padding:"10px 10px 10px 10px",backgroundColor: i._id===frm.catId? "rgb(135, 181, 240)" : "white",lineHeight:0,marginBottom:30}}>
                    <img src={i.icon} alt={i.name} width={40} style={{borderRadius:"30px"}} onClick={(e)=> { e.preventDefault(); setFrm({...frm,["catId"]:i._id})}}/>
                    <p style={{fontWeight:"bold",fontSize:18}}>{i.name}</p>
                    </div> 
            </div>
        ))
    }
    function getAct1(){
         return act.filter((i)=>i._id!=frm.accId2).map((i)=>(
                <div>
                    <div style={{borderRadius:"10px",padding:"20px 10px 10px 10px",backgroundColor:i._id===frm.accId1? "rgb(179, 206, 241)" : "white",lineHeight:"10px",marginBottom:30}}>
                        <img src={i.icon} alt={i.name} width={55} style={{borderRadius:"30px"}}  onClick={(e)=> { e.preventDefault(); setFrm({...frm,["accId1"]:i._id})}}/>
                        <p style={{fontWeight:"bold",fontSize:18}}>{i.name}</p>
                        </div> 
                </div>
            ))
    }
    function getAct2(){
       
         return act.filter((i)=>i._id!=frm.accId1).map((i)=>(
                <div>
                    <div style={{borderRadius:"10px",padding:"20px 10px 10px 10px",backgroundColor:i._id===frm.accId2? "rgb(179, 206, 241)" : "white",lineHeight:"10px",marginBottom:30}}>
                        <img src={i.icon} alt={i.name} width={55} style={{borderRadius:"30px"}}  onClick={(e)=> { e.preventDefault();setFrm({...frm,["accId2"]:i._id})}}/>
                        <p style={{fontWeight:"bold",fontSize:18}}>{i.name}</p>
                        </div> 
                </div>
            ))
    }
    //icon for categorory in transfer
    const icon = () => {
        if (acc2 === "Category") { 
          return (
            <CategoryOutlinedIcon style={{ fontSize: "30px", float: "left", margin: "8px 0px 0px 3%" }} />
          );
        } else {
            
          return (
            <AccountBalanceWalletOutlinedIcon style={{ fontSize: "30px", float: "left", margin: "8px 0px 0px 3%" }} />
          );
        }
      };

    //transefer -> category button or account button
   const secondButt=()=>{
    if (acc2 === "Category") {
        return(
            <button className='ac'  id="catgy" name='category' style={{color:frm.catId ? "blue":"grey"}} onClick={(e)=>e.preventDefault()}>
                {icon()}
                <p className='p'>{acc2}</p>
                <div className= "butclick2">
                    <div className='cat'>{getCat()}</div>
                </div>
            </button>
        )
    }
    else{
        return(
            <button className='ac'  id="catgy" name='category' style={{color:frm.accId2?"blue":"grey"}} onClick={(e)=>e.preventDefault()}>
                {icon()}
                <p className='p'>{acc2}</p>
                <div className= "butclick2">
                    <div className='cat'>{getAct2()}</div>
                </div>
            </button>
        )
    }
   }   
//form
    const inpfrm=(e)=>{
        e.preventDefault()
        setFrm({...frm,[e.target.name]:e.target.value})
        console.log(frm)
    }
    const frmsub=async(e)=>{
        e.preventDefault()
        console.log(frm)
        if(!frm.catId && frm.type!=="Transfer"){
            alert("Please select Category");
        }
        else if(!frm.accId1 ||(!frm.accId2 && frm.type==="Transfer")){
            alert("Please select Account");
        }
        else{
            if(operation==="Add"){
            const fres=await axios.post(`${backendUrl}/addRd`,frm)
            const upAm =await axios.put(`${backendUrl}/putAmInAdd`,frm)
           
            }else{
                const undoAm1 =await axios.put(`${backendUrl}/putAmInEdit`,frm)
                const fres =await axios.put(`${backendUrl}/updateRd`,frm)
                const upAm =await axios.put(`${backendUrl}/putAmInAdd`,frm)
            }
           // 
            nav("/rd")
        }
        
    }
// cancle
const cancle=(e)=>{
    e.preventDefault()
    nav("/rd")
}
  return (
    <div>
        <div className='box'>
            {/*heading  */}
            <center> <h1 style={{color:"blue"}}>{operation} Record</h1></center>
            <form onSubmit={frmsub} className='Addform'>
                {/*<label><input type="radio" />in</label><br/>*/}
                <div class="radio-container">
                    <label><input type="radio" name="type" value="Income" onChange={(e)=>{setAcc2("Category");inpfrm(e)}}  checked={frm.type==="Income"}/>INCOME</label>
                    <label><input type="radio" name="type" value="Expense"  onChange={(e)=>{setAcc2("Category");inpfrm(e)}}  checked={frm.type==="Expense"}/>EXPENSES</label>
                    <label><input type="radio" name="type" value="Transfer" onChange={(e)=>{setAcc2("Account");inpfrm(e)}} checked={frm.type==="Transfer"}/>TRANSFER</label>
                </div>
                    <button className='ac' name='account' id="act"  style={{color:frm.accId1?"blue":"grey"}} onClick={(e)=>e.preventDefault()}>
                        <AccountBalanceWalletOutlinedIcon   style={{fontSize:"30px",float:"left", margin:"8px 0px 0px 3% " }}  />
                        <p className='p'>Account</p>
                        <div className= "butclick1">
                            <div className='cat'>{getAct1()}</div>
                        </div>
                    </button>
                       {secondButt()} 
                    
                   <textarea rows={5} cols={40} placeholder='Add notes' style={{padding:"20px 20px 0px " }} name="note" value={frm.note} onChange={inpfrm} />
                   <br/> <label>Value </label><br/> 
                   <input type='number' placeholder='Enter the value of amount'  min="1" className='amount' name="value" value={frm.value} onChange={inpfrm} required/>
                   <br/> <label>Date </label><br/> 
                   <input type='date' name="date" className='amount' value={frm.date ? new Date(frm.date).toISOString().split("T")[0] : ""} onChange={inpfrm} required />
                   <br/> <label>Time </label><br/> 
                   <input type='time' name='time' title="Time in HH:MM" className='amount'  value={frm.time} onChange={inpfrm} required/>
                   <div style={{marginTop:30}}>
                        <div className='h1'>
                            <button style={{backgroundColor:"red",borderColor:"red",borderRadius:5}} onClick={cancle}>Cancle</button>
                        </div>
                        <div style={{float:"right"}} className='h2'>
                        <button type='submit'>Save</button>
                        </div>
                    </div>
                
            </form>
            
            
       
        </div>
    </div>
    
  ) 
}

export default Add
