import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import style from "./PanelClientes.module.css";
import * as actions from "../../../redux/actions";

function PanelCliente({ onClose, selectedPanel }) {
    const [clientDNI, setClientDNI] = useState("");  
    const [errorMessage, setErrorMessage] = useState(""); // Estado para el error
    const dispatch = useDispatch();  
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setClientDNI(e.target.value);
        setErrorMessage(""); // Limpiar mensaje de error al cambiar el input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const client = await dispatch(actions.getClient(clientDNI)); 
            
            if (client && client.payload.id) {
                const targetRoute = selectedPanel === "Interacciones" ? "/interactions" : "/cuenta";
                navigate(targetRoute, { state: { clientId: client.payload.id } });  
            } else {
                setErrorMessage("⚠ Cliente no encontrado"); // Error genérico si no hay ID
            }
        } catch (error) {
            // Capturar mensaje de error enviado desde la acción Redux
            setErrorMessage(error.message || "Ocurrió un error al buscar el cliente");
        }
    };

    return (
        <div className={style.overlay}>
            <div className={style.panel}>
                <button className={style.closeButton} onClick={onClose}>✕</button>
                <h2 className="text-center" style={{ marginTop: '40px' }}>Buscar cliente por DNI</h2>
                <Form onSubmit={handleSubmit} className="text-center">
                    <Form.Group controlId="formClientName" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el DNI del cliente"
                            value={clientDNI}
                            onChange={handleChange}
                            className={style.input}
                            style={{ marginTop: '30px', marginBottom: '5px'}}
                        />
                          {errorMessage && ( // Mostrar mensaje de error si existe
                    <div className={style.errorMessage} style={{ color: "red" }}>
                        {errorMessage}
                    </div>
                )}
                    </Form.Group>
                    
                    <Button style={{ backgroundColor: 'rgb(7,33,69)' }} type="submit" className={style.button}>
                        Buscar Cliente
                    </Button>
                </Form>
              
            </div>
        </div>
    );
}

export default PanelCliente;
