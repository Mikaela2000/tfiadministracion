import { useState } from 'react';
import TableClient from "../../inc/TableClient";
import { Button, Modal, Form } from 'react-bootstrap';
import NewClientModal from '../../inc/NewClientModal/NewClientModal';

import './ClienteRegister.css';


const ClientRegister = () => {
  

    return (
        <div className="background-container">
            <div className="container mt-5">
                <h1 className="text-center mb-4">Gestión de Clientes</h1>


                <TableClient className="table" />


 
            </div>
            <div className="d-flex justify-content-end mb-3">

            </div>
            <div class="button-container">
                <Button variant="btn-outline-secondary" ><NewClientModal></NewClientModal></Button>
                <Button variant="primary" >Actualizar</Button>
            </div>

        </div>
    );
}

export default ClientRegister;
