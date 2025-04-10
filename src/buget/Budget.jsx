import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./budget.css"
import Menu from "@mui/icons-material/MenuOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import DataUsageOutlined from "@mui/icons-material/DataUsageOutlined";    // Data usage icon
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MoneyBagOutlined from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Dot from "@mui/icons-material/MoreHoriz";




function Budget() {
  const em = "mounaprikanikireddygari@gmail.com" ;
  const [tran, setTran]=useState([])
  const [Cat, setCat]=useState([])
  const [Bud, setBud]=useState([])
  const [visb, setvisb]=useState(null)
  const [frm, setFrm]= useState({
        email:"mounaprikanikireddygari@gmail.com",
        category:null,
        limit:0,
        spent:0,
        id:null
  })
  const [operation ,setOperation]=useState("Set")
  

  async function getTranRd(){
    const res = await axios.get("http://localhost:8000/getTranBg");
    console.log(res.data.tn)
    setTran(res.data.tn)
  }
  async function getCat(){
    const res = await axios.get("http://localhost:8000/getCatBg");
    console.log(res.data)
    setCat(res.data.cat)
  }
  async function getBugetRd(){
    const res = await axios.get("http://localhost:8000/getBudget");
    console.log(res.data.bg)
    setBud(res.data.bg)
  }
  useEffect(()=>{
    getTranRd();
    getCat();
    getBugetRd();
    

  },[])
  useEffect(()=>{
    console.log(frm)

  },[frm])
  //edit
  async function edit(e,id){
    e.preventDefault()
    console.log("Edittt")
    setOperation("Update")
    const i=Bud.find((it)=>it._id===id)
    if(i){
      setFrm({...frm,
        category:i.category._id,
        limit:i.limit,
        spent:i.spent,
        id:i._id})
        setvisb(i.category._id)
      }
  }
  //delete
  async function delt(e,id){
    e.preventDefault();
    console.log(id)
    const res=await axios.delete("http://localhost:8000/deleteBudget",{data:{id}})
    console.log(res.data)
    getBugetRd();
  
  }

   //frm submit
  const setData=(e,id)=>{
    e.preventDefault();
    const spt =tran.filter((i)=>i.category._id===id).reduce((sum,i)=>sum+i.amount,0);
      console.log(spt);
      setFrm({...frm,category:id,spent: spt})
      console.log(frm,"lllll")
  }

const frmsub=async(e,id)=>{
  e.preventDefault();

  console.log(frm)
  if(operation==="Set"){
    console.log(frm,"jjjjjjjjjjjjjjj")
    const rp=await axios.post("http://localhost:8000/addBudget",frm);
    console.log(rp.data);
  }
  else{
    const rp=await axios.put("http://localhost:8000/updateBudget",frm);
    console.log(rp.data);
  }
getBugetRd();
setOperation("Set");
setvisb(null);
}
const inp=(e)=>{

setFrm({...frm,[e.target.name]:e.target.value});
console.log(frm)
}

//display Budget records

function disBg(){
  return Bud.map((i)=>(
    <div>
         <div className="bdData">
            <div>
              <div style={{borderRadius:"10px",padding:"10px 10px 0px 10px",marginTop:10}}><img src={i.category.icon} width={60} style={{borderRadius:"30px"}} /></div> 
            </div>
            <div style={{lineHeight:"10px"}}>
              <div><p style={{fontSize:25,color:"rgb(11, 88, 242)",fontWeight:"bold"}}>{i.category.name}</p></div>
              <div><p style={{color:"rgb(78, 78, 80)"}}>Limit: <span style={{color:"rgb(68, 199, 74)"}}>{i.limit}₹</span></p></div>
              <div><p style={{color:"rgb(43, 43, 45)"}}>Spent: <span style={{color:"rgb(31, 152, 4)"}}>{i.spent}₹</span></p></div>
              <div><p style={{color:"rgb(43, 43, 45)"}}>Remaining: <span style={{color:"rgb(4, 125, 22)"}}>{i.limit-i.spent}₹</span></p></div>
              <div style={{marginLeft:"56%"}}>{i.limit}₹</div>
              <div><progress max={i.limit} value={i.spent} style={{ width: "300px",height: "30px",accentColor: (i.limit-i.spent)>0?"rgb(64, 61, 248)":"rgb(240, 27, 4)"}}></progress></div>
            </div>
            <div className='dot'>
              <div><Dot style={{color:"blue",marginTop:20}}/></div>
              <div className='drop'>
                <div onClick={(e)=>{edit(e,i._id)}}>Edit</div>
                <div onClick={(e)=>{delt(e,i._id)}}>Delete</div>
            </div>
            </div>
            <div>{visb===i.category._id && disfrm(i.category._id)  }</div>
          </div>
    </div>
  ))
}

  //display category
  function disCat(){
    return Cat.map((i)=>{
    const bg=Bud.find((j)=>j.category._id===i._id)
    if(bg){
      return null
    }
      return(
      <div>
            <div className='catB'>
              <div style={{borderRadius:"10px",padding:"10px 10px 0px 10px",marginTop:0,marginBottom:0}}><img src={i.icon} width={45} style={{borderRadius:"30px",marginTop:0}} /></div> 
              <div ><h3 style={{textAlign:"left",color:"black",marginTop:"20px"}}>{i.name}</h3></div>
              <div><button style={{backgroundColor:"rgb(242, 247, 247)",color:"blue",borderColor:"blue",marginTop:"15px",width:"100px"}} onClick={(e)=>{e.preventDefault();setvisb(i._id); setData(e,i._id)}}>Set Budget</button></div>
            </div>

          <div>{visb===i._id && disfrm(i._id)  }</div>
      </div>
    )})
  }

 
//frm
  function disfrm(id){
  
    return Cat.filter((i)=>i._id===id).map((i)=>(
      <div className='form'>
      <h3>{operation} Budget</h3>
      <form onSubmit={(e)=>{frmsub(e,i._id)}}>
        <button className='catfrm'>
          <div style={{float:"left",borderRadius:"10px",padding:"0px 20px 10px 20px",marginTop:10}}><img src={i.icon} width={60} style={{borderRadius:"30px"}} /></div> 
          <div ><h3 style={{float:"left",textAlign:"left",color:"black",marginTop:"32px",fontSize:20}}>{i.name}</h3></div>
        </button>
        <br/><label>Limit : </label><br/>
        <input type='number'  min="0" style={{width:"85%"}}  name='limit' value={frm.limit}  onChange={inp} required/>
        <button style={{backgroundColor:"red",borderColor:"red",borderRadius:5 ,float:"left",margin:"20px 0px 0px 0px",width:"100px"}} onClick={(e)=>{ e.preventDefault();setvisb(null)}}>Cancle</button>
        <button style={{backgroundColor:"blue",borderColor:"blue",borderRadius:5 ,float:"right",margin:"20px 50px 0px 0px" ,width:"100px"}} type="submit"  >Save</button>

      </form>
    </div>
    ))
  }
  return (
    <div className='Budget'>

      {/* header - money tracker*/}
        <div className='header'>
            <div><Menu style={{ fontSize: 30, color: "white",margin:" 10px 20px"}}/></div>
            <div style={{ fontSize: 28 ,fontWeight:900, paddingTop:10,paddingBottom:15}}>MoneyTrack</div>
            <div><SearchOutlinedIcon style={{ fontSize: 30, color: "white" ,margin:" 10px 20px"}} /></div>
        </div>

        {/* date */}
        <div className='header2'>
          <div className='h'>
            <div><span id='gt' style={{ fontSize: 30 }}>&lt;</span> </div>
            <div  id='date'style={{ fontSize: 20}}>Mar 24,2025</div>
            <div><span  id='lt' style={{ fontSize: 30}}>&gt;</span> </div>
          </div>
          <div className=' h3' style={{lineHeight:"20px"}}>
            <div><span id='r1'>TOTAL BUDGET</span> </div>
            <div ><span  id='r2'>TOTAL SPENT</span></div>
            
          </div>
          <div className='h3 h4' style={{lineHeight:"30px"}}>
            <div><span  id='r1'style={{ color:" rgb(15, 161, 71)"}}><span>0.00</span>$</span></div>
            <div><span id='r2' style={{ color:" rgb(247, 5, 5)"}}><span>0.00</span>$</span></div>
            
          </div>

          {/* bottom icons*/}
        </div>
        <div className='bottom' >
          <div className='bt'  id="icon" >
            <FactCheckOutlinedIcon     style={{fontSize:"30px"}} />
            <p>Records</p>
          </div>
          <div  className='bt'>
            <DataUsageOutlined   style={{fontSize:"30px"}} />
            <p>Data</p>
          </div>
          <div className='bt' style={{color:"blue"}}>
            <MoneyBagOutlined   style={{fontSize:"30px"}} />
            <p>Budget</p>
          </div>
          <div  className='bt' >
            <AccountBalanceWalletOutlinedIcon   style={{fontSize:"30px"}}  />
            <p>Wallet</p>
          </div>
          <div style={{float:"left"}} className='bt' >
                <CategoryOutlinedIcon   style={{fontSize:"30px"}} />
                <p>Categories</p>
            </div>
          
        </div>


        {/*body*/}
        <div className='body' style={{opacity:visb?0.8:1}}>
          <div>{disBg()}</div>
          <div>
            <h3 style={{color:"black"}}>Not bugeted this month</h3>
            <hr/>
            <div>{disCat()}</div>
            
          </div>
          
          </div>
        
    </div>
  )
}

export default Budget
