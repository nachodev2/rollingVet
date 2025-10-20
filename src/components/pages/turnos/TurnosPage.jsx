import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Componentes Placeholder para maquetado
const Paso1Detalle = () => (
    <div>
        <h3>Paso 1: Detalles de la Cita y Mascota</h3>
        <p>Aquí irán los campos para el Detalle de la Cita, Nombre, Especie, Raza y Edad de la Mascota.</p>
        <div className="d-flex justify-content-end mt-4">
            <Button variant="primary">Siguiente</Button>
        </div>
    </div>
);

const Paso2Horario = () => (
    <div>
        <h3>Paso 2: Horario y Veterinario</h3>
        <p>Aquí irán los selectores de Fecha y Hora, con la lógica de asignación del Veterinario.</p>
        <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary">Anterior</Button>
            <Button variant="primary">Siguiente</Button>
        </div>
    </div>
);

const Paso3Confirmacion = () => (
    <div>
        <h3>Paso 3: Confirmación de Turno</h3>
        <p>Aquí se mostrará el resumen de todos los datos recolectados antes de enviar la solicitud.</p>
        <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary">Anterior</Button>
            <Button variant="success">Confirmar Turno</Button>
        </div>
    </div>
);


const TurnosPage = () => {
    // Definimos un paso estático (ej. 1) solo para ver el maquetado inicial
    const pasoActual = 1; 

    const renderPaso = () => {
        switch (pasoActual) {
            case 1:
                return <Paso1Detalle />;
            case 2:
                return <Paso2Horario />;
            case 3:
                return <Paso3Confirmacion />;
            default:
                return <h2>Error en la navegación.</h2>;
        }
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1 className="mb-4 text-center">Solicitar Nuevo Turno</h1>
                    <Card>
                        <Card.Header>
                            Paso {pasoActual} de 3
                        </Card.Header>
                        <Card.Body>
                            {renderPaso()}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TurnosPage;