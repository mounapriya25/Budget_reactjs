import React from 'react'
import "./amount.css"
import Menu from "@mui/icons-material/MenuOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import DataUsageOutlined from "@mui/icons-material/DataUsageOutlined";    // Data usage icon
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MoneyBagOutlined from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
function Amount() {
  return (
    <div>

      {/* header - money tracker*/}
        <div className='header'>
            <div><Menu style={{ fontSize: 30, color: "white",margin:" 10px 20px"}}/></div>
            <div style={{ fontSize: 28 ,fontWeight:900, paddingTop:10,paddingBottom:15}}>MoneyTrack</div>
            <div><SearchOutlinedIcon style={{ fontSize: 30, color: "white" ,margin:" 10px 20px"}} /></div>
        </div>

        {/* date */}
        <div className='header2'>
         
          <div className=' h3' style={{lineHeight:"20px",marginTop:15}}>
            <div><span id='r1'>EXPENSE SO FAR</span> </div>
            <div ><span  id='r2'>INCOME SO FAR</span></div>
            <div ><span  id='r2'>TOTAL AMOUNT</span></div>
          </div>
          <div className='h3 h4' style={{lineHeight:"30px"}}>
            <div><span  id='r1'style={{ color:" rgb(15, 161, 71)"}}><span>0.00</span>$</span></div>
            <div><span id='r2' style={{ color:" rgb(247, 5, 5)"}}><span>0.00</span>$</span></div>
            <div><span  id='r2'style={{ color:" rgb(15, 161, 71)"}}><span>0.00</span>$</span></div>
          </div>

          {/* bottom icons*/}
        </div>
        <div className='bottom'>
          <div className='bt'  id="icon" >
            <FactCheckOutlinedIcon     style={{fontSize:"30px"}} />
            <p>Records</p>
          </div>
          <div  className='bt'>
            <DataUsageOutlined   style={{fontSize:"30px"}} />
            <p>Data</p>
          </div>
          <div className='bt' >
            <MoneyBagOutlined   style={{fontSize:"30px"}} />
            <p>Budget</p>
          </div>
          <div  className='bt' style={{color:"blue"}}>
            <AccountBalanceWalletOutlinedIcon   style={{fontSize:"30px"}}  />
            <p>Account</p>
          </div>
          <div style={{float:"left"}} className='bt' >
                <CategoryOutlinedIcon   style={{fontSize:"30px"}} />
                <p>Categories</p>
            </div>
          
        </div>


        {/*body*/}
         <div className='body'>
          <h3 style={{color:"rgb(61, 61, 62)",textAlign:"center"}}>Accounts</h3>
          



          <div id='details'>
            <div ><FactCheckOutlinedIcon     style={{fontSize:"30px",marginLeft:20}} /></div>
            <div className='dt' style={{marginBottom:20}}>
              <h3>Bill</h3>
              <p>Limit : <span>0.0</span><span>$</span></p>
              
            </div>
            <div>three</div>
          </div>
            <button id='add'>Add New Account</button>

          

          
         </div>

        
    </div>
  )
}

export default Amount
