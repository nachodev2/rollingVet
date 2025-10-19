import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './Inicio.css'
import eukanuba from '../../../../public/images/logos-vete-png/eukanuba-png.png'; 
import royalcanin from '../../../../public/images/logos-vete-png/royal-canin-png.png';
import oldprince from '../../../../public/images/logos-vete-png/Old-Prince.png';
import puppis from '../../../../public/images/logos-vete-png/puppis-png.png';
import purina from '../../../../public/images/logos-vete-png/purina-proplan.png';

function SeccionMarcas() {
  return (
    <Container className="my-5">
      <h5 className="mb-4">Marcas:</h5>
      <Row className="justify-content-center align-items-center gx-5 logo-row">
        <Col xs={6} md={2} className="logo-col p-3">
          <div className="logo-wrapper">
            <Image src={eukanuba} alt="Logo Eukanuba" fluid className="logo-img" />
          </div>
        </Col>
        <Col xs={6} md={2} className="logo-col p-3">
          <div className="logo-wrapper">
            <Image src={royalcanin} alt="Logo Royal Canin" fluid className="logo-img" />
          </div>
        </Col>
        <Col xs={6} md={2} className="logo-col p-3">
          <div className="logo-wrapper">
            <Image src={oldprince} alt="Logo Old Prince" fluid className="logo-img" />
          </div>
        </Col>
        <Col xs={6} md={2} className="logo-col p-3">
          <div className="logo-wrapper">
            <Image src={purina} alt="Logo Purina Pro Plan" fluid className="logo-img" />
          </div>
        </Col>
        <Col xs={6} md={2} className="logo-col p-3">
          <div className="logo-wrapper">
            <Image src={puppis} alt="Logo Puppis" fluid className="logo-img" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SeccionMarcas;