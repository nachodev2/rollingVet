import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";
import Registro from "../pages/loginRegistro/Registro";
<<<<<<< HEAD
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
=======
import { NavLink } from "react-router";
import Login from "../pages/loginRegistro/Login";
import "./Menu.css";

const AuthButtons = ({
  isLoggedIn,
  userRole,
  userName,
  handleLogout,
  handleLogin,
}) => {
  if (isLoggedIn) {
    const saludo = userRole === "admin" ? `Administrador` : userName;
    return (
      <div className="nav-botones d-flex align-items-center gap-3">
        <span className="mensaje-bienvenida">¡Bienvenido, {saludo}!</span>
        <Button
          className="btn-icono-logout"
          onClick={handleLogout}
>>>>>>> 9c10eb73bb28ea61a97c9929b6a9d3f969def744
          title="Cerrar Sesión"
        >
          <BoxArrowRight size={22} />
        </Button>
      </div>
    );
  }

  return (
    <div className="nav-botones d-flex gap-3">
      {/* SE PASA handleLogin AHORA */}
<<<<<<< HEAD
      <Registro handleLogin={handleLogin} /> 
=======
      <Registro handleLogin={handleLogin} />
>>>>>>> 9c10eb73bb28ea61a97c9929b6a9d3f969def744
      <Login handleLogin={handleLogin} />
    </div>
  );
};

<<<<<<< HEAD

=======
>>>>>>> 9c10eb73bb28ea61a97c9929b6a9d3f969def744
const Menu = () => {
  const [estaEnScroll, setEstaEnScroll] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('visitante');
  const [userName, setUserName] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("visitante");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const manejarScroll = () => {
      const posicionScroll = window.scrollY;
      setEstaEnScroll(posicionScroll > 50);
    };

    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

<<<<<<< HEAD
  const handleLogin = (role = 'user', name = 'Usuario') => {
=======
  const handleLogin = (role = "user", name = "Usuario") => {
>>>>>>> 9c10eb73bb28ea61a97c9929b6a9d3f969def744
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
<<<<<<< HEAD
    setUserRole('visitante');
    setUserName('');
=======
    setUserRole("visitante");
    setUserName("");
>>>>>>> 9c10eb73bb28ea61a97c9929b6a9d3f969def744
  };

  const getNavLinks = (role) => {
    const links = [
<<<<<<< HEAD
      { href: "#productos", text: "Productos" },
      { href: "#contacto", text: "Contacto" },
      { href: "#nosotros", text: "Sobre nosotros" },
    ];

    if (role === 'user' || role === 'admin') {
      links.splice(1, 0, { href: "/turnos", text: "Turnos" }); 
    }
    
    if (role === 'admin') {
=======
      { href: "/productos", text: "Productos" },
      { href: "/contacto", text: "Contacto" },
      { href: "/nosotros", text: "Sobre nosotros" },
    ];

    if (role === "user" || role === "admin") {
      links.splice(1, 0, { href: "/turnos", text: "Turnos" });
    }

    if (role === "admin") {
>>>>>>> 9c10eb73bb28ea61a97c9929b6a9d3f969def744
      links.push({ href: "/administracion", text: "Administración" });
    }

    return links;
  };
<<<<<<< HEAD
  
=======

>>>>>>> 9c10eb73bb28ea61a97c9929b6a9d3f969def744
  const navLinks = getNavLinks(userRole);

  return (
    <>
      <div className={`nav-flotante ${estaEnScroll ? "visible" : "oculto"}`}>
        <div className="nav-cristal">
          <Nav className="justify-content-center">
            {navLinks.map((link, index) => (
<<<<<<< HEAD
                <Nav.Link key={index} href={link.href} className="link-scroll mx-3">
                    {link.text}
                </Nav.Link>
=======
              <Nav.Link
                as={NavLink}
                to={link.href}
                className="link-inicial mx-3"
              >
                {link.text}
              </Nav.Link>
>>>>>>> 9c10eb73bb28ea61a97c9929b6a9d3f969def744
            ))}
          </Nav>
        </div>
      </div>
<<<<<<< HEAD
      
=======

>>>>>>> 9c10eb73bb28ea61a97c9929b6a9d3f969def744
      <Navbar
        expand="lg"
        className={`nav-inicial ${estaEnScroll ? "oculto" : "visible"}`}
      >
        <Container>
          <Navbar.Brand href="/" className="logo fw-bold fs-3">
            RollingVet
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbar-nav-collapse"
            className="boton-hamburguesa"
          />
          <Navbar.Collapse id="navbar-nav-collapse">
            <Nav className="mx-auto enlaces-centrales">
<<<<<<< HEAD
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
=======
              {navLinks.map((link, index) => (
                <Nav.Link
                  as={NavLink}
                  to={link.href}
                  className="link-inicial mx-3"
                >
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
>>>>>>> 9c10eb73bb28ea61a97c9929b6a9d3f969def744
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;