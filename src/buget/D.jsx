/*import React from "react";
import PieChartComponent from "./ExpensePieChart"
//import icon from "./img/icons8-meal-48 (1).png"
//import icon2 from "./img/icons8-cheque-48.png"


const Dashboard = () => {
    const userId = "1234567890abcdef"; // Replace with actual user ID

    return (
        <div className="App">
        <h1>Welcome to Budget Planner</h1>
        <PieChartComponent />  Render the pie chart 
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

export default Dashboard;*/


import React, { useState } from "react";
import axios from "axios";

const icons = [
  { name: "Car", path: "/icons/car.png" },
  { name: "Clothes", path: "/icons/clothes.png" },
  { name: "Food", path: "/icons/food.png" },
  { name: "Home", path: "/icons/home.png" },
  { name: "Shopping", path: "/icons/shopping.png" },
  { name: "Smoking", path: "/icons/smoking.png" },
  { name: "Movies", path: "/icons/movies.png" },
  { name: "Health", path: "/icons/health.png" },
  { name: "Security", path: "/icons/security.png" },
  { name: "Sports", path: "/icons/sports.png" }
];

const Dashboard = () => {
  const [categoryType, setCategoryType] = useState("expense");
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleSubmit = async () => {
    if (!categoryName || !selectedIcon) {
      alert("Please enter a category name and select an icon.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/save-category", {
        type: categoryType,
        name: categoryName,
        icon: selectedIcon
      });
      alert("Category saved successfully!");
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <div style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#fdf6e4", width: "300px" }}>
      <h3>Add new category</h3>

      {/* Category Type Selector */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <span
          onClick={() => setCategoryType("income")}
          style={{
            cursor: "pointer",
            fontWeight: categoryType === "income" ? "bold" : "normal"
          }}
        >
          INCOME
        </span>
        ✅
        <span
          onClick={() => setCategoryType("expense")}
          style={{
            cursor: "pointer",
            fontWeight: categoryType === "expense" ? "bold" : "normal"
          }}
        >
          EXPENSE
        </span>
      </div>

      {/* Category Name Input */}
      <input
        type="text"
        placeholder="Untitled"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
      />

      {/* Icon Selection Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", padding: "10px", border: "1px solid #ccc" }}>
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon.path}
            alt={icon.name}
            style={{
              width: "40px",
              height: "40px",
              cursor: "pointer",
              borderRadius: "50%",
              border: selectedIcon === icon.path ? "3px solid green" : "none"
            }}
            onClick={() => setSelectedIcon(icon.path)}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <button style={{ padding: "5px 10px", border: "1px solid green", background: "white", cursor: "pointer" }}>
          CANCEL
        </button>
        <button onClick={handleSubmit} style={{ padding: "5px 10px", background: "green", color: "white", cursor: "pointer" }}>
          SAVE
        </button>
      </div>
    </div>
  );
};

export default Dashboard ;