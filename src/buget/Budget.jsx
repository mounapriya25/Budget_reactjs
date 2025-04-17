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
import  {BudgetDateft} from './Dateft.jsx'
import dayjs from "dayjs"
import Side from './side.jsx'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
//const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = process.env.REACT_APP_BACKEND_URL;
function Budget() {
  dayjs.extend(isSameOrAfter )
  dayjs.extend(isSameOrBefore )

  const em=localStorage.getItem("userEmail")
  console.log(em,"in category ");
  
  const currency=localStorage.getItem("currency")
  console.log(currency,"in rd ");
  const [dis, setDis] = useState("none");
  const ClickDis= () => {
    setDis("display");
  };

  
  const [tran, setTran]=useState([])
  const [Cat, setCat]=useState([])
  const [Bud, setBud]=useState([])
  const [TotalBud, setTotalBud]=useState([])
  const [visb, setvisb]=useState(null)
  const [frm, setFrm]= useState({
        email:em,
        category:null,
        limit:0,
        spent:0,
        id:null
  })
  const [currentDt,setcurrentDt]=useState(dayjs())

  const [operation ,setOperation]=useState("Set")
  const [totalBg ,setTotalBg]=useState({
    limit:0,
    spent:0
  })
  

  async function getTranRd(){
    const res = await axios.post(`${backendUrl}/getTranBg`,{em});
    console.log(res.data.tn)
    setTran(res.data.tn)
  }
  async function getCat(){
    const res = await axios.post(`${backendUrl}/getCatBg`,{em});
    console.log(res.data)
    setCat(res.data.cat)
  }
  async function getBugetRd(){
    const res = await axios.post(`${backendUrl}/getBudget`,{em});
    console.log(res.data.bg)
    setTotalBud(res.data.bg)
  }
  //filter data by date
  const getDate=(date)=>{
       const dt=dayjs(date)
       return dt;
       
     }
  const getRecordBydate=()=>{
       console.log(dayjs(currentDt),"ccccc")
       const start=currentDt.startOf('month')
       const end=currentDt.endOf('month')
       const res=TotalBud.filter((i)=>getDate(i.date).isSameOrAfter(start,'day') &&getDate(i.date).isSameOrBefore(end,'day'))
       setBud(res)
     }
  //set total buget and spent for header
  function total(){
    const limit=Bud.reduce((sum,i)=>sum+i.limit,0)
    const spent=Bud.reduce((sum,i)=>sum+i.spent,0)
    setTotalBg({limit:limit,spent:spent})
    console.log(totalBg)
  }
  
  
  useEffect(()=>{
    getTranRd();
    getCat();
    getBugetRd();

  },[])
  useEffect(()=>{
    console.log(frm)

  },[frm])
  useEffect(()=>{
    total()
    getRecordBydate()
  },[Bud])

  useEffect(()=>{
    getRecordBydate()
  },[currentDt])
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
    const res=await axios.delete(`${backendUrl}/deleteBudget`,{data:{id}})
    console.log(res.data)
    getBugetRd();
  
  }

   //frm submit
  const setData=(e,id)=>{
    e.preventDefault();
    const spt =tran.filter((i)=>(i.category?i.category._id:null)===id).reduce((sum,i)=>sum+i.amount,0);
      console.log(spt);
      setFrm({...frm,category:id,spent: spt})
      console.log(frm,"lllll")
  }

const frmsub=async(e,id)=>{
  e.preventDefault();

  console.log(frm)
  if(operation==="Set"){
    console.log(frm,"jjjjjjjjjjjjjjj")
    const rp=await axios.post(`${backendUrl}/addBudget`,frm);
    console.log(rp.data);
  }
  else{
    const rp=await axios.put(`${backendUrl}/updateBudget`,frm);
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
              <div><p style={{color:"rgb(78, 78, 80)"}}>Limit: <span style={{color:"rgb(68, 199, 74)"}}>{i.limit}{currency}</span></p></div>
              <div><p style={{color:"rgb(43, 43, 45)"}}>Spent: <span style={{color:"rgb(31, 152, 4)"}}>{i.spent}{currency}</span></p></div>
              <div><p style={{color:"rgb(43, 43, 45)"}}>Remaining: <span style={{color:"rgb(4, 125, 22)"}}>{i.limit-i.spent}{currency}</span></p></div>
              <div style={{float:"right"}} className='price-box'>{i.limit}{currency}
              <div className='triangle'></div>
              </div>
              
              <div><progress max={i.limit} value={i.spent} style={{ width: "90%",height: "30px",accentColor: (i.limit-i.spent)>0?"rgb(64, 61, 248)":"rgb(240, 27, 4)",marginBottom:"10px"}}></progress></div>
              <div style={{float:"right",paddingBottom:10,color:'red',paddingRight:0,display:(i.limit-i.spent)>0?"none":"block"}}>*Limit Exceeded</div>
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
            <div><Menu style={{ fontSize: 30, color: "white",margin:" 10px 20px",position:"fixed"}} onClick={ClickDis}/></div>
            <div style={{ fontSize: 28 ,fontWeight:900, paddingTop:10,paddingBottom:15}}>MoneyTrack</div>
            <div>{/*<SearchOutlinedIcon style={{ fontSize: 30, color: "white" ,margin:" 10px 20px"}} />*/}</div>
        </div>

        {/* date */}
        <div className='header2b' style={{backgroundColor:"white"}}>
          <div >
             <BudgetDateft currentDt={currentDt} setcurrentDt={setcurrentDt}/>
          </div>
          <div className=' h3' style={{lineHeight:"20px"}}>
            <div><span className='br1'>TOTAL BUDGET</span> </div>
            <div ><span  className='br2'>TOTAL SPENT</span></div>
            
          </div>
          <div className='h3 h4' style={{lineHeight:"30px"}}>
            <div><span  className='br1'style={{ color:" rgb(15, 161, 71)"}}><span>{totalBg.limit}</span>{currency}</span></div>
            <div><span className='br2' style={{ color:" rgb(247, 5, 5)"}}><span>{totalBg.spent}</span>{currency}</span></div>
            
          </div>

          {/* bottom icons*/}
        </div>
        <div className='bottom' >
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
          <div className='bt' style={{color:"blue"}}>
            <MoneyBagOutlined   style={{fontSize:"30px"}} />
            <p>Budget</p>
          </div>
          <div  className='bt' >
          <a href="/amount">
            <AccountBalanceWalletOutlinedIcon   style={{fontSize:"30px"}}  />
            <p>Account</p>
            </a>
          </div>
          <div style={{float:"left",marginRight:0}} className='bt' >
          <a href="/categories">
                <CategoryOutlinedIcon   style={{fontSize:"30px"}} />
                <p>Categories</p>
                </a>
            </div>
          
        </div>
        <Side dis={dis} setDis={setDis} style={{display:(dis!="none")?"block":"none"}}/>

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
