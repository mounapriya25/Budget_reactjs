import logo from './logo.svg';
import './App.css';
import Login from './buget/login';
import Sigin from './buget/sigin';
import Setpass from './buget/setpass';
import Home from './buget/home';
import Trail from './buget/Trail'

import Analysis from './buget/Data';
import Budget from './buget/Budget';
import Category from './buget/Category';
import Dashboard from './buget/D';
import Add from './buget/Add';
import Amount from './buget/amount';
import Rd from './buget/rd';

import {BrowserRouter as Router,Route,Routes} from "react-router-dom"


function App() {
  //localStorage.setItem("usem"," ");
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signin' element={<Sigin/>}></Route>
          <Route path='/setpasswrd' element={<Setpass/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/t" element={<Trail/>}></Route>
         
          <Route path="/analysis" element={<Analysis/>}></Route>
          <Route path="/budget" element={<Budget/>}></Route>
          <Route path="/categories" element={<Category/>}></Route>
          <Route path="/data" element={<Dashboard/>}></Route>
          <Route path="/add" element={<Add/>}></Route>
          <Route path="/amount" element={<Amount/>}></Route>
          <Route path="/rd" element={<Rd/>}></Route>


        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
