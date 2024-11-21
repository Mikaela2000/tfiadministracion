import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./UpdateInteraction.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";

const UpdateInteraction = ({ onClose, userId, interactionId, initialValues }) => {
    const [formData, setFormData] = useState({ type: "", date: "", notes: "" });
    const dispatch = useDispatch();

    useEffect(() => {
        if (initialValues) {
            setFormData(initialValues);
        }
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            console.log("Data to send:", { userId, interactionId, formData });
            await dispatch(actions.updateInteraction(interactionId, userId, formData));
            onClose(); // Cerrar el modal después de la actualización
        } catch (error) {
            console.error("Error updating the interaction:", error);
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content text-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Interaction</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Form>
                            <Form.Group className="mb-3 label-left" controlId="formBasicType">
                                <Form.Label>Interaction Type</Form.Label>
                                <Form.Select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a type</option>
                                    <option value="call">call</option>
                                    <option value="email">email</option>
                                    <option value="meeting">meeting</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3 label-left" controlId="formBasicDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 label-left" controlId="formBasicNotes">
                                <Form.Label>Details</Form.Label>
                                <Form.Control
                                    as="textarea" 
                                    rows={5} 
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Details of the interaction"
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateInteraction;
