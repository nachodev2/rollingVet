import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const VETERINARIOS = [
    { id: 1, nombre: "Dr. Pérez", turno: "Mañana", inicio: 6, fin: 14 },
    { id: 2, nombre: "Dra. Gómez", turno: "Tarde", inicio: 14, fin: 22 }
];
const DURACION_CITA_MINUTOS = 30;

const Paso2Horario = ({ datos, setDatos, servicios, setServicioSeleccionado, servicioSeleccionado, siguiente, anterior }) => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(datos.fecha || '');
    const [veterinarioAsignado, setVeterinarioAsignado] = useState(datos.veterinario || null);
    const [horasDisponibles, setHorasDisponibles] = useState([]);
    const [horaSeleccionada, setHoraSeleccionada] = useState(datos.hora || '');

    useEffect(() => {
        if (fechaSeleccionada) {
            const diaDelMes = new Date(fechaSeleccionada).getDate();
            let vetHoy;

            if (diaDelMes % 2 === 0) {
                 vetHoy = VETERINARIOS.find(v => v.turno === "Mañana");
            } else {
                 vetHoy = VETERINARIOS.find(v => v.turno === "Tarde");
            }
            
            setVeterinarioAsignado(vetHoy);
            
            const horas = [];
            if (vetHoy) {
                for (let h = vetHoy.inicio; h < vetHoy.fin; h++) {
                    for (let m = 0; m < 60; m += DURACION_CITA_MINUTOS) {
                        const horaString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                        horas.push(horaString);
                    }
                }
            }
            setHorasDisponibles(horas);
        }
    }, [fechaSeleccionada]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fechaSeleccionada || !horaSeleccionada) {
            alert("Por favor, selecciona una fecha y una hora.");
            return;
        }

                        setDatos({
            ...datos,
            fecha: fechaSeleccionada,
            hora: horaSeleccionada,
            veterinario: veterinarioAsignado
        });
        siguiente();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h3>Horario y Profesional</h3>
            <Form.Group className="mb-3">
                <Form.Label>Servicio (*)</Form.Label>
                <Form.Select
                    value={datos.servicio || ''}
                    onChange={(e) => {
                        const servicioId = e.target.value;
                        const servicio = servicios.find(s => s._id === servicioId);
                        setServicioSeleccionado(servicio);
                        setDatos({
                            ...datos,
                            servicio: servicioId,
                            precioTotal: servicio?.precio || 0,
                            detalleCita: servicio ? `${servicio.nombre} - ${servicio.descripcion} - $${servicio.precio}` : ''
                        });
                    }}
                    required
                >
                    <option value="">Seleccionar servicio...</option>
                    {servicios
                        .filter(servicio => servicio && servicio.precio !== undefined && servicio.precio !== null && servicio.precio > 0)
                        .map(servicio => (
                        <option key={servicio._id} value={servicio._id}>
                            {servicio.nombre} - ${(servicio.precio || 0).toLocaleString('es-AR')}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Selecciona la Fecha (*)</Form.Label>
                <Form.Control
                    type="date"
                    min={new Date().toISOString().split('T')[0]} 
                    value={fechaSeleccionada}
                    onChange={(e) => {
                        setFechaSeleccionada(e.target.value);
                        setHoraSeleccionada('');
                    }}
                    required
                />
            </Form.Group>
            
            {veterinarioAsignado && (
                <Alert variant="info">
                    Veterinario asignado para el día: <strong>{veterinarioAsignado.nombre}</strong> ({veterinarioAsignado.turno}, de {veterinarioAsignado.inicio}:00 a {veterinarioAsignado.fin}:00)
                </Alert>
            )}

            {fechaSeleccionada && horasDisponibles.length > 0 && (
                <Form.Group className="mb-3">
                    <Form.Label>Selecciona la Hora (*)</Form.Label>
                    <Form.Select 
                        value={horaSeleccionada} 
                        onChange={(e) => setHoraSeleccionada(e.target.value)}
                        required
                    >
                        <option value="">-- Seleccionar hora --</option>
                        {horasDisponibles.map(hora => (
                            <option key={hora} value={hora}>{hora}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            )}
            
            <Form.Control type="hidden" value={veterinarioAsignado ? veterinarioAsignado.nombre : ''} />

            <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={anterior}>Anterior</Button>
                <Button variant="primary" type="submit" disabled={!horaSeleccionada}>Siguiente</Button>
            </div>
        </Form>
    );
};

export default Paso2Horario;
