import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Table,
  Pagination,
  Modal,
} from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { v4 as uuidv4 } from "uuid";
import Paciente from "../paciente/Paciente.jsx";
import "./Administrador.css";

// Simulación local (servicios y turnos)
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

const datosServicios = generarDatosSimulados("Servicio de Peluquería", 23);
const datosTurnos = generarDatosSimulados("Turno Agendado", 31);

const encabezados = {
  servicios: ["Nombre", "Descripción", "Costo"],
  pacientes: ["Dueño", "Mascota", "Especie", "Raza"],
  turnos: ["Fecha", "Hora", "Paciente", "Servicio"],
};

const Administrador = () => {
  const [key, setKey] = useState("servicios");
  const [paginaActual, setPaginaActual] = useState({
    servicios: 1,
    pacientes: 1,
    turnos: 1,
  });

  const [mostrarModalPaciente, setMostrarModalPaciente] = useState(false);
  const [pacientes, setPacientes] = useState([]);

  const elementosPorPagina = 10;
  const pagina = paginaActual[key];

  // 🔗 Preparado para cargar pacientes desde backend
  useEffect(() => {
    // fetch("/api/pacientes")
    //   .then(res => res.json())
    //   .then(data => setPacientes(data));
  }, []);

  const datosMapeados = useMemo(() => ({
    servicios: {
      data: datosServicios,
      header: encabezados.servicios,
      boton: "Agregar Servicio",
    },
    pacientes: {
      data: pacientes,
      header: encabezados.pacientes,
      boton: "Dar de Alta Paciente",
    },
    turnos: {
      data: datosTurnos,
      header: encabezados.turnos,
      boton: "Cargar Turno",
    },
  }), [pacientes]);

  const { data: datosCompletos, header: encabezadosTabla, boton } = datosMapeados[key];
  const indiceFinal = pagina * elementosPorPagina;
  const indiceInicial = indiceFinal - elementosPorPagina;
  const datosMostrados = datosCompletos.slice(indiceInicial, indiceFinal);

  const handleCambioPagina = (numeroDePagina) => {
    setPaginaActual((prev) => ({ ...prev, [key]: numeroDePagina }));
  };

  const handleCambioPestana = (nuevaKey) => {
    setKey(nuevaKey);
  };

  const handleCrear = () => {
    if (key === "pacientes") {
      setMostrarModalPaciente(true);
    }
  };

  const handleGuardarPaciente = (nuevoPaciente) => {
    const pacienteFormateado = {
      id: uuidv4(), // 🔄 Reemplazar por ID del backend si se usa POST
      campo1: `${nuevoPaciente.dueno.Nombre} ${nuevoPaciente.dueno.Apellido}`,
      campo2: nuevoPaciente.paciente.Nombre,
      campo3: nuevoPaciente.paciente.Especie,
      campo4: nuevoPaciente.paciente.Raza,
    };

    // 🔗 Preparado para enviar al backend
    // fetch("/api/pacientes", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(nuevoPaciente),
    // }).then(() => {
    //   setPacientes((prev) => [...prev, pacienteFormateado]);
    // });

    setPacientes((prev) => [...prev, pacienteFormateado]);
    setMostrarModalPaciente(false);
  };

  const TablaCRUD = ({ encabezadosTabla, datosMostrados }) => (
    <div className="mt-4 contenedor-tabla">
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            {encabezadosTabla.map((encabezado, index) => (
              <th key={index}>{encabezado}</th>
            ))}
            <th className="columna-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {datosMostrados.length > 0 ? (
            datosMostrados.map((item) => (
              <tr key={item.id}>
                <td>{item.campo1}</td>
                <td>{item.campo2}</td>
                {encabezadosTabla.length > 2 && <td>{item.campo3}</td>}
                {encabezadosTabla.length > 3 && <td>{item.campo4}</td>}
                <td className="acciones-botones-contenedor">
                  <div className="contenedor-iconos-accion">
                    <button className="btn-icono-accion editar" title="Editar">
                      <PencilSquare size={18} />
                    </button>
                    <button className="btn-icono-accion eliminar" title="Eliminar">
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={encabezadosTabla.length + 1} className="text-center">
                No hay elementos para mostrar en esta sección.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );

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
              {Object.keys(datosMapeados).map((tabKey) => (
                <Tab
                  eventKey={tabKey}
                  title={tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                  key={tabKey}
                >
                  <h2 className="subtitulo-seccion">
                    Gestión de {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                  </h2>

                  <div className="btn-crear-container">
                    <button className="btn-crear-elemento" onClick={handleCrear}>
                      {datosMapeados[tabKey].boton}
                    </button>
                  </div>

                  <TablaCRUD
                    encabezadosTabla={datosMapeados[tabKey].header}
                    datosMostrados={tabKey === key ? datosMostrados : []}
                  />

                  <Pagination className="justify-content-center">
                    {/* Paginación opcional */}
                  </Pagination>
                </Tab>
              ))}
            </Tabs>
          </Col>
        </Row>
      </Container>

      <Modal show={mostrarModalPaciente} onHide={() => setMostrarModalPaciente(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center fs-3 ms-4">Alta de Paciente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paciente
            modo="modal"
            onClose={() => setMostrarModalPaciente(false)}
            onGuardar={handleGuardarPaciente}
          />
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default Administrador;