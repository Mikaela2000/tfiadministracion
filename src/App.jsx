import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/inc/NavBar';
import ClientRegister from './components/views/ClientRegister/ClientRegister';
// import BuzonQuejas from './components/views/BuzonQuejas/BuzonQuejas';
import Dashboard from './components/views/Dashboard/Dashboard';
import Landing from './components/views/Landing/Landing';
import Interactions from './components/views/interactions/Interactions';
import LoginPanel from './components/inc/Login/LoginPanel';
import Compras from './components/views/Compras/Compras';
import CuentaCorriente from './components/views/CuentaCorriente/CuentaCorriente';
import Footer from './components/inc/Footer/Footer'
import Home from './components/views/Home/Home'
import UpdateProfile from './components/views/UpdateProfile/UpdateProfile';
import { useSelector, useDispatch } from "react-redux";
import * as actions from './redux/actions'
import React, { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const hiddenNavBarRoutes = ['/landing', '/dashboard']; 
  const userId = localStorage.getItem("userId");
  console.log("soy el userid", userId)

  useEffect(() => {
    if (userId) {
      dispatch(actions.getUser(userId));
    }
  }, [dispatch, userId]); 

  return (
    <div className="app">
      {!hiddenNavBarRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/client" element={<ClientRegister />} />
        {/* <Route path="/buzon-quejas" element={<BuzonQuejas />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/interactions" element={<Interactions />} />
        <Route path="/login" element={<LoginPanel />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/cuenta" element={<CuentaCorriente />} />

        <Route path="/profile" element={<UpdateProfile />} />

      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
