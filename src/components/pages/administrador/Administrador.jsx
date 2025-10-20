import { useState, useMemo } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import SeccionCRUD from "./SeccionCRUD.jsx";
import ModalPaciente from "./ModalPaciente.jsx";
import { usePacientes } from "/src/hooks/usePacientes.js";
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

  const {
    pacientes,
    mostrarModal,
    mostrarDetalle,
    mostrarEditar,
    pacienteSeleccionado,
    pacienteEnEdicion,
    abrirModalAlta,
    cerrarModalAlta,
    cerrarDetalle,
    cerrarEditar,
    guardarPaciente,
    eliminarPaciente,
    verDetallePaciente,
    editarPaciente,
    actualizarPaciente,
  } = usePacientes();

  const elementosPorPagina = 10;
  const pagina = paginaActual[key];

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

  const datosCompletos = datosMapeados[key].data;
  const encabezadosTabla = datosMapeados[key].header;
  const boton = datosMapeados[key].boton;

  const indiceFinal = pagina * elementosPorPagina;
  const indiceInicial = indiceFinal - elementosPorPagina;
  const datosMostrados = datosCompletos.slice(indiceInicial, indiceFinal);

  const handleCambioPagina = (numeroDePagina) => {
    setPaginaActual((prev) => ({ ...prev, [key]: numeroDePagina }));
  };

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
              mountOnEnter
              unmountOnExit
            >
              {Object.entries(datosMapeados).map(([tabKey, config]) => (
                <Tab
                  key={`tab-${tabKey}`}
                  eventKey={tabKey}
                  title={tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                >
                  <SeccionCRUD
                    tabKey={tabKey}
                    encabezados={config.header}
                    datos={tabKey === key ? datosMostrados : []}
                    botonTexto={config.boton}
                    pagina={pagina}
                    total={config.data.length / elementosPorPagina}
                    onCrear={abrirModalAlta}
                    onVer={verDetallePaciente}
                    onEditar={editarPaciente}
                    onEliminar={eliminarPaciente}
                    onPaginar={handleCambioPagina}
                  />
                </Tab>
              ))}
            </Tabs>
          </Col>
        </Row>
      </Container>

      <ModalPaciente
        tipo="modal"
        visible={mostrarModal}
        onClose={cerrarModalAlta}
        onGuardar={guardarPaciente}
      />
      <ModalPaciente
        tipo="detalle"
        visible={mostrarDetalle}
        onClose={cerrarDetalle}
        datos={pacienteSeleccionado}
      />
      <ModalPaciente
        tipo="editar"
        visible={mostrarEditar}
        onClose={cerrarEditar}
        datos={pacienteEnEdicion}
        onGuardar={actualizarPaciente}
      />
    </main>
  );
};

export default Administrador;