import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { generateReporteCompras } from '../../../utils/reporteCompras'; // Asegúrate de importar la función
import TableCompras from "../../inc/TableCompras/TableCompras";
import { useLocation } from 'react-router-dom';
import * as actions from "../../../redux/actions";
import style from "./Compras.module.css";

const Compras = () => {
    const location = useLocation();
    const { clientId } = location.state || {};
    const dispatch = useDispatch();
    const compras = useSelector((state) => state.compras);

    useEffect(() => {
        dispatch(actions.getAllCompraByIdClient(clientId));
    }, [dispatch, clientId]);
    const client = useSelector((state) => state.clients.find(c => c.id === clientId));

    const nameClient= client.nombre;

    const handleDownloadPDF = () => {
        generateReporteCompras(compras, nameClient); 
    };



    return (
        <div className="background-container">
            <div className="container mt-5">
                <h2 className={style.titulo}>Historial de compras  {client ? client.nombre : "Cargando..."}</h2>
                {/* <div className="mt-3 mb-3 w-100 text-center">
                    <form className="mb-3">
                        <input
                            className="rounded-2 px-2 py-2"
                            type="text"
                            required
                            placeholder="Search Purchase..."
                        />
                        <button className="btn btn-secondary ms-2" type="submit">Search</button>
                    </form>
                </div> */}

                <TableCompras clientId={clientId} />

                {/* Botón para generar el PDF */}
                <div className="text-center mt-4">
                    <Button className={style.btnReporte}  onClick={handleDownloadPDF}>
                        Descargar Reporte 
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Compras;
