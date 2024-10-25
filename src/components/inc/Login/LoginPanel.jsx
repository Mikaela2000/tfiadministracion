import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import style from "./LoginPanel.module.css";

function LoginPanel() {
  const redVariant = "danger";
  // Para mostrar o no el formulario de login
  const [show, setShow] = useState(false);
  // Para mostrar o no la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Errores de validaciones o BDD
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    setError(null);
    setFormData({
      email: "",
      password: "",
    });
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded user credentials
    const hardcodedEmail = "user@example.com";
    const hardcodedPassword = "password123";

    // Check if the input matches the hardcoded credentials
    if (formData.email === hardcodedEmail && formData.password === hardcodedPassword) {
      // Successful login logic (e.g., set user state, redirect, etc.)
      alert("Logged in successfully!"); // Replace with your actual login logic
      handleClose(); // Close the modal
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <Button className="btn-danger" onClick={handleShow}>
        LOGIN
      </Button>

      <Modal show={show} onHide={handleClose} className={style.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.body}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            {error && <Alert variant={redVariant}>{error}</Alert>}

            <Button type="submit" variant="danger">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginPanel;
