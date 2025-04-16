import React, { useState,useEffect } from 'react'
import "./amount.css"
import Menu from "@mui/icons-material/MenuOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import DataUsageOutlined from "@mui/icons-material/DataUsageOutlined";    // Data usage icon
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MoneyBagOutlined from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import axios from "axios";
import Dot from "@mui/icons-material/MoreHoriz";
import Side from './side.jsx'
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Amount() {
   
    const em=localStorage.getItem("userEmail")
    console.log(em,"in category ");

    const currency=localStorage.getItem("currency")
    console.log(currency,"in rd ");
    const [dis, setDis] = useState("none");
    const ClickDis= () => {
      setDis("display");
    };


    const [fm,setfm]=useState({
      email:em,
      id:"",
      name:"",
      amount:0,
      icon:""
    })
    const [acc,setAcc]=useState([])
    const [operation ,setOperation]=useState("Add")
    const [totalAmount ,setTotalAmount]=useState(0)
    const income=localStorage.getItem("Income")
  const expense=localStorage.getItem("Expense")
  const [tran, setTran]=useState([])

  useEffect(()=>{
    getAm()
    getTranRd()
  },[])
  useEffect(()=>{
   totalAm()
  },[acc])
  

  async function getAm(){
    try{
      
      const res=await axios.post(`${backendUrl}/getAm`,{em})
      console.log(res.data.acc)
      //setAcc(res.data.acc)
      localStorage.setItem("am",JSON.stringify(res.data.acc));
      const s=JSON.parse(localStorage.getItem("am"))
      console.log(s,"jsonnnnn")
      setAcc(s)

    }catch(err){
      console.log(err)
    }
  }
  function totalAm(){
     const am= acc.reduce((sum,i)=>sum+i.amount,0)
     setTotalAmount(am)
     console.log(totalAmount)
     localStorage.setItem("amount",am)
  }
  async function getTranRd(){
    const res = await axios.post(`${backendUrl}/getTranBg`,{em});
    console.log(res.data.tn)
    setTran(res.data.tn)
  }

  
  const  disacc=()=>{
    console.log(acc,"body")
    return acc.map((i)=>(
     
      <div className='detail'>
      <div style={{position:'relative',bottom:"10px"}} ><img src={i.icon} alt={i.name} width={50} style={{borderRadius:"30px"}}  /></div> 
      <div className='dt' style={{marginBottom:20}}>
        <h3 style={{textAlign:"left"}}>{i.name}</h3>
        <p>Balance : <span>{i.amount}</span><span>{currency}</span></p>
      </div>
       <div className='dot'><div><Dot style={{ fontSize: 30, color: "rgb(5, 5, 251)" }} /></div>
        <div className='dropdn'>
            <div onClick={(e)=>{eidt(e,i._id,i.name,i.amount,i.icon)}}>Edit</div>
            <div onClick={(e)=>{delt(e,i._id)}}>Delete</div>
          </div>
        </div>
    </div>
      
    ))
  }
  const eidt=(e,id,name,amount,icon)=>{
    e.preventDefault()
    setOperation("Update")
    document.getElementById("addinp").style.display="block";
    setfm({...fm,id,name,amount,icon})
    

  }
  const delt=async(e,id)=>{
    e.preventDefault()
    const rp=await axios.delete(`${backendUrl}/delAm`,{data:{id}})
      console.log(rp.data)
      getAm()
  }
  const add=()=>{
    document.getElementById("addinp").style.display="block";
  }
  const formsub= async(e)=>{
    e.preventDefault();
    document.getElementById("addinp").style.display="none";
    if(operation==="Add"){
      const rp=await axios.post(`${backendUrl}/addAm`,fm)
      console.log(rp.data)
    }
    else{
      const rp=await axios.put(`${backendUrl}/putAm`,fm)
      console.log(rp.data)
      setOperation("Add")
      setfm({...fm,id:"",name:"",amount:0,icon:""})
    }
    
    getAm()

  }
  const inpfrm=(e)=>{
    e.preventDefault();
    setfm({...fm,[e.target.name]:e.target.value})
  }
  
  const cancel=()=>{
    document.getElementById("addinp").style.display="none";
  }
  const addicon=()=>{
    console.log(acc,"add")
    return acc.map((i)=>( 
        <div>
          <div style={{borderRadius:"10px",padding:"10px 10px 0px 10px",backgroundColor:i.icon===fm.icon? "rgb(175, 207, 249)" : "white"}}><img src={i.icon} alt={i.name} width={60} style={{borderRadius:"30px"}} onClick={()=> setfm({...fm,["icon"]:i.icon})}/></div> 
        </div>
    ))
  }
  return (
    <div>

      {/* header - money tracker*/}
        <div className='header'>
            <div><Menu style={{ fontSize: 30, color: "white",margin:" 10px 20px"}} onClick={ClickDis}/></div>
            <div style={{ fontSize: 28 ,fontWeight:900, paddingTop:10,paddingBottom:15}}>MoneyTrack</div>
            <div>{/*<SearchOutlinedIcon style={{ fontSize: 30, color: "white" ,margin:" 10px 20px"}} />*/}</div>
        </div>

        {/* date */}
        <div className='header2'>
         
          <div className=' ah3' style={{lineHeight:"10px",marginTop:25,color:" rgb(82, 83, 84)",fontWeight:"bold"}}>
            <div><span className='r1'>EXPENSE SO FAR</span> </div>
            <div ><span  className='r2'>INCOME SO FAR</span></div>
            <div ><span  className='r2'>TOTAL AMOUNT</span></div>
          </div>
          <div className='ah3 h4' style={{lineHeight:"38px"}}>
            <div><span  className='r1'style={{ color:" rgb(15, 161, 71)"}}><span>{expense?expense:"0"}</span>{currency}</span></div>
            <div><span className='r2' style={{ color:" rgb(247, 5, 5)"}}><span>{income?income:"0"}</span>{currency}</span></div>
            <div><span  className='r2'style={{ color:" rgb(15, 161, 71)"}}><span>{totalAmount}</span>{currency}</span></div>
          </div>

          {/* bottom icons*/}
        </div>
        <div className='bottom'>
          <div className='bt'  id="icon" >
          <a href="/rd">
            <FactCheckOutlinedIcon     style={{fontSize:"30px"}} />
            <p>Records</p>
            </a>
          </div>
          <div  className='bt'>
          <a href="/analysis">
            <DataUsageOutlined   style={{fontSize:"30px"}} />
            <p>Analysis</p>
            </a>
          </div>
          <div className='bt' >
          <a href="/budget">
            <MoneyBagOutlined   style={{fontSize:"30px"}} />
            <p>Budget</p>
            </a>
          </div>
          <div  className='bt' style={{color:"blue"}}>
            <AccountBalanceWalletOutlinedIcon   style={{fontSize:"30px"}}  />
            <p>Account</p>
          </div>
          <div style={{float:"left",marginRight:0}}   className='bt'>
          <a href="/categories">
                <CategoryOutlinedIcon   style={{fontSize:"30px"}} />
                <p>Categories</p>
                </a>
            </div>
          
        </div>

        <Side dis={dis} setDis={setDis} style={{display:(dis!="none")?"block":"none"}}/>
        {/*body*/}
         <div className='body' id='bbody'>
          <h3 style={{color:"rgb(61, 61, 62)",textAlign:"center"}}>ACCOUNTS</h3>
          <div>{disacc()}</div>
          <button id='add' className='button' onClick={add}>Add New Account</button>
         </div>
      {/*Add form  */}
      <div className='addinp' id="addinp">
            <center> <h2 style={{padding:20}}>{operation} Account</h2></center>
              <form onSubmit={formsub} >
                  
                  <label>Name : </label>
                  <input type='text' placeholder='Untitled' className='inp'  name="name" onChange={inpfrm} value={fm.name}  required style={{marginBottom:10,marginLeft:30}}/><br/>

                  <label>Amount : </label>
                  <input type='number' placeholder='0' className='inp'  name="amount" onChange={inpfrm} value={fm.amount} style={{marginBottom:10}} required/><br/>
                  
                  <div className='icn1'>
                      {addicon()}
                  </div>
                  <button style={{backgroundColor:"red",borderColor:"red",borderRadius:5 ,float:"left",margin:"20px 0px 0px 0px"}} className='lbt' onClick={cancel}>Cancle</button>
                  
                  <button  style={{backgroundColor:"green",borderColor:"green",borderRadius:5 ,float:"right", margin:"20px 60px 0px 0px"}} className='lbt' type='submit' >Save</button> 
              </form>
          </div>
        
    </div>
  )
}

export default Amount
