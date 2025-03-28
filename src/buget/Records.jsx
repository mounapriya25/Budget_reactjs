import React from 'react';
import './record.css';
import Menu from '@mui/icons-material/MenuOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import DataUsageOutlined from '@mui/icons-material/DataUsageOutlined'; // Data usage icon
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import MoneyBagOutlined from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

function Records() {
  return (
    <div>
      {/* Header - Money Tracker */}
      <div className="header">
        <div>
          <Menu style={{ fontSize: 30, color: 'white', margin: '10px 20px' }} />
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, paddingTop: 10, paddingBottom: 25 }}>
          MoneyTrack
        </div>
        <div>
          <SearchOutlinedIcon style={{ fontSize: 30, color: 'white', margin: '10px 20px' }} />
        </div>
      </div>

      {/* Date Section */}
      <div className="header2">
        <div className="h">
          <div>
            <span id="gt" style={{ fontSize: 30 }}>
              &lt;
            </span>
          </div>
          <div id="date" style={{ fontSize: 20 }}>
            Mar 24, 2025
          </div>
          <div>
            <span id="lt" style={{ fontSize: 30 }}>
              &gt;
            </span>
          </div>
         
        </div>
        </div>
        {/* Expense, Income, and Balance */}
        <div className='incomeh'>
        <div className='incomename'>
          <div >EXPENSES</div>
          <div>INCOME</div>
          <div>BALANCE</div>
        </div>
        <div className='incomename'>
          <span style={{ color: 'rgb(247, 5, 5)' }}  >0.00$</span>
          <span style={{ color: 'rgb(15, 161, 71)' }}>0.00$</span>
          <span style={{ color: 'rgb(247, 5, 5)' }}>0.00$</span>
        </div>
        </div>
        
     
      
      {/* Bottom Icons */}
      <div className="bottom">
        <div className="bt" id="icon" style={{ color: 'blue' }}>
          <FactCheckOutlinedIcon style={{ fontSize: '30px' }} />
          <p>Records</p>
        </div>
        <div className="bt">
          <DataUsageOutlined style={{ fontSize: '30px' }} />
          <p>Analysis</p>
        </div>
        <div className="bt">
          <MoneyBagOutlined style={{ fontSize: '30px' }} />
          <p>Budget</p>
        </div>
        <div className="bt">
          <AccountBalanceWalletOutlinedIcon style={{ fontSize: '30px' }} />
          <p>Accounts</p>
        </div>
        <div style={{ float: 'left' }} className="bt">
          <CategoryOutlinedIcon style={{ fontSize: '30px' }} />
          <p>Categories</p>
        </div>
      </div>
      <div>
        <button className="add" style={{ backgroundColor: 'white', color: 'blue' }}>
          +
        </button>
      </div>

      {/* Body */}
      <div className="body">
        <h3>Mar 25, Tuesday</h3>
        <hr style={{ color: 'green', marginBottom: 0 }} />
        <div>
          <div className="lab">
            <div className="labels">
              <DataUsageOutlined style={{ fontSize: '30px', margin: '10px' }} />
            </div>
            <div className="labels name">
              <p style={{ fontSize: '18px', marginTop: '15px', fontWeight: 'bold', color: 'green' }}>
                Home
              </p>
              <p>home</p>
            </div>
            <div style={{ float: 'right', color: 'red', margin: '15px 18px' }} className="amt">
              0000.0$
            </div>
          </div>

          <div className="lab">
            <div className="labels">
              <DataUsageOutlined style={{ fontSize: '30px', margin: '10px' }} />
            </div>
            <div className="labels name">
              <p style={{ fontSize: '18px', marginTop: '15px', fontWeight: 'bold', color: 'green' }}>
                Home
              </p>
              <p>home</p>
            </div>
            <div style={{ float: 'right', color: 'red', margin: '15px 18px' }}>0000.0$</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Records;
