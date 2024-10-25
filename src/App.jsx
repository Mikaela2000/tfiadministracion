import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/inc/NavBar';
import ClientRegister from './components/views/ClientRegister/ClientRegister';
import HistorialCompras from './components/views/HistorialCompras/HistorialCompras'
import BuzonQuejas from './components/views/BuzonQuejas/BuzonQuejas';
import Interactions from './components/views/interactions/Interactions';

function App() {
  return (

      <div className="app"> {/* Usa container-fluid para ocupar todo el ancho */}
      <NavBar />
        <Routes>
          <Route exact path="/" element={<ClientRegister />} />
          {/* <Route path="/loginPanel" element={<LoginPanel/>}></Route> */}
          <Route path='/compras' element={<HistorialCompras />}></Route>
          <Route path='/buzon-quejas' element={<BuzonQuejas />}></Route>
          <Route path='/interactions' element={<Interactions />}></Route>
        </Routes>
      </div>

  );
}

export default App;
