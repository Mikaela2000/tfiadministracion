import React, { useState } from "react";
import { useDispatch } from "react-redux"; 
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import style from "./PanelRegistrarse.module.css";
import * as actions from "../../../redux/actions";

function PanelRegistrarse() {
  const dispatch = useDispatch(); 
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleClose = () => {
    setShow(false);
    setError(null);
    setFormData({
      name: "",
      lastname: "",
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  
    dispatch(actions.register(formData))
      .then(() => {
        alert("User registered successfully!");
        handleClose();
      })
      .catch((error) => {
        setError("Registration failed.");
        console.error(error);
      });
  };
  

  return (
    <>
      <Button className="" style={{ backgroundColor: "rgb(79,70,230)" }} onClick={handleShow}>
        Nuevo usuario
      </Button>

      <Modal show={show} onHide={handleClose} className={style.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Register User</Modal.Title>
        </Modal.Header>
        <Modal.Body className={style.body}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Form.Check
                className="mt-3"
                type="checkbox"
                label="Show password"
                onChange={togglePasswordVisibility}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" style={{ backgroundColor: "rgb(79,70,230)" }}>
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PanelRegistrarse;
