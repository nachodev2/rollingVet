import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import Registro from "../pages/loginRegistro/Registro";
import Login from "../pages/loginRegistro/Login";
import "./Menu.css";

const AuthButtons = ({ isLoggedIn, userRole, userName, handleLogout, handleLogin }) => {
  if (isLoggedIn) {
    const saludo = userRole === 'admin' ? `Administrador` : userName;
    return (
      <div className="nav-botones d-flex align-items-center gap-3">
        <span className="mensaje-bienvenida">
          ¡Bienvenido, {saludo}!
        </span>
        <Button 
          className="btn-icono-logout" 
          onClick={handleLogout} 
          title="Cerrar Sesión"
        >
          <BoxArrowRight size={22} />
        </Button>
      </div>
    );
  }

  return (
    <div className="nav-botones d-flex gap-3">
      <Registro /> 
      <Login />
    </div>
  );
};


const Menu = () => {
  const [estaEnScroll, setEstaEnScroll] = useState(false);
  
  // Estados iniciales fijos (no hay sesión al inicio)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('visitante');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const manejarScroll = () => {
      const posicionScroll = window.scrollY;
      setEstaEnScroll(posicionScroll > 50);
    };

    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  // Esta función DEBE ser llamada desde la respuesta exitosa del Login/Registro al backend
  const handleLogin = (role = 'user', name = 'Usuario') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
  };

  // Esta función DEBE ser llamada después de que el backend valide el cierre de sesión
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('visitante');
    setUserName('');
  };

  const getNavLinks = (role) => {
    const links = [
      { href: "#productos", text: "Productos" },
      { href: "#contacto", text: "Contacto" },
      { href: "#nosotros", text: "Sobre nosotros" },
    ];

    if (role === 'user' || role === 'admin') {
      links.splice(1, 0, { href: "/turnos", text: "Turnos" }); 
    }
    
    if (role === 'admin') {
      links.push({ href: "/administracion", text: "Administración" });
    }

    return links;
  };
  
  const navLinks = getNavLinks(userRole);

  return (
    <>
      <div className={`nav-flotante ${estaEnScroll ? "visible" : "oculto"}`}>
        <div className="nav-cristal">
          <Nav className="justify-content-center">
            {navLinks.map((link, index) => (
                <Nav.Link key={index} href={link.href} className="link-scroll mx-3">
                    {link.text}
                </Nav.Link>
            ))}
          </Nav>
        </div>
      </div>
      
      <Navbar
        expand="lg"
        className={`nav-inicial ${estaEnScroll ? "oculto" : "visible"}`}
      >
        <Container>
          <Navbar.Brand href="#home" className="logo fw-bold fs-3">
            RollingVet
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbar-nav-collapse"
            className="boton-hamburguesa"
          />
          <Navbar.Collapse id="navbar-nav-collapse">
            <Nav className="mx-auto enlaces-centrales">
                {navLinks.map((link, index) => (
                    <Nav.Link key={index} href={link.href} className="link-inicial mx-3">
                        {link.text}
                    </Nav.Link>
                ))}
            </Nav>
            <AuthButtons 
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                userName={userName}
                handleLogout={handleLogout}
                handleLogin={handleLogin}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;