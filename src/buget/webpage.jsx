import React from 'react'
import './web.css'
import { useNavigate } from 'react-router-dom'
function Webpage() {
    const nav=useNavigate()
    return (
    <div className="container">
      {/* Navbar */}
      <header className="navbar">
       {/*} <img src="https://play-lh.googleusercontent.com/u1QGESWPpl21kFphCFYP5JaHeAdDnxSA3g_PiGmG00LaYf4-dhpsjkHYyEUGGPkTnA" height="50px" weight="50"/>*/}
       <div className='lg'>
         <img src="https://liteapks.com/wp-content/uploads/2024/12/money-manager-expense-tracker.webp" height="50px" weight="50" style={{borderRadius:25,float:"left",margin:"10px 10px 10px 0px"}}/>
         <h1 className="logo" style={{float:"left"}}>MoneyTracker</h1>
       </div>
        

        <div className="auth-buttons">
          <button className="login-btnw" style={{border:"2px solid blue",padding:2}} onClick={() => nav('/login')}>Log in</button>
          <button className="login-btnw" style={{border:"2px solid blue",padding:2}} onClick={() =>nav('/signin' )}>Sigin in</button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="hero">
        <div className='wallet-icon' >
        <img src="https://liteapks.com/wp-content/uploads/2024/12/money-manager-expense-tracker.webp" height="200px" weight="200" style={{borderRadius:50}} className='wallet-icon'/>
        </div>
        <h2>Money Tracker</h2>
        <h3 style={{fontSize:20}}>Personal Budget Manager</h3>
        {/*<button className="login-btn" style={{border:"2px solid blue",padding:2,width:"170px",backgroundColor:"white",color:"blue"}} onClick={() =>nav('/signin' )}>Create Account</button>*/}
        <p>Manage your personal finances and easily track your money, expenses and budget</p>
        
      </section>

      {/* Overview Section */}
      <section className="overview">
        <h4 style={{color:"blue"}}>Overview</h4>
        
        <p className="intro">
          <strong>Money Tracker</strong> is a personal finance management web application designed to help users easily track their <strong>income, expenses, budgets, and savings</strong>. It empowers smarter financial decisions with real-time insights into spending habits.
        </p>
        <ul>
          <li><strong>Dashboard Overview:</strong> Visual summary of transactions, budgets, and balances.</li>
          <li><strong>Expense & Income Tracking:</strong> Categorized and detailed spending insights.</li>
          <li><strong>Budget Management:</strong> Set and track budget limits to avoid overspending.</li>
          
    
          <li><strong>Secure & Private:</strong> Your data is encrypted and login protected.</li>
        </ul>
        <p><strong>Why use Money Tracker?</strong></p>
        <ul>
          <li>Stay organized with everything in one place.</li>
          <li>Understand spending patterns and build good habits.</li>
          <li>Stick to goals with  budget limits.</li>
          <li>Access your finances anytime, from any device.</li>
        </ul>
      </section>
    </div>
  );
}


export default Webpage

