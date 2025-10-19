import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Table,
  Pagination,
} from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import "./Administrador.css";
import Paciente from "../paciente/Paciente.jsx";
import { Modal } from "react-bootstrap";

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
const datosPacientes = generarDatosSimulados("Paciente Max", 48);
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

  const handleCrear = () => {
    switch (key) {
      case "pacientes":
        setMostrarModalPaciente(true);
        break;
      case "turnos":
        console.log("Crear turno");
        break;
      case "servicios":
        console.log("Crear servicio");
        break;
      default:
        console.warn("Sección no reconocida:", key);
    }
  };

  const elementosPorPagina = 10;

  const datosMapeados = useMemo(
    () => ({
      servicios: {
        data: datosServicios,
        header: encabezados.servicios,
        boton: "Agregar Servicio",
      },
      pacientes: {
        data: datosPacientes,
        header: encabezados.pacientes,
        boton: "Dar de Alta Paciente",
      },
      turnos: {
        data: datosTurnos,
        header: encabezados.turnos,
        boton: "Cargar Turno",
      },
    }),
    []
  );

  const {
    data: datosCompletos,
    header: encabezadosTabla,
    boton,
  } = datosMapeados[key];
  const pagina = paginaActual[key];
  const totalElementos = datosCompletos.length;

  const indiceFinal = pagina * elementosPorPagina;
  const indiceInicial = indiceFinal - elementosPorPagina;

  const datosMostrados = datosCompletos.slice(indiceInicial, indiceFinal);

  const handleCambioPagina = (numeroDePagina) => {
    setPaginaActual((prev) => ({
      ...prev,
      [key]: numeroDePagina,
    }));
  };

  const handleCambioPestana = (nuevaKey) => {
    setKey(nuevaKey);
  };

  const PaginacionTabla = ({
    totalElementos,
    elementosPorPagina,
    paginaActual,
    onPageChange,
  }) => {
    const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);
    const items = [];

    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => onPageChange(paginaActual - 1)}
        disabled={paginaActual === 1}
      />
    );

    for (let number = 1; number <= totalPaginas; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === paginaActual}
          onClick={() => onPageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => onPageChange(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      />
    );

    if (totalPaginas <= 1) return null;

    return (
      <div className="d-flex justify-content-center">
        <Pagination size="sm">{items}</Pagination>
      </div>
    );
  };

  const TablaCRUD = ({ encabezadosTabla, datosMostrados }) => (
    <div className="contenedor-tabla">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {encabezadosTabla.map((encabezado, index) => (
              <th key={index}>{encabezado}</th>
            ))}
            <th className="columna-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosMostrados.length > 0 ? (
            datosMostrados.map((item, index) => (
              <tr key={index}>
                <td>{item.campo1}</td>
                <td>{item.campo2}</td>

                {encabezadosTabla.length > 2 && <td>{item.campo3}</td>}

                {encabezadosTabla.length > 3 && <td>{`Extra ${item.id}`}</td>}

                <td className="acciones-botones-contenedor">
                  <div className="contenedor-iconos-accion">
                    <button className="btn-icono-accion editar" title="Editar">
                      <PencilSquare size={18} />
                    </button>
                    <button
                      className="btn-icono-accion eliminar"
                      title="Eliminar"
                    >
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
                    Gestión de{" "}
                    {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                  </h2>

                  <div className="btn-crear-container">
                    <button
                      className="btn-crear-elemento"
                      onClick={handleCrear}
                    >
                      {datosMapeados[tabKey].boton}
                    </button>
                  </div>

                  <TablaCRUD
                    encabezadosTabla={datosMapeados[tabKey].header}
                    datosMostrados={tabKey === key ? datosMostrados : []}
                  />

                  <PaginacionTabla
                    totalElementos={datosMapeados[tabKey].data.length}
                    elementosPorPagina={elementosPorPagina}
                    paginaActual={paginaActual[tabKey]}
                    onPageChange={handleCambioPagina}
                  />
                </Tab>
              ))}
            </Tabs>
          </Col>
        </Row>
      </Container>
      <Modal
        show={mostrarModalPaciente}
        onHide={() => setMostrarModalPaciente(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100 ms-3">
            Alta de Paciente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paciente
            modo="modal"
            onClose={() => setMostrarModalPaciente(false)}
            onGuardar={(nuevoPaciente) => {
              console.log("Paciente guardado:", nuevoPaciente);
              setMostrarModalPaciente(false);
            }}
          />
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default Administrador;
