import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TablaQueja from '../../inc/TablaQuejas/TablaQuejas';
import * as actions from '../../../redux/actions';
import { Modal, Button, Form } from 'react-bootstrap';
import style from "./BuzonQuejas.module.css";


const Quejas = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [newQueja, setNewQueja] = useState({ fecha: "", detalle: "", estado: 'Pendiente' });
     const userId = localStorage.getItem('userId');

     

    useEffect(() => {
        dispatch(actions.getAllReportes());
    }, [dispatch]);

    
    const handleClose = () => setShowModal(false);


    const handleShow = () => setShowModal(true);

    const handleSubmit = (e) => {
        e.preventDefault();
       
        dispatch(actions.createReporte(newQueja, userId)); 
        setShowModal(false);
        setNewQueja({ detalle: '', estado: 'Pendiente' }); 
    };

    return (
        <div className="background-container">
            <div className="container mt-5">
                <h2 className={style.titulo}>Quejas y Sugerencias</h2>

                <TablaQueja />
                <button className={`btn btn-primary mt-3 ${style.btnAñadir}`} onClick={handleShow}>Añadir +</button>

                {/* Modal para añadir nueva queja */}
                <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Nueva Queja</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleSubmit}>

             {/* Campo para Fecha */}
             <Form.Group className="mb-3" controlId="fechaQueja">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                    type="date"
                    value={newQueja.fecha}
                    onChange={(e) =>
                        setNewQueja({ ...newQueja, fecha: e.target.value })
                    }
                    required
                />
            </Form.Group>

            {/* Campo para Detalle */}
            <Form.Group className="mb-3" controlId="detalleQueja">
                <Form.Label>Detalle</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese el detalle de la queja"
                    value={newQueja.detalle}
                    onChange={(e) =>
                        setNewQueja({ ...newQueja, detalle: e.target.value })
                    }
                    required
                />
            </Form.Group>

            {/* Campo para Estado */}
            <Form.Group className="mb-3" controlId="estadoQueja">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                    value={newQueja.estado}
                    onChange={(e) =>
                        setNewQueja({ ...newQueja, estado: e.target.value })
                    }
                    disabled 
                >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Atendida">Atendida</option>
                </Form.Select>
            </Form.Group>

           
            <Button variant="primary" type="submit">
                Guardar
            </Button>
        </Form>
    </Modal.Body>
</Modal>

            </div>
        </div>
    );
};

export default Quejas;
