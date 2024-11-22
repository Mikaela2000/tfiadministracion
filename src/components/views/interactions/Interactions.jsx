import "./Interactions.module.css";
import TableInteraction from "../../inc/TableInteractions/TableInteractions";
import { FaPlusSquare } from 'react-icons/fa';
import NewInteractionModal from "../../inc/NewInteractionModal/NewInteractionModal";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux'; 
import * as actions from "../../../redux/actions";

const Interactions = () => {
    const location = useLocation();
    const { clientId } = location.state || {}; 
    const [showModal, setShowModal] = useState(false); 
    const userId = localStorage.getItem("userId"); 
    const dispatch = useDispatch(); 
    

    const client = useSelector((state) => state.clients.find(c => c.id === clientId));


    const closeModal = () => {
        setShowModal(false); 
    };

    


  
    return (
        <div className="background-container">
            <div className="container mt-5">
                <h2>Interacciones registradas de {client ? client.nombre : "Cargando..."}</h2>
                <div className="mt-3 mb-3 w-100 text-center">
                    {/* <form className="mb-3">
                        <input
                            className="rounded-2 px-2 py-2"
                            type="text"
                            required
                            placeholder="Search Interaction..."
                        />
                        <button className="btn btn-secondary ms-2" type="submit">Search</button>
                    </form> */}
                </div>

                <TableInteraction clientId={clientId}  />
                <button
                    className="btn mb-3 "
                    onClick={() => setShowModal(true)}
                    style={{ backgroundColor: 'rgb(7,33,69)', color: "white"}}
                >
                    <FaPlusSquare /> Add Interaction
                </button>
            </div>

            {showModal && <NewInteractionModal onClose={closeModal} userId={userId} clientId={clientId} />}
        </div>
    );
};

export default Interactions;
