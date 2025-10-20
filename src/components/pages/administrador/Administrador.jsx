import { useState, useMemo } from "react";
import CRUDServicios from "../CRUD/CRUDServicios.jsx";
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

const datosPacientes = generarDatosSimulados("Paciente Max", 48);

const encabezados = {
  servicios: ["Nombre", "Descripción", "Costo"],
  pacientes: ["Dueño", "Mascota", "Especie", "Raza"],
  turnos: ["Fecha", "Hora", "Paciente", "Servicio"],
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

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/turnos");
        const data = await response.json();

        if (response.ok && data.success) {
          const turnosMapeados = data.data.map((turno) => ({
            id: turno._id,
            campo1: turno.fecha,
            campo2: turno.hora,
            campo3: turno.mascota.nombre,
            campo4: turno.veterinario.nombre,
          }));

          setTurnosReales(turnosMapeados);
        } else {
          console.error("Error al obtener turnos:", data.msg || data.error);
          setTurnosReales([]);
        }
      } catch (error) {
        console.error("Error de conexión con el backend:", error);
        setTurnosReales([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTurnos();
  }, []);

  const elementosPorPagina = 10;

  const datosMapeados = useMemo(
    () => ({
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
    [turnosReales]
  );

  const datosSeleccionados = datosMapeados[key] || {};
  const {
    data: datosCompletos = [],
    header: encabezadosTabla = [],
    boton = "",
  } = datosSeleccionados;

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

  const TablaCRUD = ({
    encabezadosTabla,
    datosMostrados,
    isLoading,
    onEdit,
    onDelete,
  }) => (
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
          {isLoading ? (
            <tr>
              <td colSpan={encabezadosTabla.length + 1} className="text-center">
                Cargando datos...
              </td>
            </tr>
          ) : datosMostrados.length > 0 ? (
            datosMostrados.map((item, index) => (
              <tr key={item.id || index}>
                <td>{item.campo1}</td>
                <td>{item.campo2}</td>
                <td>{item.campo3}</td>
                <td>{item.campo4}</td>
                <td className="acciones-botones-contenedor">
                  <div className="contenedor-iconos-accion">
                    <button
                      className="btn-icono-accion editar"
                      title="Editar"
                      onClick={() => onEdit && onEdit(item)}
                    >
                      <PencilSquare size={18} />
                    </button>

                    <button
                      className="btn-icono-accion eliminar"
                      title="Eliminar"
                      onClick={() => onDelete && onDelete(item.id)}
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
              <Tab eventKey="servicios" title="Servicios">
                <CRUDServicios />
              </Tab>
              {Object.keys(datosMapeados).map((tabKey) => (
                <Tab
                  key={tabKey}
                  eventKey={tabKey}
                  title={tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                >
                  <>
                    <h2 className="subtitulo-seccion">
                      Gestión de{" "}
                      {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                    </h2>
                    <TablaCRUD
                      encabezadosTabla={datosMapeados[tabKey].header}
                      datosMostrados={tabKey === key ? datosMostrados : []}
                      isLoading={isLoading &&tabKey === 'turnos'}
                    />
                    <PaginacionTabla
                      totalElementos={datosMapeados[tabKey].data.length}
                      elementosPorPagina={elementosPorPagina}
                      paginaActual={paginaActual[tabKey]}
                      onPageChange={handleCambioPagina}
                    />
                  </>
                </Tab>
              ))}
            </Tabs>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Administrador;
