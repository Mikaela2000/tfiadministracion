import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/inc/NavBar';
import ClientRegister from './components/views/ClientRegister/ClientRegister';
import HistorialCompras from './components/views/HistorialCompras/HistorialCompras'
import BuzonQuejas from './components/views/BuzonQuejas/BuzonQuejas';
import Dashboard from './components/views/Dashboard/Dashboard';
import Landing from './components/views/Landing/Landing'

function App() {

  const location = useLocation();
  return (

    <div className="app">
      {/* Mostrar NavBar solo si la ruta no es '/landing' */}
      {location.pathname !== '/landing' && <NavBar />}
      <Routes>
        <Route exact path="/" element={<ClientRegister />} />
        <Route path="/compras" element={<HistorialCompras />} />
        <Route path="/buzon-quejas" element={<BuzonQuejas />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </div>

  );
}

export default App;
