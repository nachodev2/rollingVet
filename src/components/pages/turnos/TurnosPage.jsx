import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";

import Paso1Detalle from "./Paso1Detalle.jsx";
import Paso2Horario from "./Paso2Horario.jsx";
import Paso3Confirmacion from "./Paso3Confirmacion.jsx";

const TurnosPage = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [datosTurno, setDatosTurno] = useState({
    detalleCita: "",
    veterinario: null,
    fecha: null,
    hora: null,
    mascota: { nombre: "", especie: "", raza: "", edad: "" },
  });

  const siguientePaso = () => setPasoActual(pasoActual + 1);
  const anteriorPaso = () => setPasoActual(pasoActual - 1);

  const handlePagarConMercadoPago = () => {
    console.log("Iniciando redirección a Mercado Pago...");
    alert("Simulación: Redireccionando a la pasarela de Mercado Pago.");
};

const handlePagarEnLocal = () => {
    console.log("Pago registrado como pendiente/en local.");
    alert("Pago registrado como pendiente. Puedes pagar al momento de la consulta.");
};

const handleConfirmarTurno = async () => {

    const datosParaEnvio = {
        fecha: datosTurno.fecha,
        hora: datosTurno.hora,
        detalleCita: datosTurno.detalleCita,
        veterinario: datosTurno.veterinario,
        mascota: datosTurno.mascota
    };

    console.log('Enviando turno:', datosParaEnvio);

    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:5000/api/v1/turnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(datosParaEnvio),
        });

        const data = await response.json();

        if (response.ok) {
            
            Swal.fire({
                title: '¡Turno Confirmado con Éxito!',
                html: `Tu turno ha sido reservado. Código de la cita: <b>${data.data._id}</b>`,
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Pagar con Mercado Pago (Ficticio)',
                cancelButtonText: 'Pagar en el Local',
                confirmButtonColor: '#009ee3',
                cancelButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    handlePagarConMercadoPago();
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    handlePagarEnLocal();
                }
            });
            
            

        } else {
            
            Swal.fire({
                title: 'Error al Reservar',
                text: data.msg || data.error || 'Hubo un problema de validación en el servidor.',
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        Swal.fire({
            title: 'Error de Red',
            text: 'No se pudo conectar con el servidor de RollingVet. Asegúrate que el backend esté encendido.',
            icon: 'error',
            confirmButtonText: 'Reintentar'
        });
    }
};

  const renderPaso = () => {
    switch (pasoActual) {
      case 1:
        return (
          <Paso1Detalle
            datos={datosTurno}
            setDatos={setDatosTurno}
            siguiente={siguientePaso}
          />
        );
      case 2:
        return (
          <Paso2Horario
            datos={datosTurno}
            setDatos={setDatosTurno}
            siguiente={siguientePaso}
            anterior={anteriorPaso}
          />
        );
      case 3:
        return (
          <Paso3Confirmacion
            datos={datosTurno}
            confirmar={handleConfirmarTurno}
            anterior={anteriorPaso}
          />
        );
      default:
        return <h2>Error: Paso no encontrado.</h2>;
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="mb-4 text-center">Solicitar Nuevo Turno</h1>
          <Card>
            <Card.Header>Paso {pasoActual} de 3</Card.Header>
            <Card.Body>{renderPaso()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TurnosPage;
