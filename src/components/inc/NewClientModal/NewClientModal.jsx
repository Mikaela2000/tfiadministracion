import { useState } from "react";
import Form from "react-bootstrap/Form"
import "./NewClientModal.css"

const NewClientModal = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <button type="button" className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Cargar
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content text-dark">
                        <div className="modal-header ">
                            <h5 className="modal-title title1" id="exampleModalLabel">Nuevo Cliente</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form>
                                <Form.Group className="mb-3 label-left" controlId="formBasicEmail">
                                    <Form.Label >Nombre Completo</Form.Label>
                                    <Form.Control
                                        type="nombre"
                                        placeholder="Ingresa el nombre"
                                        name="nombre"
                                        // value={formData.email}
                                        // onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3 label-left" controlId="telefono">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control
                                        type="telefono"
                                        placeholder="Ingresa el numero de teléfono"
                                        name="nombre"
                                        // value={formData.telefono}
                                        // onChange={handleChange}
                                    />
                                
                                </Form.Group>

                                <Form.Group className="mb-3 label-left" controlId="correo">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="correo"
                                        placeholder="Ingresa el Correo Electrónico"
                                        name="correo"
                                        // value={formData.correo}
                                        // onChange={handleChange}
                                    />
                                
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="modal-footer">
                          
                            <button type="button" className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewClientModal;
