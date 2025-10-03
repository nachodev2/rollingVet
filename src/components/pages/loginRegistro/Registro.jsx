import { Button, Modal, Col, InputGroup, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

function Registro() {
  const [lgShow, setLgShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setLgShow(false);
  };

  const onError = (errors) => {
    console.log(errors);
  };

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
                <Form.Control
                  required
                  type="text"
                  placeholder="Juan Ramirez"
                  {...register("nombreCompleto", {
                    pattern: {
                      value: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/i,
                      message: "Nombre invalido",
                      minLength: { value: 6, message: "Minimo 6 caracteres" },
                      maxLength: { value: 30, message: "Maximo 30 caracteres" },
                    },
                    required: "Este campo es Obligatorio",
                  })}
                />
                <Form.Text id="formTextUsuario" className="text-danger ">
                  {errors.nombreCompleto?.message}
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="123456789"
                  {...register("password", {
                    minLength: { value: 6, message: "Minimo 6 caracteres" },
                    maxLength: { value: 12, message: "Maximo 12 caracteres" },
                    required: "Este campo es Obligatorio",
                  })}
                />
                <Form.Text id="formTextUsuario" className="text-danger ">
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
                </InputGroup>
                <Form.Text id="formTextUsuario" className="text-danger ">
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustomSelect">
                <Form.Label>Provincia</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  {...register("provincia", {
                    required: "Selecciona una opción",
                  })}
                >
                  <option value="">Selecciona una provincia</option>
                  <option value="Buenos Aires">Buenos Aires</option>
                  <option value="Catamarca">Catamarca</option>
                  <option value="Chaco">Chaco</option>
                  <option value="Chubut">Chubut</option>
                  <option value="Córdoba">Córdoba</option>
                  <option value="Corrientes">Corrientes</option>
                  <option value="Entre Ríos">Entre Ríos</option>
                  <option value="Formosa">Formosa</option>
                  <option value="Jujuy">Jujuy</option>
                  <option value="La Pampa">La Pampa</option>
                  <option value="La Rioja">La Rioja</option>
                  <option value="Mendoza">Mendoza</option>
                  <option value="Misiones">Misiones</option>
                  <option value="Neuquén">Neuquén</option>
                  <option value="Río Negro">Río Negro</option>
                  <option value="Salta">Salta</option>
                  <option value="San Juan">San Juan</option>
                  <option value="San Luis">San Luis</option>
                  <option value="Santa Cruz">Santa Cruz</option>
                  <option value="Santa Fe">Santa Fe</option>
                  <option value="Santiago del Estero">
                    Santiago del Estero
                  </option>
                  <option value="Tierra del Fuego">Tierra del Fuego</option>
                  <option value="Tucumán">Tucumán</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.provincia?.message}
                </Form.Text>
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
                <Form.Text className="text-danger ">
                  {errors.localidad?.message}
                </Form.Text>
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
                <Form.Text className="text-danger ">
                  {errors.codigoArea?.message}
                </Form.Text>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Estoy de acuerdo con los términos y condiciones"
                {...register("aceptoTerminos", {
                  required: "Debes aceptar los términos y condiciones",
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.aceptoTerminos?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Registrarme</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Registro;
