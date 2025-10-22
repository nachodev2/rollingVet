<<<<<<< HEAD
import { useState, useMemo, useEffect } from "react";
import CRUDServicios from "../CRUD/CRUDServicios.jsx";
import Swal from "sweetalert2";
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
=======
import  { useState } from "react";
import CRUDServicios from "../CRUD/CRUDServicios.jsx";
import CRUDPacientes from "../CRUD/CRUDPacientes.jsx";
import CRUDTurnos from "../CRUD/CRUDTurnos.jsx";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
>>>>>>> dde175cf5e5046151dc0783984deff3ea75516db
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

<<<<<<< HEAD
const datosPacientes = generarDatosSimulados("Paciente Max", 48);

const encabezados = {
    servicios: ["Nombre", "Descripción", "Costo"],
    pacientes: ["Dueño", "Mascota", "Especie", "Raza"],
    turnos: ["Fecha", "Hora", "Mascota", "Veterinario"],
=======
const encabezados = {
  servicios: ["Nombre", "Descripción", "Costo"],
>>>>>>> dde175cf5e5046151dc0783984deff3ea75516db
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

<<<<<<< HEAD
    const elementosPorPagina = 10;

    const fetchTurnos = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/turnos'); 
            const data = await response.json();

            if (response.ok && data.success) {
                const turnosMapeados = data.data.map(turno => ({
                    id: turno._id, 
                    campo1: turno.fecha,
                    campo2: turno.hora,
                    campo3: turno.mascota.nombre, 
                    campo4: turno.veterinario.nombre,
                    turnoCompleto: turno 
                }));
                setTurnosReales(turnosMapeados);
            } else {
                setTurnosReales([]);
            }
        } catch (error) {
            setTurnosReales([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTurnos();
    }, []);

    const handleDeleteTurno = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:5000/api/turnos/${id}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        Swal.fire('Eliminado!', 'El turno ha sido eliminado.', 'success');
                        fetchTurnos();
                    } else {
                        const errorData = await response.json();
                        Swal.fire('Error', errorData.msg || 'No se pudo eliminar el turno.', 'error');
                    }
                } catch (error) {
                    Swal.fire('Error de Conexión', 'Hubo un problema al contactar al servidor.', 'error');
                }
            }
        });
    };

    const handleEditTurno = (turno) => {
        setTurnoAEditar(turno);
        setMostrarModal(true);
    };

    const datosMapeados = useMemo(
        () => ({
            pacientes: {
                data: datosPacientes,
                header: encabezados.pacientes,
                boton: "Dar de Alta Paciente",
            },
            turnos: {
                data: turnosReales, 
                header: encabezados.turnos,
                boton: "Cargar Turno",
            },
        }),
        [turnosReales]
    );

    const datosSeleccionados = datosMapeados[key] || {};
    const { data: datosCompletos = [], header: encabezadosTabla = [], boton = "" } =
        datosSeleccionados;

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

    const TablaCRUD = ({ encabezadosTabla, datosMostrados, isLoading, onEdit, onDelete }) => (
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
                                            Gestión de {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                                        </h2>
                                        <TablaCRUD
                                            encabezadosTabla={datosMapeados[tabKey].header}
                                            datosMostrados={tabKey === key ? datosMostrados : []}
                                            isLoading={isLoading && tabKey === 'turnos'}
                                            onDelete={tabKey === 'turnos' ? handleDeleteTurno : null} 
                                            onEdit={tabKey === 'turnos' ? handleEditTurno : null}
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
=======
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
>>>>>>> dde175cf5e5046151dc0783984deff3ea75516db
};

export default Administrador;
