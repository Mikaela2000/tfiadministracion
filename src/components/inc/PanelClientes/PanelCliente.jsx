import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import style from "./PanelClientes.module.css";
import * as actions from "../../../redux/actions";

function PanelCliente({ onClose, selectedPanel }) {
    const [clientDNI, setClientDNI] = useState("");  
    const dispatch = useDispatch();  
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setClientDNI(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        const client = await dispatch(actions.getClient(clientDNI)); 
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
                <h2 className="text-center" style={{ marginTop: '40px' }}>Buscar cliente por DNI</h2>
                <Form onSubmit={handleSubmit} className="text-center">
                    <Form.Group controlId="formClientName" className="mb-3">
                        {/* <Form.Label className={style.label}>DNI del Cliente</Form.Label> */}
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el DNI del cliente"
                            value={clientDNI}
                            onChange={handleChange}
                            className={style.input}
                            style={{ marginTop: '30px', marginBottom: '30px'}}
                        />
                    </Form.Group>
                    <Button  style={{ backgroundColor: 'rgb(7,33,69)' }}  type="submit" className={style.button}>
                        Buscar Cliente
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default PanelCliente;
