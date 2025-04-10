import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Label } from "recharts";

const COLORS = ["rgb(6, 198, 241)","rgb(6, 225, 65)","rgba(247, 243, 1, 0.89)","rgba(248, 7, 59, 0.89)",,"rgba(246, 152, 3, 0.94)"]; // Colors for pie segments

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  // Fetch expenses from the backend API
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/expensesOverveiw");
        setData(response.data.rdE); // Set expenses data from MongoDB
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);
  //payload, is the original data object you passed into the chart.
  //entry-actual data it loop just like i,index is index like 0,1,2,..,key is just unique name to identify
    const customLabel = ({ x,y,payload }) => {
      <text
      x={x}
      y={y}
      dy={8}
      textAnchor="middle"
      fontSize={14}         // 👈 change this to your desired size
      fontWeight="bold"     // 👈 you can also use 600, 700, etc.
      fill="#333"
    >
      {`${payload.category.name}: ${payload.amount}`}
    </text>
    };
    
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Monthly Expenses</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={140}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="amount" // Use 'amount' as the data key
            nameKey="category.name"
            label={customLabel}
          >
            
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
              
          {/* Center text */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: "24px", fontWeight: "bold", fill: "#333" }}
          >
            Expenses
          </text>

          <Tooltip /> {/* Show tooltip on hover */}
        </PieChart>
      </ResponsiveContainer>
    </div>

  );
};

export default PieChartComponent;
