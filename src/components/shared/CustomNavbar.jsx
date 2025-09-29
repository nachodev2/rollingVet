// components/CustomNavbar.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import './CustomNavbar.css';

const CustomNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Enlaces que se quedan fijos cuando hay scroll */}
      <div className={`navbar-center-scrolled ${isScrolled ? 'visible' : 'hidden'}`}>
        <div className="glass-nav-container">
          <Nav className="justify-content-center">
            <Nav.Link href="#productos" className="nav-link-custom mx-3">
              Productos
            </Nav.Link>
            <Nav.Link href="#planes" className="nav-link-custom mx-3">
              Planes
            </Nav.Link>
            <Nav.Link href="#contacto" className="nav-link-custom mx-3">
              Contacto
            </Nav.Link>
            <Nav.Link href="#nosotros" className="nav-link-custom mx-3">
              Sobre nosotros
            </Nav.Link>
          </Nav>
        </div>
      </div>

      {/* Navbar inicial completo */}
      <Navbar 
        expand="lg" 
        className={`navbar-initial ${isScrolled ? 'hidden' : 'visible'}`}
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand href="#home" className="navbar-brand-custom fw-bold fs-3">
            RollingVet
          </Navbar.Brand>

          {/* Botón hamburguesa para móviles y tablets */}
          <Navbar.Toggle 
            aria-controls="navbar-nav-collapse" 
            className="navbar-toggler-custom"
          />

          {/* Contenido colapsable */}
          <Navbar.Collapse id="navbar-nav-collapse">
            {/* Enlaces centrales */}
            <Nav className="mx-auto nav-links-center"> 
              <Nav.Link href="#productos" className="nav-link-initial mx-3">
                Productos
              </Nav.Link>
              <Nav.Link href="#planes" className="nav-link-initial mx-3">
                Planes
              </Nav.Link>
              <Nav.Link href="#contacto" className="nav-link-initial mx-3">
                Contacto
              </Nav.Link>
              <Nav.Link href="#nosotros" className="nav-link-initial mx-3">
                Sobre nosotros
              </Nav.Link>
            </Nav>

            {/* Botones */}
            <div className="navbar-buttons d-flex gap-3">
              <Button className="btn-register-custom rounded-pill px-4">
                Registrarse
              </Button>
              <Button className="btn-login-custom rounded-pill px-4">
                Iniciar Sesión
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;