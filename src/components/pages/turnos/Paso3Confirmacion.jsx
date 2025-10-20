import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const Paso3Confirmacion = ({ datos, confirmar, anterior }) => {
    
    
    const { detalleCita, veterinario, fecha, hora, mascota } = datos;

    
    const formatDate = (dateString) => {
        if (!dateString) return 'No seleccionada';
        const date = new Date(dateString + 'T00:00:00'); 
        return date.toLocaleDateString('es-AR', {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div>
            <h3>Paso 3: Confirmación de Turno</h3>
            <p className="lead text-muted">Por favor, revisa todos los detalles antes de confirmar la solicitud de turno.</p>

            
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5" className="bg-primary text-white">Detalles de la Cita</Card.Header>
                <Card.Body>
                    <strong>Motivo de la Consulta:</strong>
                    <p>{detalleCita}</p>
                </Card.Body>
            </Card>

            
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5">Información de la Mascota</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}><strong>Nombre:</strong> {mascota.nombre}</Col>
                        <Col md={6}><strong>Especie:</strong> {mascota.especie}</Col>
                        <Col md={6}><strong>Raza:</strong> {mascota.raza}</Col>
                        <Col md={6}><strong>Edad:</strong> {mascota.edad} años</Col>
                    </Row>
                </Card.Body>
            </Card>

            
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5">Fecha y Profesional</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={12} className="mb-2">
                            <strong>Fecha:</strong> {formatDate(fecha)}
                        </Col>
                        <Col md={6}>
                            <strong>Hora:</strong> {hora}
                        </Col>
                        <Col md={6}>
                            <strong>Veterinario Asignado:</strong> {veterinario ? veterinario.nombre : 'Error de Asignación'}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            
            <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={anterior}>
                    Volver y Modificar
                </Button>
                <Button variant="success" onClick={confirmar}>
                    Confirmar y Solicitar Turno
                </Button>
            </div>
        </div>
    );
};

export default Paso3Confirmacion;