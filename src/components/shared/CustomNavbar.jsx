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
        style={{ backgroundColor: 'transparent' }}
      >
        <Container>
          {/* Logo */}
          <Navbar.Brand href="#home" className="fw-bold fs-3">
            RollingVet
          </Navbar.Brand>

          {/* Enlaces centrales */}
          <Nav className="mx-auto">
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
          <div className="d-flex gap-3">
            <Button 
              variant="success" 
              className="btn-register rounded-pill px-4"
              style={{ backgroundColor: '#15803d', borderColor: '#15803d' }}
            >
              Registrarse
            </Button>
            <Button 
              variant="success" 
              className="btn-login rounded-pill px-4"
              style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }}
            >
              Iniciar Sesión
            </Button>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;