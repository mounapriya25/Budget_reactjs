import React from "react";
import PieChartComponent from "./ExpensePieChart"
import icon from "./img/icons8-meal-48 (1).png"
import icon2 from "./img/icons8-cheque-48.png"


const Dashboard = () => {
    const userId = "1234567890abcdef"; // Replace with actual user ID

    return (
        <div className="App">
        <h1>Welcome to Budget Planner</h1>
        <PieChartComponent /> {/* Render the pie chart */}
       <img src={icon} width="50px"/>
       <img src={icon2} width="50px" style={{borderRadius:50}}/>

      </div>
    );
};const styles = {
  container: { width: "300px", textAlign: "center" },
  labelContainer: { display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "5px" },
  rangeBar: { 
      width: "100%", 
      height: "10px", 
      backgroundColor: "#e0e0e0", 
      borderRadius: "5px", 
      position: "relative",
      overflow: "hidden"
  },
  filledRange: { 
      height: "100%", 
      backgroundColor: "#4CAF50", 
      borderRadius: "5px"
  }
};

export default Dashboard;