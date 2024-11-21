import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./NewClientModal.css";
import React from "react";
import { useDispatch } from "react-redux";
import { newPostClient } from "../actions"; // Asegúrate de importar la acción correctamente

const NewClientModal = () => {
    const [formData, setFormData] = useState({ nombre: "", telefono: "", email: "" });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
        const id = 1; 
        dispatch(newPostClient(id, formData)); // Asegúrate de que la acción esté importada correctamente
    };

    return (
        <div>
            <button type="button" className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Cargar
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content text-dark">
                        <div className="modal-header">
                            <h5 className="modal-title title1" id="exampleModalLabel">Nuevo Cliente</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form onSubmit={handleSubmit}> {/* Cambié a onSubmit */}
                                <Form.Group className="mb-3 label-left" controlId="formBasicNombre">
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingresa el nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 label-left" controlId="formBasicTelefono">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingresa el número de teléfono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 label-left" controlId="formBasicCorreo">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingresa el Correo Electrónico"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Guardar</button> {/* Cambié a tipo "submit" */}
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewClientModal;
