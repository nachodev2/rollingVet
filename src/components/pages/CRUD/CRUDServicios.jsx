import { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import "./CRUDTurnos.css";

const CRUDServicios = () => {
  const [showModal, setShowModal] = useState(false);
  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => setShowModal(false);

  const [servicios, setServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    descripcion: "",
    costo: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const fetchServicios = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch('http://localhost:5000/api/v1/servicios', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        try {
          const data = await response.json();
          setServicios(data.data || []);
        } catch (jsonError) {
          console.error('Error parsing JSON servicios:', jsonError);
          setServicios([]);
        }
      } else {
        console.error('Error fetching servicios:', response.status);
        setServicios([]);
      }
    } catch (error) {
      console.error('Error fetching servicios:', error);
      setServicios([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleAgregar = async () => {
    if (!nuevoServicio.nombre) return alert("El nombre es obligatorio");

    const token = localStorage.getItem("token");
    const isEdit = editId !== null;
    const url = isEdit
      ? `http://localhost:5000/api/v1/servicios/${editId}`
      : 'http://localhost:5000/api/v1/servicios';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoServicio),
      });

      if (response.ok) {
        fetchServicios(); // Reload list
        cerrarModal();
        Swal.fire({
          icon: "success",
          title: isEdit ? "Servicio actualizado" : "Servicio agregado",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const error = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'No se pudo guardar el servicio',
          confirmButtonColor: '#6c9a72',
        });
      }
    } catch (error) {
      console.error('Error guardando servicio:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo guardar el servicio',
        confirmButtonColor: '#6c9a72',
      });
    }
    setNuevoServicio({ nombre: "", descripcion: "", costo: "" });
    cerrarModal();
  };

  const handleEditar = (index) => {
    setNuevoServicio(servicios[index]);
    setEditId(servicios[index]._id);
    abrirModal();
  };

  const handleEliminar = async (servicio) => {
    Swal.fire({
      title: "¿Eliminar servicio?",
      text: `Se eliminará "${servicio.nombre}" de la lista.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#6c9a72",
      cancelButtonColor: "#6c757d",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");

        try {
          const response = await fetch(`http://localhost:5000/api/v1/servicios/${servicio._id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            fetchServicios(); // Reload list
            Swal.fire({
              icon: "success",
              title: "Eliminado",
              text: "El servicio ha sido eliminado correctamente.",
              timer: 1500,
              showConfirmButton: false,
            });
          } else {
            const error = await response.json();
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error || 'No se pudo eliminar el servicio',
              confirmButtonColor: '#6c9a72',
            });
          }
        } catch (error) {
          console.error('Error eliminando servicio:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo eliminar el servicio',
            confirmButtonColor: '#6c9a72',
          });
        }
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
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center">
                  Cargando servicios...
                </td>
              </tr>
            ) : servicios.length > 0 ? (
              servicios.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.costo}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => handleEditar(index)}
                      style={{ marginRight: "0.3rem" }}
                    >
                      <PencilSquare />
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleEliminar(item)}>
                      <Trash />
                    </Button>
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
          <Modal.Title>{editId !== null ? "Editar Servicio" : "Agregar Servicio"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-section">
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Servicio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Vacunación anual"
                value={nuevoServicio.nombre}
                onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ej: Servicio completo de salud y bienestar"
                value={nuevoServicio.descripcion}
                onChange={(e) => setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Costo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 1500"
                value={nuevoServicio.costo}
                onChange={(e) => setNuevoServicio({ ...nuevoServicio, costo: e.target.value })}
              />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAgregar}>
            {editId !== null ? "Guardar" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CRUDServicios;
