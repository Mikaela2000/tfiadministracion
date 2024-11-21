import React, { useState } from "react";
import style from "./Home.module.css";
import Container from "react-bootstrap/Container";
import { FaPlus } from 'react-icons/fa';
import { RiComputerLine } from "react-icons/ri";
import { IoHomeSharp } from "react-icons/io5";
import PanelCliente from "../../inc/PanelClientes/PanelCliente";
import { Link } from 'react-router-dom';

function Home() {
    const [selectedPanel, setSelectedPanel] = useState(null);

    const handleCardClick = (panelName) => {
        setSelectedPanel(panelName);
    };

    const handleClosePanel = () => {
        setSelectedPanel(null);
    };

    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitulo}>
                <IoHomeSharp size={35} />
                <h2>Home Dashboard</h2>
            </div>
            <Container className={style.container}>
                <div className={style.tituloSeccion}>
                    <RiComputerLine size={35} />
                    <h3>Sitio</h3>
                </div>



                <div className={style.containerCards}>

                    <Link to="/client" className={style.cardLink}>
                        <div className={style.card}>
                            <div className={style.cardIzquierda}>
                                <div className={style.containerImg}>
                                    <img
                                        src="https://img.icons8.com/?size=80&id=UWNhN9bLYG1k&format=png"
                                        alt="icono"
                                    />
                                </div>
                                <h3>Clientes</h3>
                            </div>
                            <div className={style.containerPlus}>
                                <FaPlus />
                            </div>
                        </div>

                    </Link>

                    <div className={style.card} onClick={() => handleCardClick("Interacciones")}>
                        <div className={style.cardIzquierda}>
                            <div className={style.containerImg}>
                                <img
                                    src="https://img.icons8.com/?size=80&id=h1TrHwe7l4nT&format=png"
                                    alt="icono"
                                />
                            </div>
                            <h3>Interacciones</h3>
                        </div>
                        <div className={style.containerPlus}>
                            <FaPlus />
                        </div>
                    </div>

                    <div className={style.card} onClick={() => handleCardClick("Cuenta Corriente")}>
                        <div className={style.cardIzquierda}>
                            <div className={style.containerImg}>
                                <img
                                    src="https://img.icons8.com/?size=80&id=ebanR83FVG0U&format=png"
                                    alt="icono"
                                />
                            </div>
                            <h3>Cuenta Corriente</h3>
                        </div>
                        <div className={style.containerPlus}>
                            <FaPlus />
                        </div>
                    </div>
                </div>

                {selectedPanel && (
                    <div className={style.panelContainer}>
                        <PanelCliente onClose={handleClosePanel} selectedPanel={selectedPanel} />
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
