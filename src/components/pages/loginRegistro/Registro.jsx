import { useState } from "react";
import { Button, Modal, Col, InputGroup, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Registro() {
  const [lgShow, setLgShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!lgShow) reset();
  }, [lgShow, reset]);

  return (
    <>
      <Button onClick={() => setLgShow(true)}>Registro</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="Registro-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="Registro-modal-sizes-title-lg">
            Registrate
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control required type="text" placeholder="Juan Ramirez" />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="123456789"
                  {...register("password", {
                    minLength: { value: 6, message: "Minimo 6 caracteres" },
                    maxLength: { value: 12, message: "Maximo 12 caracteres" },
                    required: "Campo Obligatorio",
                  })}
                />
                <Form.Text id="formTextUsuario" className="text-danger">
                  {errors.password?.message}
              </Form.Text>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustomEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    aria-describedby="inputGroupPrepend"
                    {...register("email", {
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email invalido",
                      },
                      required: "Este campo es Obligatorio",
                    })}
                  />
                  <Form.Text id="formTextUsuario" className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Provincia"
                  {...register("provincia", {
                    required: "Este campo es Obligatorio",
                  })}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>Localidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Localidad"
                  {...register("localidad", {
                    required: "Este campo es Obligatorio",
                  })}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>Codigo de area</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="1122"
                  {...register("codigoArea", {
                    required: "Este campo es Obligatorio",
                  })}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                required
                label="Estoy de acuerdo con los términos y condiciones"
              />
            </Form.Group>
            <Button type="submit">Registrarme</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Registro;
