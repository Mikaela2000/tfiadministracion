import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import perfilVacio from '../../../assets/PERFIL-VACIO.png';
import { updateUser } from '../../../redux/actions';
import validate from '../../../utils/validations'
import styles from './UpdateProfile.module.css';

function UpdateProfile() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    apellido: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const userId = localStorage.getItem('userId');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });


    const newErrors = validate({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const handleSaveChanges = () => {
    const updatedFields = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value.trim()) acc[key] = value;
      return acc;
    }, {});

    // Validar si las contraseñas coinciden antes de enviar los datos
    const validationErrors = validate(updatedFields);

    if (updatedFields.password && updatedFields.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "⚠ Las contraseñas no coinciden";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!userId) {
      setErrors({ userId: '⚠ No se encontró el ID del usuario.' });
      return;
    }

    dispatch(updateUser(userId, updatedFields));
    alert('Perfil actualizado correctamente');
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.fotoPerfil}>
        <h3>Perfil</h3>
        <div className={styles.containerImg}>
          <img src={perfilVacio} alt="Perfil" />
        </div>
      </div>

      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Ingresa tu nombre"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Ingresa tu apellido"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Número de teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Ingresa tu número de teléfono"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Correo Electrónico:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Ingresa tu correo"
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Ingresa tu nueva contraseña (opcional)"
            />
            {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirmar Contraseña:</label>
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Confirma tu contraseña"
              />
              {formData.password === formData.confirmPassword && formData.confirmPassword && (
                <FaCheck className={styles.checkIcon} />
              )}
              {errors.confirmPassword && (
                <p className={styles.errorMessage}>{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {errors.userId && <p className={styles.errorMessage}>{errors.userId}</p>}

          <button type="button" onClick={handleSaveChanges} className={styles.button}>
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
