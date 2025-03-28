import React from 'react'
//import "./record.css"
import Menu from "@mui/icons-material/MenuOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import DataUsageOutlined from "@mui/icons-material/DataUsageOutlined";    // Data usage icon
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import MoneyBagOutlined from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
function Category() {
  return (
    <div>

      {/* header - money tracker*/}
        <div className='header'>
            <div><Menu style={{ fontSize: 30, color: "white",margin:" 10px 20px"}}/></div>
            <div style={{ fontSize: 30 ,fontWeight:900, paddingTop:10,paddingBottom:15}}>MoneyTrack</div>
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
            <div><span id='r1'>EXPENSE</span> </div>
            <div ><span  id='r2'> INCOME</span></div>
            <div><span  id='r2'>BALANCE</span> </div>
          </div>
          <div className='h3 h4' style={{lineHeight:"30px"}}>
            <div><span id='r1' style={{ color:" rgb(247, 5, 5)"}} ><span>0.00</span>$</span></div>
            <div><span  id='r2'style={{ color:" rgb(15, 161, 71)"}}><span>0.00</span>$</span></div>
            <div><span id='r2' style={{ color:" rgb(247, 5, 5)"}}><span>0.00</span>$</span></div>
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
         <div className='body'>
          
         </div>
        
    </div>
  )
}

export default Category
