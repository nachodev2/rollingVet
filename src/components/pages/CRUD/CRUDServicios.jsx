import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const ServiciosCRUD = () => {
  const [servicios, setServicios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: "", descripcion: "", costo: "" });
  const [editando, setEditando] = useState(null);

 
  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("servicios")) || [];
    setServicios(guardados);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("servicios", JSON.stringify(servicios));
  }, [servicios]);

 
  const handleGuardar = () => {
    if (editando !== null) {
      const actualizados = servicios.map((s, i) =>
        i === editando ? nuevoServicio : s
      );
      setServicios(actualizados);
      setEditando(null);
    } else {
      setServicios([...servicios, nuevoServicio]);
    }
    setShowModal(false);
    setNuevoServicio({ nombre: "", descripcion: "", costo: "" });
  };


  const handleEliminar = (index) => {
    const filtrados = servicios.filter((_, i) => i !== index);
    setServicios(filtrados);
  };

  
  const handleEditar = (index) => {
    setEditando(index);
    setNuevoServicio(servicios[index]);
    setShowModal(true);
  };

  return (
    <div>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Agregar Servicio
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Costo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.length > 0 ? (
            servicios.map((serv, index) => (
              <tr key={index}>
                <td>{serv.nombre}</td>
                <td>{serv.descripcion}</td>
                <td>{serv.costo}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEditar(index)}
                    className="me-2"
                  >
                    <PencilSquare />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleEliminar(index)}
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No hay servicios cargados.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editando !== null ? "Editar Servicio" : "Agregar Servicio"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={nuevoServicio.nombre}
                onChange={(e) =>
                  setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                value={nuevoServicio.descripcion}
                onChange={(e) =>
                  setNuevoServicio({
                    ...nuevoServicio,
                    descripcion: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Costo</Form.Label>
              <Form.Control
                type="number"
                value={nuevoServicio.costo}
                onChange={(e) =>
                  setNuevoServicio({ ...nuevoServicio, costo: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleGuardar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiciosCRUD;