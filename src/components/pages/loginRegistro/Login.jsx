import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2"; // 👈 Importar SweetAlert2
import { useNavigate } from "react-router";
import "./loginRegistro.css";

// URL base de tu backend.
const API_BASE_URL = "http://localhost:5000/api/v1/auth";

function Login({ handleLogin }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // States for change password modal
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showPasswordChangedModal, setShowPasswordChangedModal] = useState(false);
  const [tempOldPassword, setTempOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordErrors, setChangePasswordErrors] = useState({});
  const [changingPassword, setChangingPassword] = useState(false);

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

      // Check if password is temporary (all lowercase letters, no numbers)
      const isTempPassword = /^[a-z]+$/i.test(password) && !/\d/.test(password);

      if (isTempPassword) {
        setTempOldPassword(password);
        setShowChangePasswordModal(true);
        setShow(false); // Close login modal
        return;
      } else {
        // Normal login proceed
        Swal.fire({
          icon: "success",
          title: `¡Bienvenido, ${data.user.nombre}!`,
          showConfirmButton: false,
          timer: 1500,
        });

        handleLogin(data.user.role, data.user.nombre);
        navigate('/');
        handleClose();
      }
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

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setChangePasswordErrors({});

    const errors = {};
    if (newPassword.length < 6) {
      errors.newPassword = "La nueva contraseña debe tener al menos 6 caracteres.";
    }
    if (newPassword === tempOldPassword) {
      errors.newPassword = "La nueva contraseña no puede ser igual a la anterior.";
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden.";
    }

    if (Object.keys(errors).length > 0) {
      setChangePasswordErrors(errors);
      return;
    }

    setChangingPassword(true);

    try {
      const response = await fetch(`${API_BASE_URL}/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ oldPassword: tempOldPassword, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update token if provided
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        // Update login state if user provided
        if (data.user) {
          handleLogin(data.user.role, data.user.nombre);
        }
        // Close modal and clean fields
        setShowChangePasswordModal(false);
        setNewPassword('');
        setConfirmPassword('');
        setTempOldPassword('');
        setChangePasswordErrors({});
        // Show new modal
        setShowPasswordChangedModal(true);
      } else if (response.status === 400) {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error al cambiar contraseña",
          text: data.error || "Error de validación. Intenta nuevamente.",
          confirmButtonColor: "#6c9a72",
        });
        // Modal stays open for retry
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al cambiar contraseña",
          text: "No se pudo cambiar la contraseña. Intenta nuevamente.",
          confirmButtonColor: "#6c9a72",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar al servidor.",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleChangePasswordClose = () => {
    // If they cancel, log out
    localStorage.removeItem("token");
    setShowChangePasswordModal(false);
    setEmail("");
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTempOldPassword("");
    window.location.reload(); // Force login again
  };

  const handlePasswordChangedCloseAndLogin = () => {
    setShowPasswordChangedModal(false);
    setShow(true); // Open login modal
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

      <Modal
        show={showChangePasswordModal}
        onHide={handleChangePasswordClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Cambiar Contraseña Temporal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted">
            Tu contraseña es temporal. Debes cambiarla para continuar accediendo al sistema.
          </p>
          <Form onSubmit={handleChangePasswordSubmit}>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nueva contraseña (mín 6 carácteres)"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                isInvalid={!!changePasswordErrors.newPassword}
              />
              <Form.Control.Feedback type="invalid">
                {changePasswordErrors.newPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirmar Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite la nueva contraseña"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={!!changePasswordErrors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {changePasswordErrors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                disabled={changingPassword}
              >
                {changingPassword ? "Cambiando..." : "Cambiar Contraseña"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
          <Button
            variant="secondary"
            onClick={handleChangePasswordClose}
            disabled={changingPassword}
          >
            Cancelar (Cerrar Sesión)
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showPasswordChangedModal}
        onHide={handlePasswordChangedCloseAndLogin}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton={false}>
          <Modal.Title>Contraseña cambiada correctamente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">
            Tu contraseña temporal ha sido cambiada exitosamente.
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="primary"
            onClick={handlePasswordChangedCloseAndLogin}
          >
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
