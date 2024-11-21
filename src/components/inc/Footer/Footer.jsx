import React from 'react';
import { Container } from 'react-bootstrap';
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} text-light`}>
        <p>&copy; Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
