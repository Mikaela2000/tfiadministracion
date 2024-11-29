import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./UpdateClients.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";

const UpdateClients = ({ onClose, clientId, initialValues }) => {
    const [formData, setFormData] = useState({ nombre: "", telefono: "", email: "", categoria: "", dni: "" });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();



    useEffect(() => {
        if (initialValues) {
            console.log("Valores iniciales:", initialValues);
            setFormData(initialValues);
        }
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setFormData({ ...formData, [name]: value }); // Actualiza el estado correctamente
        setErrors({ ...errors, [name]: "" }); // Limpia errores
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = "El nombre no puede estar vacío.";
        }

        if (!/^\d+$/.test(formData.dni)) {
            newErrors.dni = "DNI debe contener solo números.";
        }

        if (!/^\d+$/.test(formData.telefono)) {
            newErrors.telefono = "El teléfono debe contener solo números.";
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email no es válido.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Si no hay errores, retorna true
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

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
                        <h5 className="modal-title" id="exampleModalLabel">Actualizar Cliente</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Ingrese el nombre del cliente"
                                    isInvalid={!!errors.nombre}
                                />
                                <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDni">
                                <Form.Label>DNI</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="dni"
                                    value={formData.dni}
                                    onChange={handleChange}
                                    placeholder="Ingrese el DNI del cliente"
                                    isInvalid={!!errors.dni}
                                />
                                <Form.Control.Feedback type="invalid">{errors.dni}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPhone">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    placeholder="Ingrese el número de teléfono"
                                    isInvalid={!!errors.telefono}
                                />
                                <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Ingrese el correo electrónico"
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="estadoQueja">
                                <Form.Label>Categoría</Form.Label>
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
                            Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateClients;
