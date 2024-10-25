import { useState } from 'react';
import TableClient from "../../inc/TableClient";
import { Button, Modal, Form } from 'react-bootstrap';
import NewClientModal from '../../inc/NewClientModal/NewClientModal';
import { FaTrashAlt, FaEdit, FaEye } from 'react-icons/fa';

import './ClienteRegister.css';


const ClientRegister = () => {
    
    const options = [
        { icon: FaTrashAlt, type: 'delete' },
        { icon: FaEdit, type: 'edit' }
      ];
    
      const handleOptionClick = (id, type) => {
        if (type === 'delete') {
          console.log(`Eliminar cliente con ID: ${id}`);
        } else if (type === 'edit') {
          console.log(`Editar cliente con ID: ${id}`);
        }
      };
    
    

    return (
        <div className="background-container">
            <div className="container mt-5">
                <h1 className="text-center mb-4">Gestión de Clientes</h1>


                <TableClient className='Table' options={options} onOptionClick={handleOptionClick} />;


 
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
