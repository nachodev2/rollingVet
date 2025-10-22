import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2"; // 👈 Importar SweetAlert2
import "./loginRegistro.css";

// URL base de tu backend.
const API_BASE_URL = "http://localhost:5000/api/v1/auth";

function Login({ handleLogin }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error de conexión.");
      }

      localStorage.setItem("token", data.token);

      Swal.fire({
        icon: "success",
        title: `¡Bienvenido, ${data.user.nombre}!`,
        showConfirmButton: false,
        timer: 1500,
      });

      handleLogin(data.user.role, data.user.nombre);

      handleClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error de acceso",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button className="btn-acceso rounded-pill px-4" onClick={handleShow}>
        Iniciar sesión
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ejemplo@gmail.com"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ControlInput2">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
                disabled={loading}
              >
                {loading ? "Cargando..." : "Ingresar"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
