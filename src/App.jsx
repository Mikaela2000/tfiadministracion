import './App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from './components/inc/NavBar';
import ClientRegister from './components/views/ClientRegister/ClientRegister';

function App() {
  return (

      <div className="app"> {/* Usa container-fluid para ocupar todo el ancho */}
      <NavBar />
        <Routes>
          <Route exact path="/" element={<ClientRegister />} />
          {/* <Route path="/loginPanel" element={<LoginPanel/>}></Route> */}
        </Routes>
      </div>

  );
}

export default App;
