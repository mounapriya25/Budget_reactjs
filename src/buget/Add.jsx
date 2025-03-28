import React from 'react'
import "./add.css"
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
function Add() {
  return (
    <div>
        <div className='box'>
            {/*heading  */}
            <center> <h1 style={{color:"blue"}}>New Record</h1></center>
            <form>
                {/*<label><input type="radio" />in</label><br/>*/}
                <form class="radio-container">
                    <label><input type="radio" name="choice" value="income"/>INCOME</label>
                    <label><input type="radio" name="choice" value="expense"/>EXPENSES</label>
                    <label><input type="radio" name="choice" value="transfer"/>TRANSFER</label>
                </form>
                    <button className='ac' name='account' >
                        <AccountBalanceWalletOutlinedIcon   style={{fontSize:"30px",float:"left", margin:"8px 0px 0px 30px " }}  />
                        <p className='p'>Account</p></button>
                    <button className='ac' name='category'>
                        <CategoryOutlinedIcon   style={{fontSize:"30px",float:"left" ,margin:"8px 0px 0px 30px "}} />
                        <p className='p'>Category</p>
                    </button>
                   <textarea rows={5} cols={47} placeholder='Add notes' style={{padding:"20px 20px 0px " }}/>
                  <br/> <label>Value </label><br/> 
                   <input type='number' placeholder='Enter the value of amount' id='amount'/>
                   <br/> <label>Date </label><br/> 
                   <input type='date' name="date" id='amount'/>
                   <br/> <label>Time </label><br/> 
                   <input type='time' name='time' title="Time in HH:MM" id='amount'/>
                
            </form>
            <div style={{marginTop:30}}>
                <div className='h1'>
                    <button style={{backgroundColor:"red",borderColor:"red",borderRadius:5}}>Cancle</button>
                </div>
                <div style={{float:"right"}} className='h2'>
                <button>Save</button>
                </div>
            </div>
       
        </div>
    </div>
    
  ) 
}

export default Add
