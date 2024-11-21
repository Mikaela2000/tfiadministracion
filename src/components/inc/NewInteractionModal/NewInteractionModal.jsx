import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./NewInteractionModal.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";

const NewInteractionModal = ({ onClose, userId, clientId }) => {
    const [formData, setFormData] = useState({ type: "", date: "", notes: "" });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            console.log("Data to send:", { userId, clientId, formData });
            await dispatch(actions.createInteraction(userId, clientId, formData));
            await dispatch(actions.getAllInteractionByIdClient(clientId)); 
            onClose();
        } catch (error) {
            console.error("Error creating the interaction:", error);
        }
    };

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content text-dark">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New Interaction</h5>
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

                            <Form.Group className="mb-3 label-left" controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Enter the date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 label-left" controlId="notes">
                                <Form.Label>Details</Form.Label>
                                <Form.Control
                                    as="textarea" 
                                    rows={5} 
                                    placeholder="Details of the interaction"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewInteractionModal;
