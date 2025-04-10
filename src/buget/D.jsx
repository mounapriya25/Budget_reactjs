import React from "react";
import PieChartComponent from "./ExpensePieChart"



const Dashboard = () => {
    const userId = "1234567890abcdef"; // Replace with actual user ID

    return (
        <div className="App">
        <h1>Welcome to Budget Planner</h1>
        <PieChartComponent />  Render the pie chart 
     
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

