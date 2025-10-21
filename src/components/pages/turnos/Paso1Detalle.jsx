import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const Paso1Detalle = ({ datos, setDatos, siguiente }) => {
  const [detalleCita, setDetalleCita] = useState(datos.detalleCita || "");
  const [mascota, setMascota] = useState(
    datos.mascota || {
      nombre: "",
      especie: "",
      raza: "",
      edad: "",
    }
  );

  const handleMascotaChange = (e) => {
    const { name, value } = e.target;

    setMascota((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !detalleCita ||
      !mascota.nombre ||
      !mascota.especie ||
      !mascota.raza ||
      !mascota.edad
    ) {
      alert("Por favor, completa todos los campos para continuar.");
      return;
    }

    setDatos({
      ...datos,
      detalleCita,
      mascota,
    });

    siguiente();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Detalles de la Cita</h3>
      <Form.Group className="mb-4" controlId="formDetalleCita">
        <Form.Label>Detalle de la cita / Motivo de la consulta (*)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Describe el motivo de la consulta (ej: Vacunación anual, chequeo general, etc.)"
          value={detalleCita}
          onChange={(e) => setDetalleCita(e.target.value)}
          required
        />
      </Form.Group>

      <h3>Datos de tu Mascota</h3>
      <Card className="p-3 mb-4">
        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="mascotaNombre">
              <Form.Label>Nombre (*)</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={mascota.nombre}
                onChange={handleMascotaChange}
                placeholder="ej. Luna"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="mascotaEspecie">
              <Form.Label>Especie (*)</Form.Label>
              <Form.Control
                type="text"
                name="especie"
                placeholder="Perro, Gato, Ave, etc."
                value={mascota.especie}
                onChange={handleMascotaChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="mascotaRaza">
              <Form.Label>Raza (*)</Form.Label>
              <Form.Control
                type="text"
                name="raza"
                value={mascota.raza}
                onChange={handleMascotaChange}
                placeholder="ej. Labrador Retriever"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="mascotaEdad">
              <Form.Label>Edad (Años) (*)</Form.Label>
              <Form.Control
                type="number"
                name="edad"
                min="0"
                value={mascota.edad}
                onChange={handleMascotaChange}
                placeholder="ej. 5"
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      <div className="d-flex justify-content-end mt-4">
        <Button variant="primary" type="submit">
          Siguiente
        </Button>
      </div>
    </Form>
  );
};

export default Paso1Detalle;
