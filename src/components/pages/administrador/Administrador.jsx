// Administrador.jsx
import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Tabs, Tab, Table, Pagination } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import './Administrador.css';

// -----------------------------------------------------------
// 📚 DATOS DE EJEMPLO SIMULADOS
// -----------------------------------------------------------

const generarDatosSimulados = (prefijo, cantidad) => {
    const datos = [];
    for (let i = 1; i <= cantidad; i++) {
        // Estructura de datos genérica para la demostración
        datos.push({
            id: i,
            campo1: `${prefijo} ${i}`,
            campo2: `Detalle ${i}`,
            campo3: `Valor ${Math.floor(Math.random() * 100)}`,
            // Se puede agregar campo4 para Turnos/Pacientes si es necesario
        });
    }
    return datos;
};

// Generamos datos para cada sección (con cantidades reales para paginar)
const datosServicios = generarDatosSimulados('Servicio de Peluquería', 23);
const datosPacientes = generarDatosSimulados('Paciente Max', 48);
const datosTurnos = generarDatosSimulados('Turno Agendado', 31);

// Definimos los encabezados de tabla (coinciden con los props originales)
const encabezados = {
    servicios: ['Nombre', 'Descripción', 'Costo'],
    pacientes: ['Dueño', 'Mascota', 'Especie', 'Raza'],
    turnos: ['Fecha', 'Hora', 'Paciente', 'Servicio'],
};

