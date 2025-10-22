import React from "react";
import { Container, Image, Button, Card, Row, Col } from "react-bootstrap";
import { BuildingFill } from "react-bootstrap-icons";
import "./Inicio.css";

function SeccionServicios() {
  return (
    <Container className="my-5 border-bottom">
      <section className="mb-5">
        <h2 className="servicesSectionText my-5">Veterinaria Premium</h2>
        <h3 className="display-5 ms-0 text-black my-5">
          Su salud es nuestra misión.
        </h3>
        <p className="mb-5">
          En RollingVet, combinamos la experiencia médica con una pasión
          incondicional por los animales.
          <br /> Ofrecemos una atención integral y personalizada para que tu
          mascota viva una vida feliz y saludable.
          <br /> Sin esperas innecesarias, solo el mejor cuidado.
        </p>
      </section>
      <section>
        <Row className="my-5">
          <Col xs={12} md={6} lg={3} className="mb-4 border p-4">
            <div className="service-block">
                <img src="/images/productos/huella.png" alt="Icono Huella" className="service-icon-img mb-3" />
                <h5 className="service-title text-black mb-3">Atencion Personalizada</h5>
                <p>Tu mascota, nuestra prioridad. Ofrecemos consultas detalladas, planes de salud a medida y un trato cálido y empático para ti y tu compañero animal.</p>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 border p-4">
            <div className="service-block">
                <img src="/images/escudo-medico.png" alt="Icono Escudo Medico" className="service-icon-img mb-3" />
                <h5 className="service-title text-black mb-3">Medicina Preventiva Integral</h5>
                <p>Mantenemos su salud por delante. Control de vacunas, desparasitación, chequeos anuales y nutrición para garantizar una vida larga y feliz.</p>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 border p-4">
            <div className="service-block">
                <img src="/images/simbolo-medico.png" alt="Icono Simbolo Medico" className="service-icon-img mb-3" />
                <h5 className="service-title text-black mb-3">Urgencias Veterinarias 24hs</h5>
                <p>Siempre listos cuando nos necesitas. Contamos con un equipo y equipamiento de emergencia para atender imprevistos y situaciones críticas rápidamente.</p>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 border p-4">
            <div className="service-block">
                <BuildingFill size={24} className="service-icon-img mb-3 text-black" />
                <h5 className="service-title text-black mb-3">Tecnología y Diagnóstico Avanzado</h5>
                <p>Precisión en cada diagnóstico. Utilizamos equipos de última generación (Rayos X, Ecografía, Laboratorio propio) para una evaluación clínica rápida y efectiva. Exportar a Hojas de cálculo</p>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default SeccionServicios;
