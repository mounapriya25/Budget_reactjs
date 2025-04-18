import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
//const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrl = process.env.REACT_APP_BACKEND_URL;


function Profile() {
   const nav=useNavigate()
   const location=useLocation()
   const em=localStorage.getItem("userEmail")
   console.log(em,"in pr ");
   const [resPass,setResPass]=useState("")
  const [activeTab, setActiveTab] = useState("");
  useEffect(()=>{
    if(location.state){
      setActiveTab(location.state.active)
    }
  })
  const [formData, setFormData] = useState({
    em:em,
    Name: '',
    email: '',
    phone: ''
  });
  const [Passform, setPassform] = useState({
    email: '',
    oldpassword:"",
    newpassword:""
  });


  const [Modeform, setModeform] = useState({
    em:em,
    mode:"",
    currency:""
   
  });

  const [Exportform, setExportform] = useState({
    em:em,
    from:dayjs(),
    to:dayjs()
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleChangepass = (e) => {
    e.preventDefault();
    setPassform({ 
      ...Passform,
      [e.target.name]: e.target.value 
    });
  };
  const Cancle = (e) => {
    e.preventDefault();
    nav("/rd");
  };
//Profile submit 
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res= await axios.put(`${backendUrl}/updateProfile`,formData)
        if(res.data.message==="sucess"){
          localStorage.setItem("userEmail",res.data.au.email)
          const u=localStorage.getItem("userEmail")
          console.log(u);
          nav("/rd")
        }
    }catch(err){
      console.log(err.message)
    }
    console.log('Saved data:', formData);
    // Add your saving logic here
  };

//change password
  const PasshandleSubmit = async(e) => {
    e.preventDefault();
    console.log('Saved data:', Passform);
    try{
      const res= await axios.put(`${backendUrl}/changePassword`,Passform)
      setResPass(res.data.message)
      if(res.data.message==="Password change successfully"){
        nav("/rd")
      }
  }catch(err){
    console.log(err.message)
  }
  };
/////////////
  const ChangeMode = (e) => {
    e.preventDefault();
    setModeform({ 
        ...Modeform,
        [e.target.name]: e.target.value 
      });
  };

  //change currency
  const currencySubmit = async(e) => {
    e.preventDefault();
    console.log('Saved data:', Modeform);
    try{
      const res= await axios.put(`${backendUrl}/changeCurrency`,Modeform)
      if(res.data.message==="successfully"){
        nav("/rd")
      }
      }catch(err){
        console.log(err.message)
      }
  };
  //change mode
  const ModeSubmit = async(e) => {
    e.preventDefault();
    console.log('Saved data:', Modeform);
    try{
      const res= await axios.put(`${backendUrl}/changeMode`,Modeform)
      if(res.data.message==="successfully"){
        nav("/rd")
      }
      }catch(err){
        console.log(err.message)
      }
  };
  
  
  //export
  const ChangeExp = (e) => {
    e.preventDefault();
    setExportform({ 
        ...Exportform,
        [e.target.name]: e.target.value 
      });
  };
  const ExportSubmit = async(e) => {
    e.preventDefault();
    console.log('Saved data:', Exportform);
    //learn
    try{
      const res= await axios.get(`${backendUrl}/exportpdf`,{params:Exportform,responseType:"blob"})
      const url= window.URL.createObjectURL(new Blob([res.data]))
      const a=document.createElement('a')
      a.href=url
      a.download="transaction.pdf"
      document.body.appendChild(a)
      a.click()
      a.remove()
      }catch(err){
        console.log(err.message)
      }
  };

  //reset
  const ResetSubmit = async(e) => {
    e.preventDefault();
  
    try{
      const res= await axios.delete(`${backendUrl}/reset`,{data:{em}})
      if(res.data.message==="successfully"){
        const income=localStorage.setItem("Income",0)
        const expense=localStorage.setItem("Expense",0)
        nav("/rd")
      }
      }catch(err){
        console.log(err.message)
      }
  };
  const DelSubmit = async(e) => {
    e.preventDefault();
  
    try{
      const res= await axios.delete(`${backendUrl}/deleteAllRd`,{data:{em}})
      if(res.data.message==="successfully"){
        nav("/rd")
      }
      }catch(err){
        console.log(err.message)
      }
  };

  const LogoutSubmit = (e) => {
    e.preventDefault();
    localStorage.clear()
    nav("/login")
  };
  function profile(){
    return (
        <div className="form-card">
          <h2 style={{color:"blue"}}>Profile Information</h2>
          <form onSubmit={handleSubmit} className='prform' >
    
            <label > Name</label><br/>
            <input
              type="text"
              name="Name"
              placeholder="Name"
              value={formData.lastName}
              onChange={handleChange}
               className='input'
              
            /><br/>
          <label className='label'>Email Address</label><br/>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
               className='input'
            /><br/>
            
            <label className='label'>Phone Number</label><br/>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
               className='input'
            /><br/>

            <button type="submit" className='button1'>Save</button>
            <div style={{float:"right"}}><button style={{backgroundColor:"red",border:"none"}} onClick={Cancle} className='canc'>Cancle</button></div>
          </form>
        </div>
    )
  }


  function password(){
    return (
        <div className="form-card">
          <h2 style={{color:"blue"}}>Password & Security</h2>
          <form onSubmit={PasshandleSubmit} className='prform'>
          <label className='label'>Email Address</label><br/>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={Passform.email}
              onChange={handleChangepass}
               className='input'
               required
            /><br/>

            <label className='label'>Current Password</label><br/>
            <input
              type="password"
              name="oldpassword"
              placeholder="Current Password"
              value={Passform.oldpassword}
              onChange={handleChangepass}
               className='input'
               required
            /><br/>

            <label className='label'>New Password</label><br/>
            <input
              type="password"
              name="newpassword"
              placeholder="New Password"
              value={Passform.newpassword}
              onChange={handleChangepass}
               className='input'
               required
            /><br/>
            <p>{resPass}</p>


            <button type="submit"  className='button1'>Save</button>
            <div style={{float:"right"}}><button style={{backgroundColor:"red",border:"none"}} onClick={Cancle} className='canc'>Cancle</button></div>
          </form>
        </div>
    )
  }

  //currency
  function currency(){
    return (
        <div className="form-card">
          <h2 style={{color:"blue"}}>Set Currency</h2>
          <form onSubmit={currencySubmit} className="currency-form prform">
        <h4>Select Currency Sign:</h4><br />

        <label><input type="radio" name="currency" value="₹" checked={Modeform.currency==="₹"} onChange={ChangeMode}/>Rupee (₹)</label><br />
        <label><input type="radio" name="currency" value="$" checked={Modeform.currency==="$"} onChange={ChangeMode}/>US Dollar ($)</label><br />
        <label><input type="radio" name="currency" value="€" checked={Modeform.currency==="€"} onChange={ChangeMode}/>Euro (€)</label><br />
        <label><input type="radio" name="currency" value="£" checked={Modeform.currency==="£"} onChange={ChangeMode}/>Pound Sterling (£)</label><br />
        <label><input type="radio" name="currency" value="¥" checked={Modeform.currency==="¥"} onChange={ChangeMode}/>Yen (¥)</label><br /><br />

        <button type="submit" className='button1'>Save</button>
        <div style={{float:"right"}}><button style={{backgroundColor:"red",border:"none"}} className='canc' onClick={Cancle}>Cancle</button></div>
      </form>
        </div>
    )
  }

  function Mode(){
    return (
        <div className="form-card">
          <h2 style={{color:"blue"}}>Set Veiw Mode</h2>
          <form onSubmit={ModeSubmit} className="currency-form  prform">
        <h4>Select Mode</h4><br />

        <label><input type="radio" name="mode" value="daily" checked={Modeform.mode==="daily"} onChange={ChangeMode}/>Daily</label><br />
        <label><input type="radio" name="mode" value="weekly" checked={Modeform.mode==="weekly"} onChange={ChangeMode}/>weekly</label><br />
        <label><input type="radio" name="mode" value="monthly" checked={Modeform.mode==="monthly"} onChange={ChangeMode}/>Monthly</label><br />
       
        
        <button type="submit" className='button1'>Save</button>
        <div style={{float:"right"}}><button style={{backgroundColor:"red",border:"none"}} className='canc' onClick={Cancle}>Cancle</button></div>
      </form>
        </div>
    )
  }

  
  function Export(){
    return (
        <div className="form-card">
          <h2 style={{color:"blue"}}>Export Records</h2>
          <form onSubmit={ExportSubmit}  className='prform'>
            <label className='label' >From</label><br/>
            <input type="Date" name="from"  className='input' placeholder="From date" value={Exportform.from} onChange={ChangeExp}/><br/>
            <label className='label'>To</label><br/>
            <input type="Date" name="to" className='input'  placeholder="To date" value={Exportform.to} onChange={ChangeExp}/><br/>
            <div style={{float:"right",margin:"20px 20px"}}><button style={{backgroundColor:"blue",border:"none"}}   onClick={Cancle}>Cancle</button></div>
            <div><button style={{backgroundColor:"red",border:"none",margin:"20px 0px"}} type='submit'>PDF</button></div>
          
      </form>
        </div>
    )
  }
  function Reset(){
    return (
        <div className="form-card">
          <h2 style={{color:"blue"}}>Reset All</h2>
          <p style={{color:"rgb(107, 108, 112)",paddingLeft:40}}>Restting webapp to its initial state,deleting current records,accounts categories and budgets.Do you want to Reset ? </p>
          <form onSubmit={ResetSubmit}  className='prform'>
           
            <div style={{float:"right",margin:"0px 15px"}}><button style={{backgroundColor:"blue",border:"none"}}   onClick={Cancle}>Cancle</button></div>
            <div><button style={{backgroundColor:"red",border:"none"}} type='submit'>Yes</button></div>
          
      </form>
        </div>
    )
  }
  function Delete(){
    return (
        <div className="form-card">
          <h2 style={{color:"blue"}}>Delete All Records </h2>
          <p style={{color:"rgb(107, 108, 112)",paddingLeft:40}}>Delete all records ,but kepping current accounts ,categories and budgets. Do you want to Delete ? </p>
          <form onSubmit={DelSubmit}  className='prform'>
           
            <div style={{float:"right",margin:"0px 15px"}}><button style={{backgroundColor:"blue",border:"none"}} onClick={Cancle}>Cancle</button></div>
            <div><button style={{backgroundColor:"red",border:"none"}} type='submit'>Yes</button></div>
          
      </form>
        </div>
    )
  }
  
  
  function Logout(){
    return (
        <div className="form-card">
          <h2 style={{color:"blue"}}>Log out</h2>
          
          <p style={{color:"rgb(107, 108, 112)",paddingLeft:0,textAlign:"center"}}> Do you want to log out your account? </p>
          <form onSubmit={LogoutSubmit}  className='prform'>
           
            <div style={{float:"right",margin:"0px 15px"}}><button style={{backgroundColor:"blue",border:"none"}}  onClick={Cancle}>Cancle</button></div>
            <div><button style={{backgroundColor:"red",border:"none"}} type='submit'>Yes</button></div>
          
      </form>
        </div>
    )
  }

  return (
    <div className="settings-container">
       {activeTab==="profile" && (<div>{profile()}</div>)}
       {activeTab==="password" && (<div>{password()}</div>)}
       {activeTab==="currency" && (<div>{currency()}</div>)}
       {activeTab==="view" && (<div>{Mode()}</div>)}
       {activeTab==="export" && (<div>{Export()}</div>)}
       {activeTab==="reset" && (<div>{Reset()}</div>)}
       {activeTab==="delete" && (<div>{Delete()}</div>)}
       {activeTab==="logout" && (<div>{Logout()}</div>)}
      

      
    </div>
  );
}

export default Profile;