const Administrador = () => {
    // -----------------------------------------------------------
    // ⚙️ ESTADOS GLOBALES DE LA PÁGINA
    // -----------------------------------------------------------
    
    // 1. Estado para controlar la pestaña activa (servicios, pacientes, turnos)
    const [key, setKey] = useState('servicios');

    // 2. Estado para controlar la página actual de cada tabla
    const [paginaActual, setPaginaActual] = useState({
        servicios: 1,
        pacientes: 1,
        turnos: 1,
    });
    
    // Constante para definir cuántos elementos se muestran por tabla
    const elementosPorPagina = 10;
    
    // Objeto que mapea la 'key' activa a sus datos y encabezados
    const datosMapeados = useMemo(() => ({
        servicios: { data: datosServicios, header: encabezados.servicios, boton: 'Agregar Servicio' },
        pacientes: { data: datosPacientes, header: encabezados.pacientes, boton: 'Dar de Alta Paciente' },
        turnos: { data: datosTurnos, header: encabezados.turnos, boton: 'Cargar Turno' },
    }), []);


    // -----------------------------------------------------------
    // 💡 LÓGICA DE PAGINACIÓN Y SEGMENTACIÓN DE DATOS
    // -----------------------------------------------------------
    
    // Obtenemos los datos, la página actual y el total de elementos de la sección activa
    const { data: datosCompletos, header: encabezadosTabla, boton } = datosMapeados[key];
    const pagina = paginaActual[key];
    const totalElementos = datosCompletos.length;
    
    // Calculamos los índices para segmentar los datos que se deben mostrar
    const indiceFinal = pagina * elementosPorPagina;
    const indiceInicial = indiceFinal - elementosPorPagina;
    
    // 🎯 Segmentamos los datos: esta es la lista que se usará para renderizar la tabla
    const datosMostrados = datosCompletos.slice(indiceInicial, indiceFinal);
    
    
    // -----------------------------------------------------------
    // 🔄 FUNCIONES MANEJADORAS
    // -----------------------------------------------------------

    // Función para manejar el cambio de página dentro de la sección activa
    const handleCambioPagina = (numeroDePagina) => {
        setPaginaActual(prev => ({
            ...prev,
            [key]: numeroDePagina, // Actualiza solo la página de la sección activa
        }));
    };
    
    // Función para manejar el cambio de pestaña y resetear la paginación a la página 1
    const handleCambioPestana = (nuevaKey) => {
        setKey(nuevaKey);
        // Opcional: podrías resetear la paginación de la nueva pestaña a 1
        // setPaginaActual(prev => ({ ...prev, [nuevaKey]: 1 }));
    };

    // -----------------------------------------------------------
    // 🧩 COMPONENTE DE PAGINACIÓN FUNCIONAL (Modificado del original)
    // -----------------------------------------------------------

    const PaginacionTabla = ({ totalElementos, elementosPorPagina, paginaActual, onPageChange }) => {
        const totalPaginas = Math.ceil(totalElementos / elementosPorPagina);
        const items = [];

        // Botón 'Anterior'
        items.push(
            <Pagination.Prev 
                key="prev" 
                onClick={() => onPageChange(paginaActual - 1)} 
                disabled={paginaActual === 1}
            />
        );

        // Números de página
        for (let number = 1; number <= totalPaginas; number++) {
            items.push(
                <Pagination.Item 
                    key={number} 
                    active={number === paginaActual}
                    onClick={() => onPageChange(number)} 
                >
                    {number}
                </Pagination.Item>,
            );
        }

        // Botón 'Siguiente'
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


    // -----------------------------------------------------------
    // 📋 COMPONENTE DE TABLA FUNCIONAL (Reemplaza a TablaEjemplo)
    // -----------------------------------------------------------
    
    const TablaCRUD = ({ encabezadosTabla, datosMostrados }) => (
        <div className="contenedor-tabla">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        {encabezadosTabla.map((encabezado, index) => (
                            <th key={index}>{encabezado}</th>
                        ))}
                        <th className='columna-acciones'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Renderizamos los datos segmentados */}
                    {datosMostrados.length > 0 ? (
                        datosMostrados.map((item, index) => (
                            <tr key={index}>
                                <td>{item.campo1}</td>
                                <td>{item.campo2}</td>
                                {/* Renderiza el campo3 si existe y dependiendo de la pestaña */}
                                {encabezadosTabla.length > 2 && <td>{item.campo3}</td>}
                                {/* Si hay 4 encabezados (ej. Pacientes/Turnos), el campo 4 también iría aquí */}
                                {encabezadosTabla.length > 3 && <td>{`Extra ${item.id}`}</td>} 

                                
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
    

    // -----------------------------------------------------------
    // 🎨 RENDERIZADO PRINCIPAL
    // -----------------------------------------------------------
    
    return (
        // Quitamos <Navbar /> y <Footer />
        <main className="seccion-principal-admin">
            <Container>
                {/* Título de la Sección */}
                <Row className="fila-titulo-admin">
                    <Col>
                        <h1 className="titulo-administracion">Administración</h1>
                        <hr className="linea-division" />
                    </Col>
                </Row>

                {/* Navegación de Pestañas (Sub-secciones) */}
                <Row className="fila-contenido-admin">
                    <Col>
                        <Tabs
                            id="navegacion-admin"
                            activeKey={key}
                            onSelect={handleCambioPestana} // Ahora usa handleCambioPestana
                            className="pestanas-crud mb-3"
                        >
                            {/* Mapeamos las pestañas (mejor que repetir el código) */}
                            {Object.keys(datosMapeados).map((tabKey) => (
                                <Tab 
                                    eventKey={tabKey} 
                                    title={tabKey.charAt(0).toUpperCase() + tabKey.slice(1)} // Servicios, Pacientes, Turnos
                                    key={tabKey}
                                >
                                    <h2 className="subtitulo-seccion">Gestión de {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}</h2>
                                    
                                    <div className="btn-crear-container">
                                        <button className="btn-crear-elemento">{datosMapeados[tabKey].boton}</button>
                                    </div>
                                    
                                    {/* 1. Tabla de la sección activa */}
                                    <TablaCRUD
                                        encabezadosTabla={datosMapeados[tabKey].header}
                                        datosMostrados={tabKey === key ? datosMostrados : []} // Solo muestra los datos segmentados de la pestaña activa
                                    />
                                    
                                    {/* 2. Paginación de la sección activa */}
                                    <PaginacionTabla 
                                        totalElementos={datosMapeados[tabKey].data.length} // Usa la longitud total de la data
                                        elementosPorPagina={elementosPorPagina}
                                        paginaActual={paginaActual[tabKey]} // Usa la página actual de ESTA sección
                                        onPageChange={handleCambioPagina} // Función para cambiar la página
                                    />
                                </Tab>
                            ))}
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </main>
        // Quitamos </>
    );
};

export default Administrador;