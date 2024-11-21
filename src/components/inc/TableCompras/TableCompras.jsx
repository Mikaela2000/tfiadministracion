import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../../redux/actions";

const TableCompras = ({ clientId }) => {
    const dispatch = useDispatch();
    const compras = useSelector((state) => state.compras);
    console.log("soy el cliente ", clientId)

    useEffect(() => {
        dispatch(actions.getAllCompraByIdClient(clientId));
    }, [dispatch, clientId]);

    return (
        <div>
            <table className="table table-striped table-bordered border-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Software</th>
                        <th scope="col">Versión</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Método de Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.length > 0 ? (
                        compras.map((purchase) => (
                            <tr key={purchase.id}>
                                <th scope="row">{purchase.id}</th>
                                <td>{purchase.nameSoft}</td>
                                <td>{purchase.version}</td>
                                <td>${purchase.price.toFixed(2)}</td>
                                <td>{purchase.metodoPago}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No hay compras disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableCompras;
