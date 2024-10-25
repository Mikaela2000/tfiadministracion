import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./NewInteractionModal.css";

const NewInteractionModal = ({ onClose }) => { // Recibe onClose como prop
    const [formData, setFormData] = useState({ tipo: "", fecha: "", detalles: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        // Lógica para guardar los datos
        console.log("Datos guardados:", formData);
        onClose(); // Cierra el modal después de guardar
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content text-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Nueva Interaccion</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <Form.Group className="mb-3 label-left" controlId="formBasicTipo">
                                <Form.Label>Tipo Interaccion</Form.Label>
                                <Form.Select
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccione un tipo</option>
                                    <option value="correo">Correo Electronico</option>
                                    <option value="reunion">Reunión</option>
                                    <option value="llamada">Llamada Telefónica</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 label-left" controlId="fecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Ingresa la fecha"
                                    name="fecha"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 label-left" controlId="correo">
                                <Form.Label>Detalles</Form.Label>
                                <Form.Control
                                    as="textarea" // Cambiar 'type' a 'as' y establecerlo como 'textarea'
                                    rows={5} // Especifica el número de filas (altura)
                                    placeholder="Detalles de la interaccion"
                                    name="detalles"
                                    value={formData.detalles}
                                    onChange={handleChange}
                                    />
                                {/* <textarea
                                    id="detalles"
                                    name="detalles"
                                    value={formData.detalles}
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                ></textarea> */}
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewInteractionModal;