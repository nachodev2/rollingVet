import { useState, useEffect } from "react";
import { Modal, Button, Table, Form, Row, Col } from "react-bootstrap";
import { PencilSquare, Trash, Eye } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import "./ModalPacientes.css";
import "../administrador/Administrador.css";

const pacienteInicial = {
  nombreMascota: "",
  especie: "",
  raza: "",
  sexo: "",
  edad: "",
  peso: "",
  nombreDueno: "",
  emailDueno: "",
  telefonoDueno: "",
};

const CRUDPacientes = () => {
  const [showModal, setShowModal] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nuevoPaciente, setNuevoPaciente] = useState(pacienteInicial);
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [errors, setErrors] = useState({});
  const [razasDisponibles, setRazasDisponibles] = useState([]);

  const abrirModal = () => setShowModal(true);
  const cerrarModal = () => {
    setShowModal(false);
    setEditIndex(null);
    setEditId(null);
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

  // Fetch pacientes desde la API
  const fetchPacientes = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    
    try {
      const response = await fetch('http://localhost:5000/api/v1/pacientes', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setPacientes(data.data || []);
      } else {
        console.error('Error fetching pacientes:', response.status);
        setPacientes([]);
      }
    } catch (error) {
      console.error('Error fetching pacientes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo cargar la lista de pacientes',
        confirmButtonColor: '#6c9a72',
      });
      setPacientes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  useEffect(() => {
    setRazasDisponibles(razasPorEspecie[nuevoPaciente.especie] || []);
  }, [nuevoPaciente.especie]);

  // Validaciones
  const validarPaciente = () => {
    const newErrors = {};

    if (!nuevoPaciente.nombreMascota) {
      newErrors.nombreMascota = "El nombre de la mascota es obligatorio.";
    } else if (
      nuevoPaciente.nombreMascota.length < 2 ||
      nuevoPaciente.nombreMascota.length > 50
    ) {
      newErrors.nombreMascota = "El nombre debe tener entre 2 y 50 caracteres.";
    }

    if (!nuevoPaciente.sexo)
      newErrors.sexo = "Seleccione el sexo de la mascota.";

    if (!nuevoPaciente.especie)
      newErrors.especie = "Seleccione la especie de la mascota.";

    if (!nuevoPaciente.raza)
      newErrors.raza = "Seleccione la raza de la mascota.";

    if (!nuevoPaciente.edad) {
      newErrors.edad = "La edad de la mascota es obligatoria.";
    } else if (!/^\d+$/.test(nuevoPaciente.edad)) {
      newErrors.edad = "La edad debe ser un número entero.";
    }

    if (!nuevoPaciente.peso) {
      newErrors.peso = "El peso de la mascota es obligatorio.";
    } else if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(nuevoPaciente.peso)) {
      newErrors.peso = "El peso debe tener formato numérico válido (ej: 5.5).";
    }

    if (!nuevoPaciente.nombreDueno) {
      newErrors.nombreDueno = "El nombre del dueño es obligatorio.";
    } else if (
      nuevoPaciente.nombreDueno.length < 2 ||
      nuevoPaciente.nombreDueno.length > 50
    ) {
      newErrors.nombreDueno = "El nombre debe tener entre 2 y 50 caracteres.";
    }

    if (!nuevoPaciente.telefonoDueno) {
      newErrors.telefonoDueno = "El teléfono del dueño es obligatorio.";
    } else if (!/^[\d\s\-\+]+$/.test(nuevoPaciente.telefonoDueno)) {
      newErrors.telefonoDueno =
        "El teléfono solo puede contener números, espacios, - y +.";
    }

    if (!nuevoPaciente.emailDueno) {
      newErrors.emailDueno = "El email del dueño es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoPaciente.emailDueno)) {
      newErrors.emailDueno = "Ingrese un formato de email válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Crear o actualizar paciente
  const handleAgregar = async () => {
    if (!validarPaciente()) return;

    const token = localStorage.getItem("token");
    const url = editId 
      ? `http://localhost:5000/api/v1/pacientes/${editId}`
      : 'http://localhost:5000/api/v1/pacientes';
    
    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPaciente),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editId 
            ? `Paciente "${nuevoPaciente.nombreMascota}" actualizado correctamente`
            : `Paciente "${nuevoPaciente.nombreMascota}" creado correctamente`,
          confirmButtonColor: "#6c9a72",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchPacientes();
        cerrarModal();
      } else {
        const error = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'No se pudo guardar el paciente',
          confirmButtonColor: '#6c9a72',
        });
      }
    } catch (error) {
      console.error('Error guardando paciente:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo guardar el paciente',
        confirmButtonColor: '#6c9a72',
      });
    }
  };

  // Editar paciente
  const handleEditar = (paciente, index) => {
    Swal.fire({
      title: "¿Editar paciente?",
      text: `¿Seguro que quieres editar los datos de "${paciente.nombreMascota}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#6c9a72",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        setNuevoPaciente({
          nombreMascota: paciente.nombreMascota || "",
          especie: paciente.especie || "",
          raza: paciente.raza || "",
          sexo: paciente.sexo || "",
          edad: paciente.edad || "",
          peso: paciente.peso || "",
          nombreDueno: paciente.nombreDueno || "",
          emailDueno: paciente.emailDueno || "",
          telefonoDueno: paciente.telefonoDueno || "",
        });
        setEditIndex(index);
        setEditId(paciente._id);
        setIsReadOnly(false);
        abrirModal();
      }
    });
  };

  // Ver paciente
  const handleVer = (paciente) => {
    setNuevoPaciente({
      nombreMascota: paciente.nombreMascota || "",
      especie: paciente.especie || "",
      raza: paciente.raza || "",
      sexo: paciente.sexo || "",
      edad: paciente.edad || "",
      peso: paciente.peso || "",
      nombreDueno: paciente.nombreDueno || "",
      emailDueno: paciente.emailDueno || "",
      telefonoDueno: paciente.telefonoDueno || "",
    });
    setEditIndex(null);
    setEditId(null);
    setIsReadOnly(true);
    abrirModal();
  };

  // Eliminar paciente
  const handleEliminar = async (paciente) => {
    Swal.fire({
      title: "¿Eliminar paciente?",
      text: `Se eliminará "${paciente.nombreMascota}" de la lista.`,
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
          const response = await fetch(`http://localhost:5000/api/v1/pacientes/${paciente._id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: `Paciente "${paciente.nombreMascota}" eliminado correctamente`,
              confirmButtonColor: "#6c9a72",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchPacientes();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el paciente',
              confirmButtonColor: '#6c9a72',
            });
          }
        } catch (error) {
          console.error('Error eliminando paciente:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo eliminar el paciente',
            confirmButtonColor: '#6c9a72',
          });
        }
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
      <div className="contenedor-tabla verde-redondeado">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center">Dueño</th>
              <th className="text-center">Email</th>
              <th className="text-center">Mascota</th>
              <th className="text-center">Especie</th>
              <th className="text-center">Raza</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center">
                  Cargando pacientes...
                </td>
              </tr>
            ) : pacientes.length > 0 ? (
              pacientes.map((item, index) => (
                <tr key={item._id || index}>
                  <td className="text-center">{item.nombreDueno}</td>
                  <td className="text-center">{item.emailDueno}</td>
                  <td className="text-center">
                    <strong>{item.nombreMascota}</strong>
                  </td>
                  <td className="text-center">{item.especie}</td>
                  <td className="text-center">{item.raza}</td>
                  <td>
                    <div className="contenedor-iconos-accion">
                      <button
                        className="btn-icono-accion ver"
                        title="Ver"
                        onClick={() => handleVer(item)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="btn-icono-accion editar"
                        title="Editar"
                        onClick={() => handleEditar(item, index)}
                      >
                        <PencilSquare size={18} />
                      </button>
                      <button
                        className="btn-icono-accion eliminar"
                        title="Eliminar"
                        onClick={() => handleEliminar(item)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
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
            {isReadOnly
              ? "Historia Clínica"
              : editId !== null
              ? "Editar Paciente"
              : "Dar de Alta Paciente"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-section">
            <h5>Datos del Paciente</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de la Mascota</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.nombreMascota}
                    name="nombreMascota"
                    value={nuevoPaciente.nombreMascota}
                    onChange={handleChange}
                    placeholder="Ej: Max"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombreMascota}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.sexo}
                    name="sexo"
                    value={nuevoPaciente.sexo}
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
                    {errors.sexo}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Edad (años)</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.edad}
                    name="edad"
                    value={nuevoPaciente.edad}
                    onChange={handleChange}
                    placeholder="Ej: 3"
                    type="number"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.edad}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Especie</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.especie}
                    name="especie"
                    value={nuevoPaciente.especie}
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
                    {errors.especie}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Raza</Form.Label>
                  <Form.Select
                    isInvalid={!!errors.raza}
                    name="raza"
                    value={nuevoPaciente.raza}
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
                    {errors.raza}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Peso (kg)</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.peso}
                    name="peso"
                    value={nuevoPaciente.peso}
                    onChange={handleChange}
                    placeholder="Ej: 5.5"
                    type="number"
                    step="0.1"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.peso}
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
                    isInvalid={!!errors.nombreDueno}
                    name="nombreDueno"
                    value={nuevoPaciente.nombreDueno}
                    onChange={handleChange}
                    placeholder="Ej: Juan Pérez"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombreDueno}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.emailDueno}
                    type="email"
                    name="emailDueno"
                    value={nuevoPaciente.emailDueno}
                    onChange={handleChange}
                    placeholder="Ej: juan@example.com"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.emailDueno}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    isInvalid={!!errors.telefonoDueno}
                    name="telefonoDueno"
                    value={nuevoPaciente.telefonoDueno}
                    onChange={handleChange}
                    placeholder="Ej: 351-1234567"
                    disabled={isReadOnly}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.telefonoDueno}
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
    </div>
  );
};

export default CRUDPacientes;
