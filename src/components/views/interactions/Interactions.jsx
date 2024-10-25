import "./Interactions.module.css";
import TableClient from "../../inc/TableClient";
import { FaListAlt, FaPlusSquare } from 'react-icons/fa';
import NewInteractionModal from "../../inc/NewInteractionModal/NewInteractionModal";
import { useState } from 'react';

const Interactions = () => {
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
    const options = [
        { icon: FaPlusSquare, type: 'add' },
        { icon: FaListAlt, type: 'list' }
    ];

    const handleOptionClick = (id, type) => {
        if (type === 'add') {
            setShowModal(true); // Muestra el modal  
        } else if (type === 'list') {
            console.log(`Listar interacciones con cliente con ID: ${id}`);
        }
    };

    const closeModal = () => {
        setShowModal(false); // Cierra el modal
    };

    return (
        <div className="background-container">
            <div className="container mt-5">
                <h2>Interacciones con clientes</h2>
                <div className="mt-3 mb-3 w-100 text-center">
                    <form>
                        <input
                            className="rounded-2 px-2 py-2"
                            type="text"
                            required
                            placeholder="Buscar Cliente..."
                        />
                        <button className="btn btn-secondary ms-2" type="submit">Buscar</button>
                    </form>
                </div>
                <TableClient className='Table' options={options} onOptionClick={handleOptionClick} />
            </div>

            {/* Aquí renderizamos el modal basado en el estado */}
            {showModal && (
                <NewInteractionModal onClose={closeModal} />
            )}
        </div>
    );
}

export default Interactions;