import React, { useState } from 'react';
import "./side.css";
import { useNavigate } from 'react-router-dom';
import Profile from '@mui/icons-material/AccountCircleOutlined';
import BackArrow from '@mui/icons-material/ArrowBackIosOutlined';
import Lock from '@mui/icons-material/LockOutlined';
import FileExport from '@mui/icons-material/FileUpload';
import Reset from '@mui/icons-material/RestartAltOutlined';
import Notification from '@mui/icons-material/NotificationsOutlined'
import Logout from '@mui/icons-material/LogoutOutlined'
import ToggleOn from '@mui/icons-material/ToggleOn'
import ToggleOff from '@mui/icons-material/ToggleOff'
import Currrency from '@mui/icons-material/CurrencyExchangeOutlined'
import Veiw from '@mui/icons-material/DesignServicesOutlined';
import Color from '@mui/icons-material/PaletteOutlined'
import Delete from '@mui/icons-material/DeleteOutlined';

function Side({dis,setDis}) {
  const [active, setActive] = useState("");
  //const [dis, setDis] = useState("display");
  const em=localStorage.getItem("userEmail")
  console.log(em,"in pr ");

  const nav=useNavigate()
  const handleClick = (item) => {
    setActive(item);
    nav("/settings",{state:{active:item}})

  };
  const Click = () => {
    setDis("none");
  };

  //style={{color: active === "password" ? "blue" : "gray",
  return (
    <div className='side' style={{display:(dis!="none")?"block":"none"}}>
      <div>
      <div onClick={Click}><BackArrow style={{color: "gray",float:"right",margin:"0px 10px 0px 5px",fontSize:20}}/></div>
      <h3 style={{color:"blue"}}>MoneyTrack</h3>
      
      </div>
     
      

      <hr/>

      <div onClick={() => handleClick("profile")} >
        <Profile style={{color:"blue" ,float:"left",margin:"0px 10px 0px 5px"}}/>
        <p style={{color:  "black",fontWeight:"bold" }} >Profile</p>
        <p style={{color:  "blue" }} className='profile'>{em}</p>

      </div>
      <hr/>

      <h4>Settings</h4>

      <div onClick={() => handleClick("password")}>
        <Lock style={{color:"blue" ,float:"left",margin:"0px 10px 0px 5px"}} />
        <p style={{color: active === "password" ? "blue" : "black"}}>Change password</p>
      </div>

      <div onClick={() => handleClick("currency")}>
        <Currrency style={{color:"blue" ,float:"left",margin:"0px 10px 0px 5px"}} />
        <p style={{color: active === "currency" ? "blue" : "black"}}>Set Currency</p>
      </div>

      <div onClick={() => handleClick("view")}>
        <Veiw style={{color:"blue" ,float:"left",margin:"0px 10px 0px 5px"}} />
        <p style={{color: active === "view" ? "blue" : "black"}}>View Mode</p>
      </div>

      

      <hr/>
      <h4>Management</h4>

      <div onClick={() => handleClick("export")}>
        <FileExport style={{color:"blue" ,float:"left",margin:"0px 10px 0px 5px"}} />
        <p style={{color: active === "export" ? "blue" : "black"}}>Export records</p>
      </div>

      <div onClick={() => handleClick("reset")}>
        <Reset style={{color:"blue"  ,float:"left",margin:"0px 10px 0px 5px"}} />
        <p style={{color: active === "reset" ? "blue" : "black"}}>Reset All</p>
      </div>

      <div onClick={() => handleClick("delete")}>
        <Delete style={{color:"blue" ,float:"left",margin:"0px 10px 0px 5px"}} />
        <p style={{color: active === "delete" ? "blue" : "black"}}>Delete All Records</p>
      </div>

      <hr/>
      <div onClick={() => handleClick("notifications")}>
        <Notification style={{color:"blue"  ,float:"left",margin:"0px 10px 0px 5px"}} />
        <p style={{color: active === "notifications" ? "blue" : "black"}}>Notifications</p>
      </div>
    </div>
  );
}

export default Side;
