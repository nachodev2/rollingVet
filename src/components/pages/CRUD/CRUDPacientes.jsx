import  { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Swal from "sweetalert2";

const CRUDPacientes = () => {
  const [showModal, setShowModal] = useState(false);
  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => setShowModal(false);

  const [pacientes, setPacientes] = useState(() => {
    const saved = localStorage.getItem("pacientes");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [nuevoPaciente, setNuevoPaciente] = useState({
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
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  const handleAgregar = () => {
    if (!nuevoPaciente.ownerNombre || !nuevoPaciente.petNombre) return alert("El nombre del dueño y el nombre de la mascota son obligatorios");
    if (editIndex !== null) {
      const updated = [...pacientes];
      updated[editIndex] = nuevoPaciente;
      setPacientes(updated);
      setEditIndex(null);

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
    setNuevoPaciente({
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
    });
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
      title: "¿Estás seguro?",
      text: `Se eliminará el paciente "${paciente.petNombre || paciente.mascota}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = pacientes.filter((_, i) => i !== index);
        setPacientes(updated);

        Swal.fire({
          icon: "success",
          title: "Eliminado",
          text: "El paciente ha sido eliminado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="crud-pacientes">
      <style>
        {`
          /* Fondo blanco incluso con autocompletado */
          input:-webkit-autofill,
          input:-webkit-autofill:focus,
          textarea:-webkit-autofill {
            box-shadow: 0 0 0px 1000px white inset !important;
            -webkit-text-fill-color: #000 !important;
            transition: background-color 5000s ease-in-out 0s;
          }

          /* Estilo general del modal */
          .modal-content {
            border-radius: 8px;
            padding: 1rem;
          }

          /* Título centrado y con tamaño */
          .modal-title {
            text-align: center;
            font-size: 1.75rem;
            font-weight: 600;
          }

          /* Espaciado entre campos */
          .form-group {
            margin-bottom: 1.25rem;
          }

          /* Inputs y textarea */
          .form-control {
            background-color: white !important;
            border: 1px solid #ced4da;
            border-radius: 4px;
            font-size: 1rem;
          }

          /* Botones del modal */
          .modal-footer .btn {
            min-width: 120px;
            font-weight: 500;
          }
        `}
      </style>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
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
                  <Button size="sm" variant="danger" onClick={() => handleEliminar(index)}>
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


      <Modal show={showModal} onHide={cerrarModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center fs-3">
            {editIndex !== null ? "Editar Paciente" : "Dar de Alta Paciente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h4 className="text-center my-3">Datos del Paciente</h4>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="petNombre"
                value={nuevoPaciente.petNombre}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, petNombre: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sexo</Form.Label>
              <Form.Control
                type="text"
                name="petSexo"
                value={nuevoPaciente.petSexo}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, petSexo: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                name="petEdad"
                value={nuevoPaciente.petEdad}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, petEdad: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Peso</Form.Label>
              <Form.Control
                type="text"
                name="petPeso"
                value={nuevoPaciente.petPeso}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, petPeso: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Especie</Form.Label>
              <Form.Control
                type="text"
                name="petEspecie"
                value={nuevoPaciente.petEspecie}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, petEspecie: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Raza</Form.Label>
              <Form.Control
                type="text"
                name="petRaza"
                value={nuevoPaciente.petRaza}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, petRaza: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>

            <h4 className="text-center my-3">Datos del Dueño</h4>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="ownerNombre"
                value={nuevoPaciente.ownerNombre}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, ownerNombre: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="ownerApellido"
                value={nuevoPaciente.ownerApellido}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, ownerApellido: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="ownerEmail"
                value={nuevoPaciente.ownerEmail}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, ownerEmail: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="ownerTelefono"
                value={nuevoPaciente.ownerTelefono}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, ownerTelefono: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="ownerDireccion"
                value={nuevoPaciente.ownerDireccion}
                onChange={(e) => setNuevoPaciente({ ...nuevoPaciente, ownerDireccion: e.target.value })}
                autoComplete="off"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
          {(editIndex !== null || true) && (
            <Button variant="primary" onClick={handleAgregar}>
              Guardar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CRUDPacientes;
