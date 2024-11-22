
import TableCuentaCorriente from "../../inc/TableCuentaCorriente/TableCuentaCorriente";
import { FaPlusSquare } from 'react-icons/fa';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux'; 
import * as actions from "../../../redux/actions";

const CuentaCorriente = () => {
    const location = useLocation();
    const { clientId } = location.state || {}; 
    const client = useSelector(state => state.clients.find(c => c.id === clientId));
    console.log("soy el cliente", client)



    return (
        <div className="background-container">
            <div className="container mt-5">
                <h2>Cuenta Corriente de {client ? client.nombre : "Cargando..."}</h2>
                {/* <div className="mt-3 mb-3 w-100 text-center">
                    <form className="mb-3">
                        <input
                            className="rounded-2 px-2 py-2"
                            type="text"
                            required
                            placeholder="Buscar en Cuenta Corriente..."
                        />
                        <button className="btn btn-secondary ms-2" type="submit">Buscar</button>
                    </form>
                </div> */}

                <TableCuentaCorriente clientId={clientId} />
                
            </div>
        </div>
    );
};

export default CuentaCorriente;
