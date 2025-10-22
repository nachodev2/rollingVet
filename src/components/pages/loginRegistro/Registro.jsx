import { Button, Modal, Col, InputGroup, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./loginRegistro.css";

const API_BASE_URL = "http://localhost:5000/api/v1/auth";

function Registro() {
  const [lgShow, setLgShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    const payload = {
      nombreDueno: data.nombreCompleto,
      emailDueno: data.email,
      password: data.password,

      telefonoDueno: data.codigoArea,
      nombreMascota: "Sin Asignar",
      especie: "No Definida",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Error al registrar.");
      }

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Ya puedes iniciar sesión con tu nueva cuenta.",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        reset();
        setLgShow(false);
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error de registro",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const onError = (errors) => {
    Swal.fire({
      icon: "warning",
      title: "Verifica los datos",
      text: "Por favor, corrige los errores del formulario antes de continuar.",
    });
  };

  useEffect(() => {
    if (!lgShow) {
      reset();
    }
  }, [lgShow, reset]);

  return (
    <>
      <Button
        className="btn-registro rounded-pill px-4"
        onClick={() => setLgShow(true)}
      >
        Registro
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="Registro-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="Registro-modal-sizes-title-lg">
            Regístrate
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
            <Button type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrarme"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Registro;
