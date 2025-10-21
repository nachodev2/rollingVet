import { useState, useEffect } from "react";
import { Modal, Button, Table, Form, Row, Col } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import './ModalPacientes.css';

const CRUDPacientes = () => {
  const [showModal, setShowModal] = useState(false);
  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => {
    setShowModal(false);
    setEditIndex(null);
    setNuevoPaciente(pacienteInicial);
  };

  const pacienteInicial = {
    petNombre: "",
    petSexo: "",
    petEdad: "",
    petPeso: "",
    petEspecie: "",
    petRaza: "",
    ownerNombre: "",
    ownerApellido: "",
    ownerEmail: "",
    ownerTelefono: "",
    ownerDireccion: "",
  };

  const [pacientes, setPacientes] = useState(() => {
    const saved = localStorage.getItem("pacientes");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [nuevoPaciente, setNuevoPaciente] = useState(pacienteInicial);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  const handleAgregar = () => {
    const camposObligatorios = ["ownerNombre", "petNombre"];
    const faltantes = camposObligatorios.filter(
      (campo) => !nuevoPaciente[campo]
    );

    if (faltantes.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Campos obligatorios",
        text: "El nombre del dueño y el nombre de la mascota son requeridos.",
      });
      return;
    }

    if (editIndex !== null) {
      const actualizados = [...pacientes];
      actualizados[editIndex] = nuevoPaciente;
      setPacientes(actualizados);
      Swal.fire({
        icon: "success",
        title: "Paciente actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setPacientes([...pacientes, { ...nuevoPaciente, id: Date.now() }]);
      Swal.fire({
        icon: "success",
        title: "Paciente agregado",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    cerrarModal();
  };

  const handleEditar = (index) => {
    setNuevoPaciente(pacientes[index]);
    setEditIndex(index);
    abrirModal();
  };

  const handleEliminar = (index) => {
    const paciente = pacientes[index];
    Swal.fire({
      title: "¿Eliminar paciente?",
      text: `Se eliminará "${paciente.petNombre}" de la lista.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizados = pacientes.filter((_, i) => i !== index);
        setPacientes(actualizados);
        Swal.fire({
          icon: "success",
          title: "Paciente eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoPaciente((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="crud-pacientes p-4">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <Button variant="primary" onClick={abrirModal}>
          Agregar Paciente
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Dueño</th>
            <th>Mascota</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length > 0 ? (
            pacientes.map((item, index) => (
              <tr key={item.id || index}>
                <td>{item.ownerNombre}</td>
                <td>{item.petNombre}</td>
                <td>{item.petEspecie}</td>
                <td>{item.petRaza}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEditar(index)}
                    style={{ marginRight: "0.3rem" }}
                  >
                    <PencilSquare />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleEliminar(index)}
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No hay pacientes.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={cerrarModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            {editIndex !== null ? "Editar Paciente" : "Dar de Alta Paciente"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-section">
            <h5>Datos del Paciente</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    name="petNombre"
                    value={nuevoPaciente.petNombre}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Peso</Form.Label>
                  <Form.Control
                    name="petPeso"
                    value={nuevoPaciente.petPeso}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Control
                    name="petSexo"
                    value={nuevoPaciente.petSexo}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Especie</Form.Label>
                  <Form.Control
                    name="petEspecie"
                    value={nuevoPaciente.petEspecie}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    name="petEdad"
                    value={nuevoPaciente.petEdad}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Raza</Form.Label>
                  <Form.Control
                    name="petRaza"
                    value={nuevoPaciente.petRaza}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="form-section">
            <h5>Datos del Dueño</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    name="ownerNombre"
                    value={nuevoPaciente.ownerNombre}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    name="ownerTelefono"
                    value={nuevoPaciente.ownerTelefono}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    name="ownerApellido"
                    value={nuevoPaciente.ownerApellido}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="ownerDireccion"
                    value={nuevoPaciente.ownerDireccion}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="ownerEmail"
                    value={nuevoPaciente.ownerEmail}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAgregar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CRUDPacientes;
