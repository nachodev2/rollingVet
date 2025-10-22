import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Swal from "sweetalert2";

import Paso1Detalle from "./Paso1Detalle.jsx";
import Paso2Horario from "./Paso2Horario.jsx";
import Paso3Confirmacion from "./Paso3Confirmacion.jsx";

const TurnosPage = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [datosTurno, setDatosTurno] = useState({
    detalleCita: "",
    servicio: null,
    veterinario: null,
    fecha: null,
    hora: null,
    mascota: { nombre: "", especie: "", raza: "", edad: "" },
    precioTotal: 0,
  });

  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [loadingPago, setLoadingPago] = useState(false);

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const response = await fetch('http://localhost:5000/api/v1/servicios/activos', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setServicios(data.data);
          
        } else {
          
          setServicios([]);
        }
      } catch (error) {
        
        setServicios([]);
      }
    };
    cargarServicios();
  }, []);

  const siguientePaso = () => setPasoActual(pasoActual + 1);
  const anteriorPaso = () => setPasoActual(pasoActual - 1);

  const handlePagarConMercadoPago = () => {

    alert("Simulación: Redireccionando a la pasarela de Mercado Pago.");
};

const handlePagarEnLocal = () => {
    alert("Pago registrado como pendiente. Puedes pagar al momento de la consulta.");
};

const getToken = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return null;
  }
  return token;
};

const confirmarTurnoYPagar = async () => {
  if (!servicioSeleccionado || !servicioSeleccionado.precio) {
    Swal.fire({
      title: 'Servicio inválido',
      text: 'Debes seleccionar un servicio válido para pagar.',
      icon: 'warning',
      confirmButtonText: 'Entendido'
    });
    return;
  }

  setLoadingPago(true);

  try {
    const token = getToken();
    if (!token) return;



    const turnoData = {
      fecha: datosTurno.fecha,
      hora: datosTurno.hora,
      detalleCita: datosTurno.detalleCita,
      servicio: datosTurno.servicio,
      veterinario: {
        nombre: datosTurno.veterinario?.nombre,
        id: datosTurno.veterinario.id
      },
      mascota: datosTurno.mascota
    };

    

    const turnoResponse = await fetch('http://localhost:5000/api/v1/turnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(turnoData)
    });

    

    if (!turnoResponse.ok) {
      const errorText = await turnoResponse.text();
      
      throw new Error('Error al crear turno. Verifica los datos.');
    }

    const turnoResult = await turnoResponse.json();
    

    if (!turnoResult.success) {
      throw new Error(turnoResult.msg || turnoResult.error || 'Error al crear turno');
    }

    const turnoId = turnoResult.data._id;
    

    
    const pagoResponse = await fetch(`http://localhost:5000/api/v1/turnos/${turnoId}/pagar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    

    if (!pagoResponse.ok) {
      const errorText = await pagoResponse.text();
      
      throw new Error('Error al crear pago MercadoPago. Intente nuevamente.');
    }

    const pagoData = await pagoResponse.json();
    

    if (!pagoData.success || !pagoData.init_point) {
      throw new Error('Error procesando el pago. URL de pago no disponible.');
    }

    
    window.location.href = pagoData.init_point;

  } catch (error) {
    
    Swal.fire({
      title: 'Error',
      text: error.message || 'Error procesando el turno y pago',
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
  } finally {
    setLoadingPago(false);
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
            servicios={servicios}
            setServicioSeleccionado={setServicioSeleccionado}
            servicioSeleccionado={servicioSeleccionado}
            siguiente={siguientePaso}
            anterior={anteriorPaso}
          />
        );
      case 3:
        return (
          <div className="paso-3">
            <h3>Confirmación y Pago</h3>
            <div className="resumen-turno p-3 my-4 bg-light border rounded">
              <div className="resumen-item d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="label fw-semibold text-muted">Servicio:</span>
                <span className="value">{servicioSeleccionado?.nombre || 'No seleccionado'}</span>
              </div>
              <div className="resumen-item d-flex justify-content-between align-items-center py-2">
                <span className="label fw-semibold text-muted">Precio:</span>
                <span className="value precio fs-5 fw-bold text-success">${datosTurno.precioTotal?.toLocaleString('es-AR') || servicioSeleccionado?.costo?.toLocaleString('es-AR') || '0'}</span>
              </div>
              <div className="resumen-item d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="label fw-semibold text-muted">Fecha:</span>
                <span className="value">{datosTurno.fecha}</span>
              </div>
              <div className="resumen-item d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="label fw-semibold text-muted">Hora:</span>
                <span className="value">{datosTurno.hora}</span>
              </div>
              <div className="resumen-item d-flex justify-content-between align-items-center py-2 border-bottom">
                <span className="label fw-semibold text-muted">Veterinario:</span>
                <span className="value">{datosTurno.veterinario?.nombre}</span>
              </div>
              <div className="resumen-item d-flex justify-content-between align-items-center py-2">
                <span className="label fw-semibold text-muted">Mascota:</span>
                <span className="value">{datosTurno.mascota.nombre} - {datosTurno.mascota.especie}</span>
              </div>
            </div>
            <div className="acciones-pago d-flex justify-content-between mt-4">
              <button className="btn btn-secondary px-4 py-2"
                onClick={() => setPasoActual(2)}
              >
                ← Atrás
              </button>
              <button className="btn-pagar-mp px-4 py-2"
                onClick={confirmarTurnoYPagar}
                disabled={loadingPago || !servicioSeleccionado}
                style={{
                  background: loadingPago ? '#ccc' : '#009ee3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: loadingPago || !servicioSeleccionado ? 'not-allowed' : 'pointer'
                }}
              >
                {loadingPago ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                    Procesando...
                  </>
                ) : (
                  'Pagar con Mercado Pago'
                )}
              </button>
            </div>
          </div>
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
