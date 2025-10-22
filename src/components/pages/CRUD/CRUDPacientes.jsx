import { useState, useEffect } from "react";
import { Modal, Button, Table, Form, Row, Col } from "react-bootstrap";
import { Eye } from "react-bootstrap-icons";
import Swal from "sweetalert2";
import "./ModalPacientes.css";
import "../administrador/Administrador.css";

const CRUDPacientes = () => {
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const cerrarModal = () => {
    setShowModal(false);
    setUsuarioSeleccionado(null);
  };

  const fetchUsuarios = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    
    console.log('🔍 Fetching usuarios con token:', token ? 'Token presente' : 'Sin token');
    
    try {
      const response = await fetch('http://localhost:5000/api/v1/usuarios', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📡 Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Usuarios recibidos:', data);
        setUsuarios(data.data || []);
      } else {
        const errorText = await response.text();
        console.error('❌ Error response:', response.status, errorText);
        setUsuarios([]);
        
        if (response.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'No autorizado',
            text: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
            confirmButtonColor: '#6c9a72',
          });
        }
      }
    } catch (error) {
      console.error('❌ Error fetching usuarios:', error);
      setUsuarios([]);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudo conectar con el servidor',
        confirmButtonColor: '#6c9a72',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleVerUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowModal(true);
  };

  return (
    <div className="crud-pacientes p-4">
      <div className="contenedor-tabla verde-redondeado">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center">Nombre</th>
              <th className="text-center">Email</th>
              <th className="text-center">Rol</th>
              <th className="text-center">Fecha Registro</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Cargando usuarios...
                </td>
              </tr>
            ) : usuarios.length > 0 ? (
              usuarios.map((usuario, index) => (
                <tr key={usuario._id || index}>
                  <td className="text-center">
                    <strong>{usuario.nombre}</strong>
                  </td>
                  <td className="text-center">{usuario.email}</td>
                  <td className="text-center">
                    <span className={`badge ${usuario.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                      {usuario.role}
                    </span>
                  </td>
                  <td className="text-center">
                    {usuario.createdAt ? new Date(usuario.createdAt).toLocaleDateString('es-AR') : 'N/A'}
                  </td>
                  <td>
                    <div className="contenedor-iconos-accion">
                      <button
                        className="btn-icono-accion ver"
                        title="Ver detalles"
                        onClick={() => handleVerUsuario(usuario)}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={cerrarModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title text-center w-100 ms-4">
            Detalles del Usuario
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {usuarioSeleccionado && (
            <div className="form-section">
              <h5>Información del Usuario</h5>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      value={usuarioSeleccionado.nombre || 'N/A'}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={usuarioSeleccionado.email || 'N/A'}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rol</Form.Label>
                    <Form.Control
                      value={usuarioSeleccionado.role || 'N/A'}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Fecha de Registro</Form.Label>
                    <Form.Control
                      value={usuarioSeleccionado.createdAt ? new Date(usuarioSeleccionado.createdAt).toLocaleString('es-AR') : 'N/A'}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      value={usuarioSeleccionado._id || 'N/A'}
                      disabled
                      style={{fontFamily: 'monospace', fontSize: '0.85rem'}}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}
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

export default CRUDPacientes;