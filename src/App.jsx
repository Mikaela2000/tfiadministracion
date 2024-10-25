import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/inc/NavBar';
import ClientRegister from './components/views/ClientRegister/ClientRegister';
import HistorialCompras from './components/views/HistorialCompras/HistorialCompras';
import BuzonQuejas from './components/views/BuzonQuejas/BuzonQuejas';
import Dashboard from './components/views/Dashboard/Dashboard';
import Landing from './components/views/Landing/Landing';
import Interactions from './components/views/interactions/Interactions';

function App() {
  const location = useLocation();
  const hiddenNavBarRoutes = ['/landing', '/dashboard']; // Rutas en las que no quieres que aparezca el NavBar

  return (
    <div className="app">
      {/* Mostrar NavBar solo si la ruta actual no está en el arreglo de rutas ocultas */}
      {!hiddenNavBarRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route exact path="/" element={<ClientRegister />} />
        <Route path="/compras" element={<HistorialCompras />} />
        <Route path="/buzon-quejas" element={<BuzonQuejas />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/interactions" element={<Interactions />} />
      </Routes>
    </div>
  );
}

export default App;
