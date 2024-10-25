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
    };

    return (
        <div className={style.container}>
            <h2>Buzón de Quejas, Sugerencias y Reconocimientos</h2>
            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.formGroup}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="tipo">Tipo de Mensaje:</label>
                    <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                    >
                        <option value="Queja">Queja</option>
                        <option value="Sugerencia">Sugerencia</option>
                        <option value="Reconocimiento">Reconocimiento</option>
                    </select>
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="mensaje">Mensaje:</label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="submit" className={style.submitButton}>Enviar</button>
            </form>
            
        </div>
    );
};

export default BuzonQuejas;
