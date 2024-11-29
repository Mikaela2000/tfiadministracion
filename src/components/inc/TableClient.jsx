import { FaTrashAlt, FaEdit, FaEllipsisV } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../redux/actions";
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UpdateClients from "../inc/UpdateClients/UpdateClients";



import style from "./TableClient.module.css";

const TableClient = () => {
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients);
    const navigate = useNavigate();


    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');




    useEffect(() => {
        const fetchInteractions = async () => {

            dispatch(actions.clearClients());

            dispatch(actions.getAllClients());
        };

        fetchInteractions();
    }, [dispatch,]);



    const handleOptionClick = async (clientId, action) => {
        if (action === "edit") {
            const selectedClient = clients.find(client => client.id === clientId);
            setModalData(selectedClient);
            setShowModal(true);
        } else if (action === "delete") {
            setLoading(true);

            try {
                await dispatch(actions.deleteClient(clientId));
                dispatch(actions.getAllClients());
            } catch (error) {
                console.error("Error eliminando el cliente:", error);
            } finally {
                setLoading(false);
            }
        } else if (action === "historialCompras") {
            navigate('/compras', { state: { clientId } });
        } else if (action === "cuentaCorriente") {
            navigate('/cuenta', { state: { clientId } });
        } else if (action === "newInteraction") {
            navigate('/interactions', { state: { clientId } });
        }
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);  // Actualiza el estado de búsqueda
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);

    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false);
        setModalData(null);
    };

    const filteredClients = clients.filter((client) => {
        const lowerSearchText = searchText.toLowerCase();
        const matchesSearch = client.nombre.toLowerCase().includes(lowerSearchText) ||
            client.dni.toLowerCase().includes(lowerSearchText) ||
            client.telefono.toLowerCase().includes(lowerSearchText) ||
            client.email.toLowerCase().includes(lowerSearchText);

        const matchesCategory = selectedCategory ? client.categoria === selectedCategory : true;
        console.log(selectedCategory)

        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <div className={style.container}>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar por Nombre, DNI, Teléfono o Email"
                        value={searchText}
                        onChange={handleSearchChange} // Llama a la función de cambio
                        className={style.input}
                    />
                </div>
                <div className="category-filter">
                    <label className={style.labelCategoria} htmlFor="">Categoria: </label>
                    <select
                        className={style.select}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Todos</option>
                        <option value="activo">Activos</option>
                        <option value="moderado">Moderados</option>
                        <option value="inactivo">Inactivos</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>

            </div>

            <div className={style.tablaClienteContainer}>
                <table className={`table table-striped table-bordered border-dark ${style.clientTable}`}>
                    <thead>
                        <tr>
                            {/* <th scope="col">Id</th> */}
                            <th scope="col">Nombre</th>
                            <th scope="col">DNI</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Correo Electrónico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.length > 0 ? (
                            filteredClients.map((client) => (
                                <tr key={client.id}>
                                    {/* <th scope="row">{client.id}</th> */}
                                    <td>{client.nombre}</td>
                                    <td>{client.dni}</td>
                                    <td>{client.telefono}</td>
                                    <td className={style.email}>
                                        {client.email}
                                        <Dropdown>
                                            <Dropdown.Toggle className={style.flecha} variant="link" id="dropdown-basic">
                                                <FaEllipsisV className={style.puntos} />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() =>
                                                    handleOptionClick(client.id, 'historialCompras', client)
                                                }>
                                                    Historial de compras
                                                </Dropdown.Item>

                                                <Dropdown.Item onClick={() =>
                                                    handleOptionClick(client.id, 'cuentaCorriente', client)
                                                }>
                                                    Cuenta Corriente
                                                </Dropdown.Item>

                                                <Dropdown.Item onClick={() =>
                                                    handleOptionClick(client.id, 'newInteraction', client)
                                                }>
                                                    Interacciones
                                                </Dropdown.Item>

                                                <Dropdown.Item onClick={() =>
                                                    handleOptionClick(client.id, 'edit', client)
                                                }>
                                                    <FaEdit /> Actualizar
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() =>
                                                    handleOptionClick(client.id, 'delete', client)
                                                }>
                                                    <FaTrashAlt /> Eliminar
                                                </Dropdown.Item>
                                              
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No hay clientes disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal para actualizar cliente */}
            {showModal && (
                <UpdateClients
                    onClose={handleCloseModal}
                    clientId={modalData?.id} // Verifica que modalData no sea null
                    initialValues={{
                        nombre: modalData?.nombre || "",
                        dni: modalData?.dni || "",
                        telefono: modalData?.telefono || "",
                        email: modalData?.email || "",
                        categoria: modalData?.categoria || ""
                    }}
                />
            )}
        </div>
    );
};

export default TableClient;
