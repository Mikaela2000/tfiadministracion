import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import style from "./PanelClientes.module.css";
import * as actions from "../../../redux/actions";

function PanelCliente({ onClose, selectedPanel }) {
    const [clientName, setClientName] = useState("");  
    const dispatch = useDispatch();  
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setClientName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        const client = await dispatch(actions.getClient(clientName)); 
      console.log("soy el cliente", client.payload.id)
        if (client && client.payload.id) {
        
            const targetRoute = selectedPanel === "Interacciones" ? "/interactions" : "/cuenta";

            navigate(targetRoute, { state: { clientId: client.payload.id } });  
        } else {
       
            console.error("Cliente no encontrado");
        }
    };

    return (
        <div className={style.overlay}>
            <div className={style.panel}>
                <button className={style.closeButton} onClick={onClose}>✕</button>
                <h2 className="text-center">Buscar Cliente por Nombre</h2>
                <Form onSubmit={handleSubmit} className="text-center">
                    <Form.Group controlId="formClientName" className="mb-3">
                        <Form.Label className={style.label}>Nombre del Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre del cliente"
                            value={clientName}
                            onChange={handleChange}
                            className={style.input}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className={style.button}>
                        Buscar Cliente
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default PanelCliente;
