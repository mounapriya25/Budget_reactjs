import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Colors for pie segments

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  // Fetch expenses from the backend API
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/expenses");
        setData(response.data); // Set expenses data from MongoDB
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

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
