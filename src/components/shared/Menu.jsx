import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import Registro from "../pages/loginRegistro/Registro";
import Login from "../pages/loginRegistro/Login";
import "./Menu.css";

const Menu = () => {
  const [estaEnScroll, setEstaEnScroll] = useState(false);

  useEffect(() => {
    const manejarScroll = () => {
      const posicionScroll = window.scrollY;
      setEstaEnScroll(posicionScroll > 50);
    };

    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  return (
    <>
      <div className={`nav-flotante ${estaEnScroll ? "visible" : "oculto"}`}>
        <div className="nav-cristal">
          <Nav className="justify-content-center">
            <Nav.Link href="#productos" className="link-scroll mx-3">
              Productos
            </Nav.Link>
            <Nav.Link href="#planes" className="link-scroll mx-3">
              Planes
            </Nav.Link>
            <Nav.Link href="#contacto" className="link-scroll mx-3">
              Contacto
            </Nav.Link>
            <Nav.Link href="#nosotros" className="link-scroll mx-3">
              Sobre nosotros
            </Nav.Link>
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
              <Nav.Link href="#productos" className="link-inicial mx-3">
                Productos
              </Nav.Link>
              <Nav.Link href="#planes" className="link-inicial mx-3">
                Planes
              </Nav.Link>
              <Nav.Link href="#contacto" className="link-inicial mx-3">
                Contacto
              </Nav.Link>
              <Nav.Link href="#nosotros" className="link-inicial mx-3">
                Sobre nosotros
              </Nav.Link>
            </Nav>
            <div className="nav-botones d-flex gap-3">
              <Registro />

              <Login />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;
