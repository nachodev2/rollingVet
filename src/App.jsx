// App.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomNavbar from './components/shared/CustomNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <CustomNavbar />
      
      {/* Contenido principal */}
      <main style={{ paddingTop: '5rem' }}>
        {/* Hero section */}
        <section className="text-center py-5">
          <Container>
            <Row>
              <Col>
                <h1 className="display-1 fw-bold text-dark mb-5">
                  Bienestar y amor
                </h1>
                
                {/* Simulación del dashboard como en la imagen */}
                <div className="mx-auto" style={{ maxWidth: '800px' }}>
                  <Card className="shadow-lg border-0 overflow-hidden">
                    <div 
                      className="p-5 text-white position-relative"
                      style={{ 
                        background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
                        minHeight: '400px'
                      }}
                    >
                      <div 
                        className="bg-white bg-opacity-10 rounded-4 p-4 backdrop-blur"
                        style={{ backdropFilter: 'blur(10px)' }}
                      >
                        <div className="text-start">
                          <small className="opacity-75">Reports › Overview</small>
                          <Row className="align-items-center mt-3 mb-4">
                            <Col>
                              <h2 className="display-3 fw-bold mb-0">78%</h2>
                              <h5>Efficiency Improvements</h5>
                            </Col>
                            <Col xs="auto">
                              <div className="bg-white bg-opacity-20 rounded-pill px-3 py-2">
                                <small>All Regions (33) ▼</small>
                              </div>
                            </Col>
                          </Row>
                          
                          {/* Simulación de gráfico */}
                          <div className="d-flex justify-content-between align-items-end" style={{ height: '150px' }}>
                            {[2021, 2022, 2023, 2024].map((year, index) => (
                              <div key={year} className="d-flex flex-column align-items-center flex-fill">
                                <small className="mb-2">{year}</small>
                                <div className="d-flex flex-column align-items-center">
                                  {Array.from({length: Math.floor(Math.random() * 6) + 3}).map((_, i) => (
                                    <div
                                      key={i}
                                      className="bg-white rounded-circle opacity-75 mb-1"
                                      style={{
                                        width: '8px',
                                        height: '8px',
                                        transform: `translateY(${Math.random() * 20}px)`
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Servicios */}
        <section className="py-5">
          <Container>
            <Row>
              <Col>
                <h2 className="display-4 fw-bold text-center text-dark mb-5">
                  Servicios Veterinarios
                </h2>
              </Col>
            </Row>
            <Row className="g-4">
              {[
                'Consultas Generales',
                'Cirugías Especializadas', 
                'Análisis Clínicos',
                'Vacunación',
                'Emergencias 24/7',
                'Cuidado Preventivo'
              ].map((service, index) => (
                <Col key={index} md={6} lg={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body className="p-4">
                      <Card.Title className="h5 fw-semibold text-dark mb-3">
                        {service}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        Servicio profesional de alta calidad para el cuidado integral de tu mascota.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Sección adicional para probar scroll */}
        <section className="py-5" style={{ backgroundColor: '#f0fdf4' }}>
          <Container>
            <Row>
              <Col>
                <h2 className="display-4 fw-bold text-center text-dark mb-5">
                  ¿Por qué elegir RollingVet?
                </h2>
              </Col>
            </Row>
            {Array.from({length: 6}).map((_, index) => (
              <Row key={index} className="mb-4">
                <Col>
                  <Card className="shadow-sm border-0">
                    <Card.Body className="p-5">
                      <Card.Title className="h3 fw-semibold text-dark mb-3">
                        Ventaja {index + 1}
                      </Card.Title>
                      <Card.Text className="text-muted lead">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                        velit esse cillum dolore eu fugiat nulla pariatur.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </Container>
        </section>
      </main>
    </div>
  );
}

export default App;