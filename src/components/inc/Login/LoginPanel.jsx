import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import style from "./LoginPanel.module.css";
import * as actions from "../../../redux/actions";

function LoginPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inicializa el hook useNavigate
  const authError = useSelector((state) => state.error); // Obtiene el error desde el store
 
  const token = useSelector((state) => state.token) || localStorage.getItem("token"); // Si no está en el store, toma el token de localStorage

  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClose = () => {
    setShow(false);
    setFormData({ email: "", password: "" });
  };

  const handleShow = () => {
    dispatch(actions.clearAuthError()); // Limpia el error en el estado global
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.loginUser(formData.email, formData.password)); // Llama a la acción de login
  };

  // Redirige a otra ventana cuando el login es exitoso
  useEffect(() => {
    dispatch(actions.clearAuthError());
    if (token) {
      handleClose();
      navigate("/"); // Cambia "/ruta-destino" por la ruta a la que quieres redirigir
    }
  }, [token, navigate]);

  // Recupera el ID del usuario de localStorage
  const userId = localStorage.getItem("userId");

  return (
    <>
      <Button style={{ backgroundColor: 'rgb(7,33,69)' }} onClick={handleShow}>
        LOGIN
      </Button>

      <Modal show={show} onHide={handleClose} className={style.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.body}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            {authError && (
              <Alert variant="danger">
                {authError }
              </Alert>
            )}

            <Button style={{ backgroundColor: 'rgb(7,33,69)' }} type="submit" >
              Login
            </Button>
          </Form>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginPanel;
