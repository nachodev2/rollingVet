import { useState, useEffect } from "react";
import { Modal, Button, Table, Form, Row, Col } from "react-bootstrap";
import { PencilSquare, Trash, Eye } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import "./ModalPacientes.css";
import "../administrador/Administrador.css";

const CRUDPacientes = () => {
  const [showModal, setShowModal] = useState(false);
  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => {
    setShowModal(false);
    setEditIndex(null);
    setIsReadOnly(false);
    setNuevoPaciente(pacienteInicial);
    setErrors({});
  };

  const especies = ["Perro", "Gato", "Otro"];
  const sexos = ["Macho", "Hembra"];

  const razasPorEspecie = {
    Perro: [
      "Golden Retriever",
      "Labrador Retriever",
      "Poodle",
      "Bulldog Francés",
      "Chihuahua",
      "Otro",
    ],
    Gato: [
      "Persa",
      "Siamés",
      "Maine Coon",
      "British Shorthair",
      "Bengalí",
      "Otro",
    ],
    Otro: ["Otro"],
  };

  const [razasDisponibles, setRazasDisponibles] = useState([]);

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
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
  }, [pacientes]);

  useEffect(() => {
    setRazasDisponibles(razasPorEspecie[nuevoPaciente.petEspecie] || []);
  }, [nuevoPaciente.petEspecie]);

  const handleAgregar = () => {
    const newErrors = {};

    // Validaciones para petNombre
    if (!nuevoPaciente.petNombre) {
      newErrors.petNombre = "El nombre de la mascota es obligatorio.";
    } else if (
      nuevoPaciente.petNombre.length < 2 ||
      nuevoPaciente.petNombre.length > 50
    ) {
      newErrors.petNombre = "El nombre debe tener entre 2 y 50 caracteres.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoPaciente.petNombre)) {
      newErrors.petNombre = "El nombre solo puede contener letras y espacios.";
    }

    if (!nuevoPaciente.petSexo)
      newErrors.petSexo = "Seleccione el sexo de la mascota.";

    if (!nuevoPaciente.petEspecie)
      newErrors.petEspecie = "Seleccione la especie de la mascota.";

    if (!nuevoPaciente.petRaza)
      newErrors.petRaza = "Seleccione la raza de la mascota.";

    // Validaciones para petEdad
    if (!nuevoPaciente.petEdad) {
      newErrors.petEdad = "La edad de la mascota es obligatoria.";
    } else if (!/^\d+$/.test(nuevoPaciente.petEdad)) {
      newErrors.petEdad = "La edad debe ser un número entero.";
    } else {
      const edad = parseInt(nuevoPaciente.petEdad);
      if (edad < 0 || edad > 30) {
        newErrors.petEdad = "La edad debe estar entre 0 y 30 años.";
      }
    }

    // Validaciones para petPeso
    if (!nuevoPaciente.petPeso) {
      newErrors.petPeso = "El peso de la mascota es obligatorio.";
    } else if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(nuevoPaciente.petPeso)) {
      newErrors.petPeso =
        "El peso debe tener formato numérico válido (ej: 5.5).";
    } else {
      const peso = parseFloat(nuevoPaciente.petPeso);
      if (peso < 0.1 || peso > 100) {
        newErrors.petPeso = "El peso debe estar entre 0.1 y 100 kg.";
      }
    }

    // Validaciones para ownerNombre
    if (!nuevoPaciente.ownerNombre) {
      newErrors.ownerNombre = "El nombre del dueño es obligatorio.";
    } else if (
      nuevoPaciente.ownerNombre.length < 2 ||
      nuevoPaciente.ownerNombre.length > 50
    ) {
      newErrors.ownerNombre = "El nombre debe tener entre 2 y 50 caracteres.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoPaciente.ownerNombre)) {
      newErrors.ownerNombre =
        "El nombre solo puede contener letras y espacios.";
    }

    // Validaciones para ownerApellido
    if (!nuevoPaciente.ownerApellido) {
      newErrors.ownerApellido = "El apellido del dueño es obligatorio.";
    } else if (
      nuevoPaciente.ownerApellido.length < 2 ||
      nuevoPaciente.ownerApellido.length > 50
    ) {
      newErrors.ownerApellido =
        "El apellido debe tener entre 2 y 50 caracteres.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nuevoPaciente.ownerApellido)) {
      newErrors.ownerApellido =
        "El apellido solo puede contener letras y espacios.";
    }

    // Validaciones para ownerTelefono
    if (!nuevoPaciente.ownerTelefono) {
      newErrors.ownerTelefono = "El teléfono del dueño es obligatorio.";
    } else if (!/^[\d\s\-\+]+$/.test(nuevoPaciente.ownerTelefono)) {
      newErrors.ownerTelefono =
        "El teléfono solo puede contener números, espacios, - y +.";
    } else if (
      nuevoPaciente.ownerTelefono.replace(/[\s\-\+]/g, "").length < 7 ||
      nuevoPaciente.ownerTelefono.length > 15
    ) {
      newErrors.ownerTelefono =
        "El teléfono debe tener entre 7 y 15 caracteres (con símbolos).";
    }

    // Validaciones para ownerDireccion
    if (!nuevoPaciente.ownerDireccion) {
      newErrors.ownerDireccion = "La dirección del dueño es obligatoria.";
    } else if (
      nuevoPaciente.ownerDireccion.length < 10 ||
      nuevoPaciente.ownerDireccion.length > 200
    ) {
      newErrors.ownerDireccion =
        "La dirección debe tener entre 10 y 200 caracteres.";
    }

    // Validaciones para ownerEmail
    if (!nuevoPaciente.ownerEmail) {
      newErrors.ownerEmail = "El email del dueño es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoPaciente.ownerEmail)) {
      newErrors.ownerEmail = "Ingrese un formato de email válido.";
    } else if (nuevoPaciente.ownerEmail.length > 100) {
      newErrors.ownerEmail = "El email no puede superar los 100 caracteres.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
    }
  };

  const handleEditar = (index) => {
    setNuevoPaciente(pacientes[index]);
    setEditIndex(index);
    setIsReadOnly(false);
    abrirModal();
  };

  const handleVer = (index) => {
    setNuevoPaciente(pacientes[index]);
    setEditIndex(null);
    setIsReadOnly(true);
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
      <div className="contenedor-tabla verde-redondeado">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center">Dueño</th>
              <th className="text-center">Mascota</th>
              <th className="text-center">Especie</th>
              <th className="text-center">Raza</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.length > 0 ? (
              pacientes.map((item, index) => (
                <tr key={item.id || index}>
                  <td className="text-center">{item.ownerNombre}</td>
                  <td className="text-center">{item.petNombre}</td>
                  <td className="text-center">{item.petEspecie}</td>
                  <td className="text-center">{item.petRaza}</td>
                  <td>
                    <div className="contenedor-iconos-accion">
                      <button
                        className="btn-icono-accion ver"
                        title="Ver"
                        onClick={() => handleVer(index)}
                      >
                        <Eye size={18} />
                      </button>
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
                <td colSpan={5} className="text-center">
                  No hay pacientes en la lista.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Modal show={showModal} onHide={cerrarModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title text-center w-100 ms-4">
            {isReadOnly ? "Ver Paciente" : editIndex !== null ? "Editar Paciente" : "Dar de Alta Paciente"}
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
                    isInvalid={!!errors.petNombre}
                    name="petNombre"
                    value={nuevoPaciente.petNombre}
                    onChange={handleChange}
                    placeholder="Ej: Max"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.petNombre}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Peso</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.petPeso}
                    name="petPeso"
                    value={nuevoPaciente.petPeso}
                    onChange={handleChange}
                    placeholder="Ej: 5.5 kg"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.petPeso}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.petEdad}
                    name="petEdad"
                    value={nuevoPaciente.petEdad}
                    onChange={handleChange}
                    placeholder="Ej: 3 años"
                    type="number"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.petEdad}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.petSexo}
                    name="petSexo"
                    value={nuevoPaciente.petSexo}
                    onChange={handleChange}
                    disabled={isReadOnly}
                  >
                    <option value="">Seleccione un sexo</option>
                    {sexos.map((sexo) => (
                      <option key={sexo} value={sexo}>
                        {sexo}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.petSexo}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Especie</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.petEspecie}
                    name="petEspecie"
                    value={nuevoPaciente.petEspecie}
                    onChange={handleChange}
                    disabled={isReadOnly}
                  >
                    <option value="">Seleccione una especie</option>
                    {especies.map((especie) => (
                      <option key={especie} value={especie}>
                        {especie}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.petEspecie}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Raza</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.petRaza}
                    name="petRaza"
                    value={nuevoPaciente.petRaza}
                    onChange={handleChange}
                    disabled={isReadOnly}
                  >
                    <option value="">Seleccione una raza</option>
                    {razasDisponibles.map((raza) => (
                      <option key={raza} value={raza}>
                        {raza}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.petRaza}
                  </Form.Control.Feedback>
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
                    isInvalid={!!errors.ownerNombre}
                    name="ownerNombre"
                    value={nuevoPaciente.ownerNombre}
                    onChange={handleChange}
                    placeholder="Ej: Juan"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ownerNombre}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.ownerTelefono}
                    name="ownerTelefono"
                    value={nuevoPaciente.ownerTelefono}
                    onChange={handleChange}
                    placeholder="Ej: 351-1234567"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ownerTelefono}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.ownerApellido}
                    name="ownerApellido"
                    value={nuevoPaciente.ownerApellido}
                    onChange={handleChange}
                    placeholder="Ej: Pérez"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ownerApellido}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.ownerDireccion}
                    name="ownerDireccion"
                    value={nuevoPaciente.ownerDireccion}
                    onChange={handleChange}
                    placeholder="Ej: Av. Siempre Viva 742"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ownerDireccion}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.ownerEmail}
                    type="email"
                    name="ownerEmail"
                    value={nuevoPaciente.ownerEmail}
                    onChange={handleChange}
                    placeholder="Ej: juan@example.com"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ownerEmail}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            {isReadOnly ? "Cerrar" : "Cancelar"}
          </Button>
          {!isReadOnly && (
            <Button variant="primary" onClick={handleAgregar}>
              Guardar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <Button variant="primary" onClick={abrirModal} className="mt-3">
          Agregar Paciente
        </Button>
      </div>
    </div>
  );
};

export default CRUDPacientes;
