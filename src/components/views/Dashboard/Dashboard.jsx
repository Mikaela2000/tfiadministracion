import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";
import style from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import AdminTableUsers from './AdminTableUsers/AdminTableUsers';
import AdminTablePermisos from './AdminTablePermisos/AdminTablePermisos';

const Dashboard = () => {
  // Estado para controlar qué componente se muestra
  const [activeSection, setActiveSection] = useState('');

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <section className={style.dashboard}>
      <div className={style.column1}>
        <h1 className={style.title}>SoftVision</h1>
        <Card className={style.box}>
          {/* Botón de Permisos */}
          <Button
            className={style.columnComponent}
            onClick={() => handleButtonClick('permissions')}
          >
            <i className="bi bi-houses-fill" /> Permisos
          </Button>
          {/* Botón de Users */}
          <Button
            className={style.columnComponent}
            onClick={() => handleButtonClick('users')}
          >
            <i className="bi bi-people-fill" /> Users
          </Button>
          {/* Botón de Analitycs */}
          {/* <Button
            className={style.columnComponent}
            onClick={() => handleButtonClick('analytics')}
          >
            <i className="bi-bar-chart-line-fill" /> Analytics
          </Button> */}
        </Card>
        <Card className={style.box}>
          <h4>TeamMates</h4>
          <p>Renderizar admins</p>
        </Card>
        <Card className={style.box}>
          <Button variant="outline-danger " className={style.columnComponentExit} as={Link} to="/">
            <i className="bi bi-box-arrow-left" /> Exit Dashboard
          </Button>
        </Card>
      </div>

      <div className={style.column2}>
        <Card className={style.panel}>
          Admin Dashboard
        </Card>
        
        {/* Mostrar el componente AdminTableUsers si la sección activa es 'users' */}
        {activeSection === 'users' && <AdminTableUsers />}
		{activeSection === 'permissions' && <AdminTablePermisos />}
      </div>
    </section>
  );
};

export default Dashboard;
