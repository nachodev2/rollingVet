import React, { useState, useMemo } from "react";
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
import { PencilSquare, Trash, Eye } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import Paciente from "../paciente/Paciente.jsx";
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

const datosServicios = generarDatosSimulados("Servicio de Peluquería", 10);
const datosTurnos = generarDatosSimulados("Turno Agendado", 15);

const encabezados = {
  servicios: ["Nombre", "Descripción", "Costo"],
  pacientes: ["Dueño", "Mascota", "Especie", "Raza"],
  turnos: ["Fecha", "Hora", "Paciente", "Servicio"],
};

const Administrador = () => {
  const [key, setKey] = useState("pacientes");
  const [paginaActual, setPaginaActual] = useState({
    servicios: 1,
    pacientes: 1,
    turnos: 1,
  });

  const [mostrarModalPaciente, setMostrarModalPaciente] = useState(false);
  const [mostrarDetallePaciente, setMostrarDetallePaciente] = useState(false);
  const [mostrarEditarPaciente, setMostrarEditarPaciente] = useState(false);

  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [pacienteEnEdicion, setPacienteEnEdicion] = useState(null);

  const elementosPorPagina = 10;
  const pagina = paginaActual[key];

  const datosMapeados = useMemo(
    () => ({
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
    }),
    [pacientes]
  );

  const {
    data: datosCompletos,
    header: encabezadosTabla,
    boton,
  } = datosMapeados[key];
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
    try {
      const pacienteFormateado = {
        id: crypto.randomUUID(),
        campo1: `${nuevoPaciente.dueno.Nombre} ${nuevoPaciente.dueno.Apellido}`,
        campo2: nuevoPaciente.paciente.Nombre,
        campo3: nuevoPaciente.paciente.Especie,
        campo4: nuevoPaciente.paciente.Raza,
        datosCompletos: nuevoPaciente,
      };

      setPacientes((prev) => [...prev, pacienteFormateado]);
      setMostrarModalPaciente(false);

      Swal.fire({
        icon: "success",
        title: "Paciente creado",
        text: "El paciente fue dado de alta correctamente.",
        confirmButtonColor: "#0d6efd",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al guardar el paciente.",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  const handleEliminarPaciente = (id) => {
    const paciente = pacientes.find((p) => p.id === id);
    if (!paciente) return;

    Swal.fire({
      title: "¿Eliminar paciente?",
      text: `Estás por eliminar a ${paciente.campo2}. Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          setPacientes((prev) => prev.filter((p) => p.id !== id));
          Swal.fire({
            icon: "success",
            title: "Paciente eliminado",
            text: "El paciente fue eliminado correctamente.",
            confirmButtonColor: "#0d6efd",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al eliminar el paciente.",
            confirmButtonColor: "#dc3545",
          });
        }
      }
    });
  };

  const handleVerDetallePaciente = (id) => {
    const paciente = pacientes.find((p) => p.id === id);
    if (paciente) {
      setPacienteSeleccionado(paciente.datosCompletos);
      setMostrarDetallePaciente(true);
    }
  };

  const handleEditarPaciente = (id) => {
    const paciente = pacientes.find((p) => p.id === id);
    if (paciente) {
      setPacienteEnEdicion({ ...paciente.datosCompletos, id: paciente.id });
      setMostrarEditarPaciente(true);
    }
  };

  const handleActualizarPaciente = (pacienteActualizado) => {
    Swal.fire({
      title: "¿Confirmar edición?",
      text: "Estás por modificar los datos del paciente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar cambios",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          setPacientes((prev) =>
            prev.map((p) =>
              p.id === pacienteEnEdicion.id
                ? {
                    ...p,
                    campo1: `${pacienteActualizado.dueno.Nombre} ${pacienteActualizado.dueno.Apellido}`,
                    campo2: pacienteActualizado.paciente.Nombre,
                    campo3: pacienteActualizado.paciente.Especie,
                    campo4: pacienteActualizado.paciente.Raza,
                    datosCompletos: pacienteActualizado,
                  }
                : p
            )
          );
          setMostrarEditarPaciente(false);
          setPacienteEnEdicion(null);

          Swal.fire({
            icon: "success",
            title: "Paciente actualizado",
            text: "Los datos fueron modificados correctamente.",
            confirmButtonColor: "#0d6efd",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al actualizar el paciente.",
            confirmButtonColor: "#dc3545",
          });
        }
      }
    });
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
                    {key === "pacientes" && (
                      <>
                        <button
                          className="btn-icono-accion ver"
                          title="Ver Detalle"
                          onClick={() => handleVerDetallePaciente(item.id)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="btn-icono-accion editar"
                          title="Editar"
                          onClick={() => handleEditarPaciente(item.id)}
                        >
                          <PencilSquare size={18} />
                        </button>
                        <button
                          className="btn-icono-accion eliminar"
                          title="Eliminar"
                          onClick={() => handleEliminarPaciente(item.id)}
                        >
                          <Trash size={18} />
                        </button>
                      </>
                    )}
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

                  <Pagination className="justify-content-center mt-3">
                    {Array.from({
                      length: Math.ceil(
                        datosCompletos.length / elementosPorPagina
                      ),
                    }).map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === pagina}
                        onClick={() => handleCambioPagina(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </Tab>
              ))}
            </Tabs>
          </Col>
        </Row>
      </Container>

      {/* Modal Alta */}
      <Modal
        show={mostrarModalPaciente}
        onHide={() => setMostrarModalPaciente(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center fs-3 ms-4">
            Alta de Paciente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paciente
            modo="modal"
            onClose={() => setMostrarModalPaciente(false)}
            onGuardar={handleGuardarPaciente}
          />
        </Modal.Body>
      </Modal>

      {/* Modal Detalle */}
      <Modal
        show={mostrarDetallePaciente}
        onHide={() => setMostrarDetallePaciente(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center fs-3 ms-4">
            Ficha del Paciente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paciente
            modo="detalle"
            datos={pacienteSeleccionado}
            onClose={() => setMostrarDetallePaciente(false)}
          />
        </Modal.Body>
      </Modal>

      {/* Modal Edición */}
      <Modal
        show={mostrarEditarPaciente}
        onHide={() => setMostrarEditarPaciente(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center fs-3 ms-4">
            Editar Paciente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Paciente
            modo="editar"
            datos={pacienteEnEdicion}
            onClose={() => setMostrarEditarPaciente(false)}
            onGuardar={handleActualizarPaciente}
          />
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default Administrador;
