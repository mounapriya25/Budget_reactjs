
import React from "react";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";

import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import Menu from "@mui/icons-material/MenuOutlined"

import MoneyBagOutlined from "@mui/icons-material/MonetizationOnOutlined";

import DonutSmallOutlined from "@mui/icons-material/DonutSmallOutlined";  // Donut chart
import DataUsageOutlined from "@mui/icons-material/DataUsageOutlined";    // Data usage icon


import Dot from "@mui/icons-material/MoreHoriz";

 // Calculator Icon
function Trail() {
    return (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", padding: "20px" }}>
             <h1>Budget Planner</h1>
            <div style={{ display: "flex", justifyContent: "center", gap: "30px", padding: "20px" }}>
                <div>
                    <AccountBalanceWalletOutlinedIcon style={{ fontSize: 60, color: "#4CAF50" }} />
                    <p>Wallet</p>
                </div>
                <div>
                    <AttachMoneyOutlinedIcon style={{ fontSize: 60, color: "#2196F3" }} />
                    <p>Transactions</p>
                </div>
                <div>
                    <SavingsOutlinedIcon style={{ fontSize: 60, color: "#FF9800" }} />
                    <p>Savings</p>
                </div>
                <div>
                    <PieChartOutlinedIcon style={{ fontSize: 60, color: "#9C27B0" }} />
                    <p>Budget Analysis</p>
                    <Menu style={{ fontSize: 60, color: "#9C27B0" }}/>
                </div>
            </div>
            <div>
                <FactCheckOutlinedIcon style={{ fontSize: 50, color: "#4CAF50" }} />
                <p>Records</p>
            </div>
            <div>
                <AnalyticsOutlinedIcon style={{ fontSize: 50, color: "#FF5722" }} />
                <p>Analysis</p>
            </div>
            <div>
                <AccountBalanceWalletOutlinedIcon style={{ fontSize: 50, color: "#2196F3" }} />
                <p>Budget</p>
            </div>
            <div>
                <AccountCircleOutlinedIcon style={{ fontSize: 50, color: "#9C27B0" }} />
                <p>Accounts</p>
            </div>
            <div>
                <CategoryOutlinedIcon style={{ fontSize: 50, color: "#FFC107" }} />
                <p>Categories</p>
            </div>
            <div>
                <SearchOutlinedIcon style={{ fontSize: 50, color: "#607D8B" }} />
                <p>Search</p>
            </div>
            <div>
                <SettingsOutlinedIcon style={{ fontSize: 50, color: "#795548" }} />
                <p>Settings</p>
            </div>
            <div>
                <DeleteOutlineIcon style={{ fontSize: 50, color: "#F44336" }} />
                <p>Delete</p>
            </div>
            <div>
                <FileDownloadOutlinedIcon style={{ fontSize: 50, color: "#009688" }} />
                <p>Export</p>
            </div>
            <div>
                <RestoreOutlinedIcon style={{ fontSize: 50, color: "#673AB7" }} />
                <p>Backup & Restore</p>
            </div>
            <div>
                <AccountBalanceOutlinedIcon style={{ fontSize: 50, color: "#4CAF50" }} />
                <p>Accounts</p>
            </div>
            <div>
                <SavingsOutlinedIcon style={{ fontSize: 50, color: "#FF5722" }} />
                <p>Budget</p>
            </div>
            <div>
                <PieChartOutlineIcon style={{ fontSize: 50, color: "#2196F3" }} />
                <p>Analysis</p>
            </div>
           
            
            <div>
                <DonutSmallOutlined style={{ fontSize: 50, color: "#FF5722" }} />
                <p>Analysis</p>
            </div>
            <div>
                <DataUsageOutlined style={{ fontSize: 50, color: "#2196F3" }} />
                <p>Data</p>
            </div>

            <div>
                <Dot style={{ fontSize: 50, color: "#2196F3" }} />
                <p>Dot</p>
            </div>
        </div>
    );
}

export default Trail;