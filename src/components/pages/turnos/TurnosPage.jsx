import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// Importa los componentes de cada paso

const TurnosPage = () => {
    const [pasoActual, setPasoActual] = useState(1);
    const [datosTurno, setDatosTurno] = useState({
        detalleCita: '',
        veterinario: null,
        fecha: null,
        hora: null,
        mascota: { nombre: '', especie: '', raza: '', edad: '' }
    });

    const siguientePaso = () => setPasoActual(pasoActual + 1);
    const anteriorPaso = () => setPasoActual(pasoActual - 1);

    const renderPaso = () => {
        switch (pasoActual) {
            case 1:
                return <Paso1Detalle datos={datosTurno} setDatos={setDatosTurno} siguiente={siguientePaso} />;
            case 2:
                // Se pasa la lógica de los veterinarios al Paso 2
                return <Paso2Horario datos={datosTurno} setDatos={setDatosTurno} siguiente={siguientePaso} anterior={anteriorPaso} />;
            case 3:
                // Se pasa la función de envío final al Paso 3
                return <Paso3Confirmacion datos={datosTurno} confirmar={handleConfirmarTurno} anterior={anteriorPaso} />;
            default:
                return <h2>Error: Paso no encontrado.</h2>;
        }
    };

    const handleConfirmarTurno = () => {
        console.log("Datos finales listos para enviar al Backend:", datosTurno);
        // Aquí iría el fetch/axios para guardar el turno en la base de datos.
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1 className="mb-4 text-center">Gestión de Turnos</h1>
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