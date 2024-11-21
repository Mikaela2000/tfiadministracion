import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../../redux/actions";

const TableCuentaCorriente = ({ clientId }) => {
    const dispatch = useDispatch();
    const cuentaCorriente = useSelector((state) => state.cuentasCorrientes); // Asegúrate de que este estado existe en tu store

    useEffect(() => {
        dispatch(actions.getAllCuentaCorrienteByIdClient(clientId)); // Llama a la acción que obtenga la cuenta corriente del cliente
    }, [dispatch, clientId]);

    return (
        <div>
            <table className="table table-striped table-bordered border-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Importe</th>
                        <th scope="col">Saldo</th>
                        <th scope="col">Tipo de Transacción</th>
                    </tr>
                </thead>
                <tbody>
                    {cuentaCorriente.length > 0 ? (
                        cuentaCorriente.map((record) => (
                            <tr key={record.id}>
                                <th scope="row">{record.id}</th>
                                <td>{new Date(record.fecha).toLocaleDateString()}</td> {/* Formato de fecha */}
                                <td>{record.description}</td>
                                <td>${record.importe.toFixed(2)}</td>
                                <td>${record.saldo.toFixed(2)}</td>
                                <td>{record.tipoTransaccion}</td> {/* Puedes formatear esto según sea necesario */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No hay registros de cuenta corriente disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableCuentaCorriente;
