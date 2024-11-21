import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../../redux/actions";

const TableQuejas = () => {
    const dispatch = useDispatch();
    const reportes = useSelector((state) => state.reportes);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        dispatch(actions.getAllReportes());
    }, [dispatch]);

    const getEstadoStyle = (estado) => {
        switch (estado) {
            case 'Pendiente':
                return { backgroundColor: 'rgb(247,247,127)', color: 'black' };
            default:
                return {};
        }
    };


    const [loading, setLoading] = React.useState(false);

    const handleEstadoChange = async (reporteId, nuevoEstado) => {
    
        await dispatch(actions.changeEstadoReporte(reporteId, userId, nuevoEstado));
        dispatch(actions.getAllReportes());
   
    };
    return (
        <div>
            <table className="table   border-dark">
                <thead>
                    <tr>
                        {/* <th scope="col">ID</th> */}
                        <th scope="col">Fecha</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {reportes.length > 0 ? (
                        reportes.map((reporte) => (
                            <tr key={reporte.id}>
                                {/* <th scope="row">{reporte.id}</th> */}
                                <td style={getEstadoStyle(reporte.estado)}>
                                    {new Date(reporte.fecha).toLocaleDateString()}
                                </td>
                                <td style={getEstadoStyle(reporte.estado)}>
                                    {reporte.detalle}
                                </td>
                                <td style={getEstadoStyle(reporte.estado)}>
                                {loading && <p>Cargando...</p>}
                                    <select
                                        value={reporte.estado}
                                        onChange={(e) =>
                                            handleEstadoChange(reporte.id, e.target.value)
                                        }
                                        style={{
                                            fontWeight: 'bold',
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Atendida">Atendida</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No hay quejas disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableQuejas;
