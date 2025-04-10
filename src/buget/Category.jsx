
import React, { useState, useEffect } from 'react';
import "./category.css";
import Menu from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import DataUsageOutlined from "@mui/icons-material/DataUsageOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MoneyBagOutlined from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Dot from "@mui/icons-material/MoreHoriz";
import axios from "axios";

 
function Category() {
  const [uscat, setUscat] = useState([]);
  const[operation,setOperation]=useState("Add");
  const [frm,setFrm]=useState({
    email:"mounaprikanikireddygari@gmail.com",
    uid:"",
    name:"",
    type:"Income",
    icon:""
  })



  const getCat= async()=>{
    try {
      const em = "mounaprikanikireddygari@gmail.com" ;
      console.log(em, "Fetching Categories...");
      const rep = await axios.post("http://localhost:8000/getCat", {em});
      if (rep.data) {
        setUscat(rep.data.categories || []);
      }
    } catch (err) {
      console.log("Error fetching categories:", err.message);
    }}

  useEffect(() => {
    getCat(); // Fetch categories automatically
    
      /*const em = "mounaprikanikireddygari@gmail.com" ;
      console.log(em, "Fetching Categories...");
       axios.post("http://localhost:8000/getCat", {em}).then(rep=>setUscat(rep.data.categories || [])).catch(err=>{console.log(err)})*/
     
   
  }, []);

  
    
  
//body
  const  getIncomeCategories=()=> {
    //for arrays 
    return uscat
      .filter((item) => item.type === "Income")
      .map((item) => (
        <div className='details' key={item.name} style={{paddingBottom:0}}>
           <div><img src={item.icon} alt={item.name} width={50} style={{borderRadius:"30px"}} /></div> 
          <div className='dt' ><h3 style={{paddingTop:20,color:"rgb(8, 8, 255)"}}>{item.name}</h3></div>
          <div className='dot'><div><Dot style={{ fontSize: 30, color: "rgb(5, 5, 251)" }} /></div>
      
          <div className='dropdn'>
            <div onClick={(e)=>{eidt(e,item._id,item.name,item.type,item.icon)}}>Edit</div>
            <div onClick={(e)=>{delt(e,item._id)}}>Delete</div>
          </div>
          </div>

        </div>
      ));
  }


  const getExpCat=()=>{
    return uscat.filter((i)=>i.type === "Expense").map((i)=>(
      <div className='details' key={i.name} style={{paddingBottom:0}}>
      <div><img src={i.icon} alt={i.name} width={50} style={{borderRadius:"30px"}} /></div> 
      <div className='dt' ><h3 style={{paddingTop:20,color:"hsl(240, 96.10%, 49.80%)"}}>{i.name}</h3></div>
      <div className='dot'><div><Dot style={{ fontSize: 30, color: "rgb(5, 5, 251)" }} /></div>
      
        <div className='dropdn'>
          <div onClick={(e)=>{eidt(e,i._id,i.name,i.type,i.icon)}}>Edit</div>
          <div onClick={(e)=>{delt(e,i._id)}}>Delete</div>
        </div>
      </div>
   </div>
    ))
  }
//add button
const add=()=>{
  document.getElementById("addinp").style.display="block";  
}



//add icon 
//value only works for form elements like <input>, <textarea>, and <select>. not for img
const addicon=()=>{
  return uscat.map((i)=>(
    <div>
      <div style={{borderRadius:"10px",padding:"10px 10px 0px 10px",backgroundColor:i.icon===frm.icon? "rgb(175, 207, 249)" : "white"}}><img src={i.icon} alt={i.name} width={40} style={{borderRadius:"30px"}} onClick={()=> setFrm({...frm,["icon"]:i.icon})}/></div> 
    </div>
    
  ))
}
//input form
function inpfrm(e){
  e.preventDefault();
  setFrm({...frm,[e.target.name]:e.target.value})
  console.log(frm)
}

async function formsub(e){
  e.preventDefault();
  document.getElementById("addinp").style.display="none";
  document.getElementById("bd").style.opacity=1;
  if(operation==="Add"){
    const res=await axios.post("http://localhost:8000/addCat",frm);
    console.log(res.data)
  }
  else{
    const ures=await axios.put("http://localhost:8000/updateCat",frm);
    console.log(ures.data)
  }
  getCat();

}
function cancel(e){
  e.preventDefault();
  document.getElementById("addinp").style.display="none";
  document.getElementById("bd").style.opacity=1;
}



//edit , delete
function eidt(e,id,name,type,icon){
  e.preventDefault();
  setOperation("Update");
  setFrm({ email:"mounaprikanikireddygari@gmail.com",uid:id,name,type,icon})
  document.getElementById("addinp").style.display="block";
  
}
//delete 
 async function delt(e,id){
  e.preventDefault();
  console.log(id)
  const res=await axios.delete("http://localhost:8000/deleteCat",{data:{id}})
  console.log(res.data)
  getCat();

}
  return (
    <div >
      <div  id="bd">
      {/* Header */}
      <div className='header'>
        <Menu style={{ fontSize: 30, color: "white", margin: "10px 20px" }} />
        <div style={{ fontSize: 28, fontWeight: 900, paddingTop: 10, paddingBottom: 15 }}>MoneyTrack</div>
        <SearchOutlinedIcon style={{ fontSize: 30, color: "white", margin: "10px 20px" }} />
      </div>

      {/* Summary */}
      <div className='header2'>
        <div className='h3' style={{ lineHeight: "10px", marginTop: 15 }}>
          <span id='r1'>EXPENSE SO FAR</span>
          <span id='r2'>INCOME SO FAR</span>
          <span id='r2'>TOTAL AMOUNT</span>
        </div>
        <div className='h3 h4' style={{ lineHeight: "10px" }}>
          <span id='r1a' style={{ color: "rgb(15, 161, 71)" }}>0.00₹</span>
          <span id='r2a' style={{ color: "rgb(247, 5, 5)" }}>0.00₹</span>
          <span id='r2a' style={{ color: "rgb(15, 161, 71)" }}>0.00₹</span>
        </div>
      </div>

      {/* Navigation Icons */}
      <div className='bottom'>
        <div className='bt lf' ><FactCheckOutlinedIcon style={{ fontSize: "30px" }} /><p>Records</p></div>
        <div className='bt'><DataUsageOutlined style={{ fontSize: "30px" }} /><p>Data</p></div>
        <div className='bt'><MoneyBagOutlined style={{ fontSize: "30px" }} /><p>Budget</p></div>
        <div className='bt'><AccountBalanceWalletOutlinedIcon style={{ fontSize: "30px" }} /><p>Account</p></div>
        <div  style={{ float: "left", color: "blue",lineHeight:"0px" }}><CategoryOutlinedIcon style={{ fontSize: "30px"}}/><p>Categories</p></div>
      </div>

      {/* Income Categories */}
      <div className='body' style={{marginTop:"190px"}}>
        <h3 style={{ color: "rgb(61, 61, 62)", textAlign: "center" }}>INCOME CATEGORIES</h3>
        <hr />
        <div id='inc' >{getIncomeCategories()}</div>
        
        {/* Add New Account Button */}
        
      </div>
      <div className='body' style={{marginTop:"40px"}}>
        <h3 style={{ color: "rgb(61, 61, 62)", textAlign: "center" }}>EXPENSES CATEGORIES</h3>
        <hr />
        <div id='inc' >{getExpCat()}</div>
        
        {/* Add New Account Button */}
        
      </div>
      <button id='add' onClick={add} >Add Categories</button>
      

    </div>
     {/*Add form  */}
    <div className='addinp' id="addinp">
      <center> <h2 >{operation} Category</h2></center>
        <form onSubmit={formsub} >
            {/*checked attribute is used for checkboxes and radio buttons to control their state dynamically.we must use checked  to explicitly control their selection.*/}
            <div class="radio-container" >
                <label><input type="radio" name="type" value="Income" onChange={inpfrm} checked={frm.type==="Income"} />INCOME</label>
                <label><input type="radio" name="type" value="Expense" onChange={inpfrm}  checked={frm.type==="Expense"}/>EXPENSES</label>
                
            </div>
            <label>Name : </label>
            <input type='text' placeholder='Untitled' className='inp'  name="name" onChange={inpfrm} value={frm.name}  required/><br/>
            <div className='icn'>
                {addicon()}
            </div>
            <button style={{backgroundColor:"red",borderColor:"red",borderRadius:5 ,float:"left",margin:"20px 0px 0px 0px"}} className='lbt' onClick={cancel}>Cancle</button>
            
            <button  style={{backgroundColor:"green",borderColor:"green",borderRadius:5 ,float:"right", marginRight:60}} className='lbt' type='submit' >Save</button> 
        </form>
    </div>
     {/*dot dp*/}
    

  </div>
  )
}

export default Category;
