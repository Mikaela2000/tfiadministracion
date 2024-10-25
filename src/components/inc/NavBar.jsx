import BuzonQuejas from "../views/BuzonQuejas/BuzonQuejas";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">SoftVision</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/contacto">Contacto</Link>
                            <Link className="nav-link" to="/about">About</Link>
                            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Transparencia
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <a 
                                            className="dropdown-item" 
                                            href="#" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#buzonModal"
                                        >
                                            Buzón de quejas, sugerencias y reconocimientos
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Modal del Buzón de Quejas */}
            <BuzonQuejas />
        </div>
    )
}

export default NavBar;
