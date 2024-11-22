import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./UpdateClients.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";

const UpdateClients = ({ onClose, clientId, initialValues }) => {
    const [formData, setFormData] = useState({ nombre: "", telefono: "", email: "", categoria: "" });
    const dispatch = useDispatch();

    
    useEffect(() => {
        if (initialValues) {
            console.log("soy los valores inciiales", initialValues)
            setFormData(initialValues);
        }
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            console.log("Data to send:", { clientId, formData });
            await dispatch(actions.updateClient(clientId, formData)); // Llamar a la acción Redux
            onClose(); // Cerrar el modal después de la actualización
        } catch (error) {
            console.error("Error updating the client:", error);
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content text-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Client</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Enter client's name"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    placeholder="Enter client's phone number"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter client's email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="estadoQueja">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Select
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                >
                                    <option value="activo">Activo</option>
                                    <option value="moderado">Moderado</option>
                                    <option value="inactivo">Inactivo</option>
                                </Form.Select>
                            </Form.Group>

                        </Form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateClients;
