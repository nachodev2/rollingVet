import { useState, useEffect } from "react";
import { Modal, Button, Table, Form, Row, Col } from "react-bootstrap";
import { PencilSquare, Trash, Eye } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import "./CRUDTurnos.css";

const CRUDTurnos = () => {
  const [showModal, setShowModal] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => {
    setShowModal(false);
    setIsReadOnly(false);
    setNuevoTurno(turnoInicial);
    setErrors({});
    setEditIndex(null);
  };

  const veterinarios = [
    { id: "vet1", nombre: "Dr. Juan Pérez" },
    { id: "vet2", nombre: "Dra. María López" },
  ];

  const turnoInicial = {
    detalleCita: "",
    veterinario: null,
    fecha: "",
    hora: "",
    mascota: { nombre: "" },
  };

  const [turnos, setTurnos] = useState(() => {
    const saved = localStorage.getItem("turnos");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [nuevoTurno, setNuevoTurno] = useState(turnoInicial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("turnos", JSON.stringify(turnos));
  }, [turnos]);

  const isWorkingDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDay() !== 0 && date.getDay() !== 6; // Not Sunday(0) or Saturday(6)
  };

  const timeSlots = () => {
    const slots = [];
    for (let h = 9; h <= 16; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
    }
    return slots;
  };

  const handleVer = (index) => {
    setNuevoTurno(turnos[index]);
    setIsReadOnly(true);
    abrirModal();
  };

  const handleEditar = (index) => {
    const turno = turnos[index];
    Swal.fire({
      title: "¿Editar turno?",
      text: `¿Seguro que quieres editar el turno de ${turno.mascota.nombre}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#6c9a72",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        setNuevoTurno(turno);
        setEditIndex(index);
        setIsReadOnly(false);
        abrirModal();
      }
    });
  };

  const handleEliminar = (index) => {
    const turno = turnos[index];
    Swal.fire({
      title: "¿Eliminar turno?",
      text: `Se eliminará el turno de ${turno.mascota.nombre} con ${turno.veterinario.nombre}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#6c9a72",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizados = turnos.filter((_, i) => i !== index);
        setTurnos(actualizados);
        Swal.fire({
          icon: "success",
          title: "Turno eliminado correctamente",
          confirmButtonColor: "#6c9a72",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleAgregar = () => {
    const newErrors = {};

    if (!nuevoTurno.detalleCita.trim()) {
      newErrors.detalleCita = "El detalle de la cita es obligatorio.";
    } else if (nuevoTurno.detalleCita.length > 500) {
      newErrors.detalleCita = "El detalle no puede superar los 500 caracteres.";
    }

    if (!nuevoTurno.veterinario) {
      newErrors.veterinario = "Seleccione un veterinario.";
    }

    if (!nuevoTurno.fecha) {
      newErrors.fecha = "Seleccione una fecha.";
    } else {
      const selectedDate = new Date(nuevoTurno.fecha);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
newErrors.fecha = "La fecha no puede ser anterior a hoy.";
      } else if (!isWorkingDay(nuevoTurno.fecha)) {
        newErrors.fecha = "Solo se permiten fechas de lunes a viernes.";
      }
    }

    if (!nuevoTurno.hora) {
      newErrors.hora = "Seleccione una hora.";
    }

    if (!nuevoTurno.mascota.nombre.trim()) {
      newErrors.mascotaNombre = "El nombre de la mascota es obligatorio.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoTurno.mascota.nombre)) {
      newErrors.mascotaNombre =
        "El nombre solo puede contener letras y espacios.";
    }

    const conflict = turnos.some(
      (t, idx) =>
        t.fecha === nuevoTurno.fecha &&
        t.hora === nuevoTurno.hora &&
        t.veterinario?.id === nuevoTurno.veterinario?.id &&
        (editIndex === null || idx !== editIndex)
    );
    if (conflict) {
      newErrors.general =
        "Ya existe un turno para ese veterinario en la misma fecha y hora.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (editIndex !== null) {
        const actualizados = [...turnos];
        actualizados[editIndex] = nuevoTurno;
        setTurnos(actualizados);
        Swal.fire({
          icon: "success",
          title: "Turno actualizado correctamente",
          confirmButtonColor: "#6c9a72",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setTurnos([...turnos, { ...nuevoTurno, id: Date.now() }]);
        Swal.fire({
          icon: "success",
          title: "Turno creado correctamente",
          confirmButtonColor: "#6c9a72",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      cerrarModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("mascota.")) {
      const field = name.split(".")[1];
      setNuevoTurno((prev) => ({
        ...prev,
        mascota: { ...prev.mascota, [field]: value },
      }));
    } else if (name === "veterinario") {
      setNuevoTurno((prev) => ({
        ...prev,
        veterinario: veterinarios.find((v) => v.id === value) || null,
      }));
    } else {
      setNuevoTurno((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatFecha = (fecha) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(fecha).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="crud-turnos">
      <div
        style={{ 
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <Button variant="primary" onClick={abrirModal}>Agregar Turno</Button>
      </div>
      <div className="contenedor-tabla verde-redondeado">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center">Veterinario</th>
              <th className="text-center">Mascota</th>
              <th className="text-center">Fecha</th>
              <th className="text-center">Hora</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>{turnos.length > 0 ? turnos.map((item, index) => <tr key={item.id || index}><td className="text-center">{item.veterinario.nombre}</td><td className="text-center"><strong>{item.mascota.nombre}</strong></td><td className="text-center">{formatFecha(item.fecha)}</td><td className="text-center">{item.hora}</td><td><div className="contenedor-iconos-accion"><button className="btn-icono-accion ver" title="Ver" onClick={() => handleVer(index)}><Eye size={18} /></button><button className="btn-icono-accion editar" title="Editar" onClick={() => handleEditar(index)}><PencilSquare size={18} /></button><button className="btn-icono-accion eliminar" title="Eliminar" onClick={() => handleEliminar(index)}><Trash size={18} /></button></div></td></tr>) : <tr><td colSpan={5} className="text-center">No hay turnos en la lista.</td></tr>}</tbody>
        </Table>
      </div>
      <Modal show={showModal} onHide={cerrarModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title text-center w-100 ms-4">
            {isReadOnly
              ? "Detalles del Turno"
              : editIndex !== null
              ? "Editar Turno"
              : "Agregar Nuevo Turno"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}
          <div className="form-section">
            <h5>Detalles del Turno</h5>
            <Row>
              <Col md={6}><Form.Group className="mb-3"><Form.Label>Nombre de la Mascota</Form.Label><Form.Control isInvalid={!!errors.mascotaNombre} name="mascota.nombre" value={nuevoTurno.mascota.nombre} onChange={handleChange} placeholder="Ej: Max" disabled={isReadOnly} /><Form.Control.Feedback type="invalid">{errors.mascotaNombre}</Form.Control.Feedback></Form.Group><Form.Group className="mb-3"><Form.Label>Fecha</Form.Label><Form.Control isInvalid={!!errors.fecha} name="fecha" type="date" value={nuevoTurno.fecha} onChange={handleChange} disabled={isReadOnly} /><Form.Control.Feedback type="invalid">{errors.fecha}</Form.Control.Feedback></Form.Group><Form.Group className="mb-3"><Form.Label>Hora</Form.Label><Form.Select isInvalid={!!errors.hora} name="hora" value={nuevoTurno.hora} onChange={handleChange} disabled={isReadOnly}><option value="">Seleccione una hora</option>{timeSlots().map((slot) => <option key={slot} value={slot}>{slot}</option>)}</Form.Select><Form.Control.Feedback type="invalid">{errors.hora}</Form.Control.Feedback></Form.Group></Col><Col md={6}><Form.Group className="mb-3"><Form.Label>Veterinario</Form.Label><Form.Select isInvalid={!!errors.veterinario} name="veterinario" value={nuevoTurno.veterinario?.id || ""} onChange={handleChange} disabled={isReadOnly}><option value="">Seleccione un veterinario</option>{veterinarios.map((vet) => <option key={vet.id} value={vet.id}>{vet.nombre}</option>)}</Form.Select><Form.Control.Feedback type="invalid">{errors.veterinario}</Form.Control.Feedback></Form.Group><Form.Group className="mb-3"><Form.Label>Detalle de Cita</Form.Label><Form.Control isInvalid={!!errors.detalleCita} name="detalleCita" value={nuevoTurno.detalleCita} onChange={handleChange} as="textarea" rows={5} placeholder="Describa la consulta o motivo del turno" disabled={isReadOnly} /><Form.Control.Feedback type="invalid">{errors.detalleCita}</Form.Control.Feedback></Form.Group></Col>
            </Row>
          </div>
        </Modal.Body>

        <Modal.Footer>
          {isReadOnly ? (
            <Button variant="secondary" onClick={cerrarModal}>
              Cerrar
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={cerrarModal}>Cancelar</Button>
              <Button variant="primary" onClick={handleAgregar}>Guardar</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CRUDTurnos;
