import  { useState } from "react";
import CRUDServicios from "../CRUD/CRUDServicios.jsx";
import CRUDPacientes from "../CRUD/CRUDPacientes.jsx";
import CRUDTurnos from "../CRUD/CRUDTurnos.jsx";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import "./Administrador.css";


const generarDatosSimulados = (prefijo, cantidad) => {
    const datos = [];
    for (let i = 1; i <= cantidad; i++) {
        datos.push({
            id: i,
            campo1: `${prefijo} ${i}`,
            campo2: `Detalle ${i}`,
            campo3: `Valor ${Math.floor(Math.random() * 100)}`,
        });
    }
    return datos;
};

const encabezados = {
  servicios: ["Nombre", "Descripción", "Costo"],
};

const Administrador = () => {
    const [key, setKey] = useState("servicios");
    const [turnosReales, setTurnosReales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [paginaActual, setPaginaActual] = useState({
        servicios: 1,
        pacientes: 1,
        turnos: 1,
    });
    const [mostrarModal, setMostrarModal] = useState(false);
    const [turnoAEditar, setTurnoAEditar] = useState(null);

  const handleCambioPestana = (nuevaKey) => {
    setKey(nuevaKey);
  };

  return (
    <main className="seccion-principal-admin">
      <Container>
        <Row className="fila-titulo-admin">
          <Col>
            <h1 className="titulo-administracion">Administración</h1>
            <hr className="linea-division" />
          </Col>
        </Row>

        <Row className="fila-contenido-admin">
          <Col>
            <Tabs
              id="navegacion-admin"
              activeKey={key}
              onSelect={handleCambioPestana}
              className="pestanas-crud mb-3"
            >
              <Tab eventKey="servicios" title="Servicios">
                <CRUDServicios />
              </Tab>
              <Tab eventKey="pacientes" title="Pacientes">
                <CRUDPacientes />
              </Tab>
              <Tab eventKey="turnos" title="Turnos">
                <CRUDTurnos />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Administrador;
