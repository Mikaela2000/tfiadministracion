import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import BuzonQuejas from "../views/BuzonQuejas/BuzonQuejas";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import * as actions from "../../redux/actions";
import style from "./NavBar.module.css";
import perfilUsuario from '../../assets/user3.png';


const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token) || localStorage.getItem("token");
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(actions.logoutUser());
        navigate("/landing");
    };

    return (
        <div>
            <nav className={`navbar navbar-expand-lg fixed-top ${style.navbar}`}>
                <div className="container-fluid">
                    <a className={`navbar-brand ${style.links}`} href="#">SoftVision</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className={`nav-link ${style.links}`} to="/">Inicio</Link>
                            <Link className={`nav-link active ${style.links}`} aria-current="page" to="/client">Clientes</Link>
                            <Link className={`nav-link ${style.links}`} to="/quejas">Quejas</Link>
        

                        </div>
                    </div>
                    <div className={style.containerNews}>
                        <DropdownButton
                            className={`btn btn-primary bg-transparent ${style.buttonMenu}`}
                            align="end"
                            title={
                                <img
                                    className={style.imgUser}
                                    src={perfilUsuario}
                                    alt="Imagen de Dropdown"
                                />
                            }
                        >
                            {user?.role === 'admin' && (
                                <Dropdown.Item as={Link} to="/dashboard">Administrador</Dropdown.Item>
                            )}
                            <Dropdown.Item as={Link} to="/profile">Editar perfil</Dropdown.Item>
                            <Dropdown.Divider />
                            {token && (
                                <Dropdown.Item as={Link} to="/landing" onClick={handleLogout}>Cerrar sesion</Dropdown.Item>
                            )}

                        </DropdownButton>
                    </div>
                </div>
            </nav>
            {/* <BuzonQuejas /> */}
        </div>
    );
};

export default NavBar;
