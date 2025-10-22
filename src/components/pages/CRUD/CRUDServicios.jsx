import { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Swal from "sweetalert2";

const CRUDServicios = () => {
  const [showModal, setShowModal] = useState(false);
  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => setShowModal(false);

  const [servicios, setServicios] = useState(() => {
    const saved = localStorage.getItem("servicios");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    descripcion: "",
    costo: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("servicios", JSON.stringify(servicios));
  }, [servicios]);

  const handleAgregar = () => {
    const newErrors = {};

    // Validaciones para nombre
    if (!nuevoServicio.nombre.trim()) {
      newErrors.nombre = "El nombre del servicio es obligatorio.";
    } else if (
      nuevoServicio.nombre.length < 2 ||
      nuevoServicio.nombre.length > 50
    ) {
      newErrors.nombre = "El nombre debe tener entre 2 y 50 caracteres.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoServicio.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras y espacios.";
    }

    // Validaciones para descripcion
    if (!nuevoServicio.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria.";
    } else if (
      nuevoServicio.descripcion.length < 10 ||
      nuevoServicio.descripcion.length > 200
    ) {
      newErrors.descripcion = "La descripción debe tener entre 10 y 200 caracteres.";
    }

    // Validaciones para costo
    if (!nuevoServicio.costo) {
      newErrors.costo = "El costo es obligatorio.";
    } else if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(nuevoServicio.costo)) {
      newErrors.costo = "El costo debe ser un número válido (ej: 1500 o 1500.50).";
    } else {
      const costo = parseFloat(nuevoServicio.costo);
      if (costo <= 0) {
        newErrors.costo = "El costo debe ser mayor a 0.";
      } else if (costo > 100000) {
        newErrors.costo = "El costo no puede superar los $100,000.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (editIndex !== null) {
        const updated = [...servicios];
        updated[editIndex] = nuevoServicio;
        setServicios(updated);
        setEditIndex(null);
        Swal.fire({
          icon: "success",
          title: `Servicio "${nuevoServicio.nombre}" actualizado correctamente`,
          confirmButtonColor: "#6c9a72",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setServicios([...servicios, { ...nuevoServicio, id: Date.now() }]);
        Swal.fire({
          icon: "success",
          title: `Servicio "${nuevoServicio.nombre}" creado correctamente`,
          confirmButtonColor: "#6c9a72",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      cerrarModal();
    }
  };

  const handleEditar = (index) => {
    setNuevoServicio(servicios[index]);
    setEditIndex(index);
    abrirModal();
  };

  const handleEliminar = (index) => {
    const servicio = servicios[index];

    Swal.fire({
      title: "¿Eliminar servicio?",
      text: `Se eliminará "${servicio.nombre}" de la lista.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#6c9a72",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = servicios.filter((_, i) => i !== index);
        setServicios(updated);

        Swal.fire({
          icon: "success",
          title: `Servicio "${servicio.nombre}" eliminado correctamente`,
          confirmButtonColor: "#6c9a72",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="crud-servicios">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <Button variant="primary" onClick={abrirModal}>
          Agregar Servicio
        </Button>
      </div>
      <div className="contenedor-tabla verde-redondeado">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center">Nombre</th>
              <th className="text-center">Descripción</th>
              <th className="text-center">Costo</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.length > 0 ? (
              servicios.map((item, index) => (
                <tr key={item.id || index}>
                  <td className="text-center">{item.nombre}</td>
                  <td className="text-center">{item.descripcion}</td>
                  <td className="text-center">${item.costo}</td>
                  <td>
                    <div className="contenedor-iconos-accion">
                      <button
                        className="btn-icono-accion editar"
                        title="Editar"
                        onClick={() => handleEditar(index)}
                      >
                        <PencilSquare size={18} />
                      </button>
                      <button
                        className="btn-icono-accion eliminar"
                        title="Eliminar"
                        onClick={() => handleEliminar(index)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No hay servicios.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={cerrarModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title text-center w-100 ms-4">
            {editIndex !== null ? "Editar Servicio" : "Agregar Servicio"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-section">
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Servicio</Form.Label>
              <Form.Control
                isInvalid={!!errors.nombre}
                type="text"
                placeholder="Ej: Vacunación anual"
                value={nuevoServicio.nombre}
                onChange={(e) =>
                  setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                isInvalid={!!errors.descripcion}
                as="textarea"
                rows={3}
                placeholder="Ej: Servicio completo de salud y bienestar"
                value={nuevoServicio.descripcion}
                onChange={(e) =>
                  setNuevoServicio({
                    ...nuevoServicio,
                    descripcion: e.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.descripcion}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Costo</Form.Label>
              <Form.Control
                isInvalid={!!errors.costo}
                type="number"
                placeholder="Ej: 1500"
                value={nuevoServicio.costo}
                onChange={(e) =>
                  setNuevoServicio({ ...nuevoServicio, costo: e.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.costo}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAgregar}>
            {editIndex !== null ? "Guardar" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CRUDServicios;
