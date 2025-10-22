import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer bg-light text-dark py-5"> 
            <Container>
                <Row className="g-4"> 
                    <Col xs={12} md={4} className="d-flex">
                        <div className="logo-alineado d-lg-flex align-items-center justify-content-center mx-auto">
                            <img src="../../../../public/images/logo.svg" alt="logo" className="logoFooter d-block mx-auto me-lg-2" />
                            <h5 className="fw-bold display-6 mt-2 mt-lg-0 text-black">RollingVet</h5> 
                        </div>
                    </Col>
                    <Col xs={12} md={3} className="text-center text-md-start">
                        <h5 className="mb-3 text-dark">Contáctanos</h5>
                        <p className="mb-1">📧 Email: info@rollingvet.com</p>
                        <p className="mb-1">📞 Teléfono: +54 9 381 123-4567</p>
                        <p className="mb-0">📍 Dirección: Av. Siempre Viva 742</p>
                    </Col>
                    <Col xs={12} md={2} className="text-center text-md-start">
                        <h5 className="mb-3 text-dark">Síguenos</h5>
                        <ul className="list-unstyled">
                            <li><a href="#facebook" className="text-dark text-decoration-none">Facebook</a></li>
                            <li><a href="#instagram" className="text-dark text-decoration-none">Instagram</a></li>
                            <li><a href="#twitter" className="text-dark text-decoration-none">Twitter (X)</a></li>
                        </ul>
                    </Col>
                    <Col xs={12} md={3} className="text-center text-md-start">
                        <h5 className="mb-3 text-dark">Horarios y Legal</h5>
                        <p className="mb-1">Lunes a Viernes: 9:00 - 18:00</p>
                        <p className="mb-0">Sábados: 9:00 - 13:00</p>
                        <a href="#politicas" className="text-dark text-decoration-none d-block mt-3 opacity-75">Política de Privacidad</a>
                    </Col>

                </Row>
                <Row className="mt-4 pt-3 border-top"> 
                    <Col className="text-center">
                        <p className="m-0 opacity-75">&copy; {new Date().getFullYear()} RollingVet. Todos los derechos reservados.</p>
                    </Col>
                </Row>

            </Container>
        </footer>
    );
}

export default Footer;