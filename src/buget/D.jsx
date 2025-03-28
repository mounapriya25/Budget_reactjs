import React from "react";
import PieChartComponent from "./ExpensePieChart"

const Dashboard = () => {
    const userId = "1234567890abcdef"; // Replace with actual user ID

    return (
        <div className="App">
        <h1>Welcome to Budget Planner</h1>
        <PieChartComponent /> {/* Render the pie chart */}
      </div>
    );
};

export default Dashboard;