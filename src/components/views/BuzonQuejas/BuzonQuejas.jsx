import style from "./BuzonQuejas.module.css";
import { useState } from "react";

const BuzonQuejas = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        tipo: 'Queja',
        mensaje: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos a una API o manejarlos según sea necesario
        console.log("Formulario enviado:", formData);
        // Reinicia el formulario
        setFormData({ nombre: '', email: '', tipo: 'Queja', mensaje: '' });
        alert("Tu mensaje ha sido enviado con éxito.");
        // Cierra el modal
        const modalElement = document.getElementById('buzonModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    };

    return (
        <div className={style.container}>
            <div className="modal fade" id="buzonModal" tabIndex="-1" aria-labelledby="buzonModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="buzonModalLabel">Buzón de Quejas, Sugerencias y Reconocimientos</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tipo" className="form-label">Tipo de Mensaje:</label>
                                    <select
                                        id="tipo"
                                        name="tipo"
                                        className="form-select"
                                        value={formData.tipo}
                                        onChange={handleChange}
                                    >
                                        <option value="Queja">Queja</option>
                                        <option value="Sugerencia">Sugerencia</option>
                                        <option value="Reconocimiento">Reconocimiento</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mensaje" className="form-label">Mensaje:</label>
                                    <textarea
                                        id="mensaje"
                                        name="mensaje"
                                        className="form-control"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuzonQuejas;
