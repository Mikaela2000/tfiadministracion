import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import TableClient from "../../inc/TableClient";
import { FaTrashAlt, FaEdit, FaSearch } from 'react-icons/fa';
import * as actions from '../../../redux/actions';
import './ClienteRegister.css';

const ClientRegister = () => {
    const [showModal, setShowModal] = useState(false);
    const [clientData, setClientData] = useState({ nombre: '', dni: '', telefono: '', email: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [searchText, setSearchText] = useState(''); 
    const [filteredClients, setFilteredClients] = useState([]); 
    const dispatch = useDispatch();
    const clients = useSelector((state) => state.clients);
    const userId = localStorage.getItem('userId');
    

    useEffect(() => {
        if (searchText === '') {
            setFilteredClients(clients); 
        } else {
            const lowerSearchText = searchText.toLowerCase();
            const filtered = clients.filter(client => 
                client.nombre.toLowerCase().includes(lowerSearchText) || 
                client.dni.toLowerCase().includes(lowerSearchText)
            );
            setFilteredClients(filtered);
        }
    }, [searchText, clients]);

    const handleChange  = (e) => {
        setSearchText(e.target.value);  
    };

    const validateForm = () => {
        if (!/^\d+$/.test(clientData.dni)) {
            setError('DNI incorrecto');
            return false;
        }

        if (!/^\d+$/.test(clientData.telefono)) {
            setError('Teléfono incorrecto');
            return false;
        }

        setError(''); // Limpiar error si pasa la validación
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Detener envío si la validación falla
  
        dispatch(actions.newPostClient(userId, clientData))
            .then(() => {
                alert("Cliente registrado con éxito!");
                setShowModal(false);
                setClientData({ nombre: '', dni: '', telefono: '', email: '' });
            })
            .catch((error) => {
                setError("Falló el registro del cliente.");
                console.error(error);
            });
    };

    const options = [
        { icon: FaTrashAlt, type: 'delete' },
        { icon: FaEdit, type: 'edit' }
    ];

    const handleOptionClick = async (id, type) => {
        if (type === 'delete') {
            try {
                await dispatch(actions.deleteClient(id)); 
                dispatch(actions.getAllClients());
            } catch (err) {
                console.error(`Error al eliminar el cliente: ${err.message}`);
            }
        } else if (type === 'edit') {
            console.log(`Editando cliente con ID: ${id}`);
        }
    };

    return (
        <div className="background-container">
            <div className="container mt-5">
                <h1 className="text-center mb-4">Gestión de Clientes</h1>
                <TableClient className="" clients={filteredClients} options={options} onOptionClick={handleOptionClick} />
                <div className="d-flex justify-content-end mb-3">
                    <Button className="buttonNuevo" onClick={() => setShowModal(true)}>Nuevo Cliente</Button>
                </div>
            </div>

            {/* Modal para agregar un nuevo cliente */}
            <Modal className="modal" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={clientData.nombre}
                                onChange={(e) => setClientData({ ...clientData, nombre: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDni">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control
                                type="text"
                                name="dni"
                                value={clientData.dni}
                                onChange={(e) => setClientData({ ...clientData, dni: e.target.value })}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTelefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                value={clientData.telefono}
                                onChange={(e) => setClientData({ ...clientData, telefono: e.target.value })}
                                required
                    
                            />
                           
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={clientData.email}
                                onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        {error && <Alert variant="danger" className=" mt-3">{error}</Alert>}

                        <Button className="buttoNewClient" variant="primary" type="submit">
                            Agregar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ClientRegister;
