import  { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
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

  useEffect(() => {
    localStorage.setItem("servicios", JSON.stringify(servicios));
  }, [servicios]);

  const handleAgregar = () => {
    if (!nuevoServicio.nombre) return alert("El nombre es obligatorio");
    if (editIndex !== null) {
      const updated = [...servicios];
      updated[editIndex] = nuevoServicio;
      setServicios(updated);
      setEditIndex(null);

      Swal.fire({
        icon: "success",
        title: "Servicio actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setServicios([...servicios, { ...nuevoServicio, id: Date.now() }]);

        Swal.fire({
        icon: "success",
        title: "Servicio agregado",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setNuevoServicio({ nombre: "", descripcion: "", costo: "" });
    cerrarModal();
  };

  const handleEditar = (index) => {
    setNuevoServicio(servicios[index]);
    setEditIndex(index);
    abrirModal();
  };

  const handleEliminar = (index) => {
     const servicio = servicios[index];

    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el servicio "${servicio.nombre}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = servicios.filter((_, i) => i !== index);
        setServicios(updated);

        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El servicio ha sido eliminado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="crud-servicios">
      
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <Button variant="primary" onClick={abrirModal}>
          Agregar Servicio
        </Button>
      </div>

      
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
          {servicios.length > 0 ? (
            servicios.map((item, index) => (
              <tr key={item.id || index}>
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
                  <Button size="sm" variant="danger" onClick={() => handleEliminar(index)}>
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

      
      <Modal show={showModal} onHide={cerrarModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Editar Servicio" : "Agregar Servicio"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              placeholder="Ej: Vacunación anual"
              value={nuevoServicio.nombre}
              onChange={(e) => setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Ej: Servicio completo de salud y bienestar"
              value={nuevoServicio.descripcion}
              onChange={(e) =>
                setNuevoServicio({ ...nuevoServicio, descripcion: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Ej: 1500"
              value={nuevoServicio.costo}
              onChange={(e) => setNuevoServicio({ ...nuevoServicio, costo: e.target.value })}
            />
            <Button variant="success" onClick={handleAgregar}>
              {editIndex !== null ? "Guardar" : "Agregar"}
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CRUDServicios;
