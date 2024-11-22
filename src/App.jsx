import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import NavBar from './components/inc/NavBar';
import ClientRegister from './components/views/ClientRegister/ClientRegister';
import BuzonQuejas from './components/views/BuzonQuejas/BuzonQuejas';
import Dashboard from './components/views/Dashboard/Dashboard';
import Landing from './components/views/Landing/Landing';
import Interactions from './components/views/interactions/Interactions';
import LoginPanel from './components/inc/Login/LoginPanel';
import Compras from './components/views/Compras/Compras';
import CuentaCorriente from './components/views/CuentaCorriente/CuentaCorriente';
// import Footer from './components/inc/Footer/Footer'
import Home from './components/views/Home/Home';
import UpdateProfile from './components/views/UpdateProfile/UpdateProfile';
import { useSelector, useDispatch } from "react-redux";
import * as actions from './redux/actions';
import React, { useEffect } from "react";

// Componente para manejar rutas protegidas
const ProtectedRoute = ({ children, loggedIn }) => {
  return loggedIn ? children : <Navigate to="/landing" />;
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const hiddenNavBarRoutes = ['/landing', '/dashboard'];
  const userId = localStorage.getItem("userId");
  const userRole = useSelector(state => state.user?.role || "guest"); 

  const loggedIn = useSelector(state => state.loggedIn);


  useEffect(() => {
    if (userId) {
      dispatch(actions.getUser(userId));
      // console.log(userRole.role)
    }
  }, [dispatch, userId]);

  return (
    <div className="app">
      {!hiddenNavBarRoutes.includes(location.pathname) && loggedIn && <NavBar />}
      <Routes>
        {/* Rutas para usuarios autenticados */}
        <Route path="/" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/client" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <ClientRegister />
          </ProtectedRoute>
        } />
 {

userRole && userRole === "admin" ? <Route path="/dashboard" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Dashboard />
          </ProtectedRoute>
        } /> :null
 }

        <Route path="/interactions" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Interactions />
          </ProtectedRoute>
        } />
        <Route path="/compras" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Compras />
          </ProtectedRoute>
        } />
        <Route path="/cuenta" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <CuentaCorriente />
          </ProtectedRoute>
        } />
        <Route path="/quejas" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <BuzonQuejas />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <UpdateProfile />
          </ProtectedRoute>
        } />

        {/* Rutas para usuarios no autenticados */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<LoginPanel />} />

        {/* Redirección de rutas no definidas */}
        <Route path="*" element={<Navigate to="/landing" />} />
      </Routes>
    </div>
  );
}

export default App;
