import React, { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from "../../../redux/actions";
import UpdateInteraction from '../UpdateInteraction/UpdateInteraction';

import style from "./TableInteractions.module.css";

const TableInteraction = ({ clientId }) => {
    const [showMenu, setShowMenu] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentInteractionId, setCurrentInteractionId] = useState(null);
    const [initialValues, setInitialValues] = useState(null);
    const dispatch = useDispatch();
    const interactions = useSelector((state) => state.interactions);
    const userId = localStorage.getItem("userId");
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchInteractions = async () => {

            dispatch(actions.clearInteractions());
 
            await dispatch(actions.getAllInteractionByIdClient(clientId));
        };

        fetchInteractions();
    }, [dispatch, clientId]);

    const handleMenuToggle = (interactionId) => {
        setShowMenu(prev => prev === interactionId ? null : interactionId);
    };
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);  // Actualiza el estado de búsqueda
    };


    const handleOptionClick = async (id, type) => {
        if (type === 'update') {
            const interaction = interactions.find(interaction => interaction.id === id);
            setCurrentInteractionId(id);
            setInitialValues(interaction); 
            setShowUpdateModal(true); 
        } else if (type === 'delete') {
            setLoading(true);
            try {
                await dispatch(actions.deleteInteraction(id)); 
                dispatch(actions.getAllInteractionByIdClient(clientId)); 
            } catch (error) {
                console.error("Error eliminando la interaccion:", error);
            } finally {
                setLoading(false); 
            }
        }
    };

    const filteredInteractions = interactions.filter((interaction) => {
        const lowerSearchText = searchText.toLowerCase();
        return (
            interaction.type.toLowerCase().includes(lowerSearchText) 
            // interaction.fecha.toLowerCase().includes(lowerSearchText) 
        );
    });


    return (
        <div className={style.container} >
            <div>
            <label htmlFor="tipo-select" className={style.label}>Buscar por tipo:</label>
            <select 
        value={searchText} 
        onChange={handleSearchChange} 
        className={style.input} 
    >
        <option value="">Todo</option>
        <option value="meeting">Meeting</option>
        <option value="call">Call</option>
        <option value="email">Email</option>
    </select>

            </div>
    
               
        
            <table className="table table-striped table-bordered border-dark">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Notas</th>
                    </tr>
                </thead>
                <tbody>
                    {interactions.length > 0 ? (
                        filteredInteractions.map((interaction) => (
                            <tr key={interaction.id}>
                                <th scope="row">{interaction.id}</th>
                                <td>{interaction.type}</td>
                                <td>{new Date(interaction.date).toLocaleDateString()}</td>
                                <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    {interaction.notes}
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => handleMenuToggle(interaction.id)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            <FaEllipsisV />
                                        </button>
                                        {showMenu === interaction.id && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                right: 0,
                                                backgroundColor: '#fff',
                                                border: '1px solid #ddd',
                                                borderRadius: 4,
                                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                                                zIndex: 1
                                            }}>
                                                <button
                                                    onClick={() => handleOptionClick(interaction.id, 'update')}
                                                    style={{
                                                        display: 'block',
                                                        padding: '8px 16px',
                                                        width: '100%',
                                                        border: 'none',
                                                        background: 'none',
                                                        textAlign: 'left',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleOptionClick(interaction.id, 'delete')}
                                                    style={{
                                                        display: 'block',
                                                        padding: '8px 16px',
                                                        width: '100%',
                                                        border: 'none',
                                                        background: 'none',
                                                        textAlign: 'left',
                                                        cursor: 'pointer',
                                                        color: 'red'
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No hay interacciones disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showUpdateModal && (
                <UpdateInteraction
                    onClose={() => setShowUpdateModal(false)}
                    userId={userId}
                    interactionId={currentInteractionId}
                    initialValues={initialValues}
                />
            )}
        </div>
    );
};

export default TableInteraction;
