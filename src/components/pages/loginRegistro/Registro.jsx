import { Button, Modal, Col, InputGroup, Form, Row, Toast } from "react-bootstrap";
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
        watch,
        formState: { errors },
    } = useForm();


    const especieSeleccionada = watch("especie");

    const onSubmit = async (data) => {
        setLoading(true);

        const payload = {

            nombreDueno: data.nombreCompleto,
            emailDueno: data.email,
            password: data.password,
            telefonoDueno: data.codigoArea,


            nombreMascota: data.nombreMascota,
            especie: data.especie,
            raza: data.raza,
            edadMascota: data.edadMascota,
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
                size="xl"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="Registro-modal-sizes-title-xl"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="Registro-modal-sizes-title-xl">
                        Regístrate como Paciente y Dueño
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>


                        <h5 className="mb-3 mt-2 text-primary">Datos del Dueño</h5>
                        <Row className="mb-3">

                            <Form.Group as={Col} md="6" controlId="validationOwnerName">
                                <Form.Label>Nombre Completo</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Ingrese su nombre completo"
                                    {...register("nombreCompleto", {
                                        required: "El nombre completo es requerido",
                                        minLength: { value: 3, message: "Mínimo 3 caracteres" },
                                    })}
                                    isInvalid={!!errors.nombreCompleto}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nombreCompleto?.message}
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group as={Col} md="6" controlId="validationOwnerEmail">
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingrese su email"
                                        required
                                        {...register("email", {
                                            required: "El email es requerido",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Ingrese un email válido",
                                            },
                                        })}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>

                        <Row className="mb-4">

                            <Form.Group as={Col} md="6" controlId="validationPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="********"
                                    required
                                    {...register("password", {
                                        required: "La contraseña es requerida",
                                        minLength: { value: 6, message: "Mínimo 6 caracteres" },
                                    })}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group as={Col} md="6" controlId="validationPhone">
                                <Form.Label>Teléfono</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>+54</InputGroup.Text>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Código de Área + Número (Ej: 3816543210)"
                                        required
                                        {...register("codigoArea", {
                                            required: "El teléfono es requerido",
                                            pattern: {
                                                value: /^\d{10,}$/,
                                                message: "Ingrese un número de teléfono válido",
                                            },
                                        })}
                                        isInvalid={!!errors.codigoArea}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.codigoArea?.message}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>

                        <hr />

                        <h5 className="mb-3 mt-4 text-success">Datos de la Mascota</h5>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationPetName">
                                <Form.Label>Nombre de la Mascota</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nombre de la Mascota"
                                    {...register("nombreMascota", {
                                        required: "El nombre de la mascota es requerido",
                                        minLength: { value: 2, message: "Mínimo 2 caracteres" },
                                    })}
                                    isInvalid={!!errors.nombreMascota}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nombreMascota?.message}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationPetSpecies">
                                <Form.Label>Especie</Form.Label>
                                <Form.Select
                                    aria-label="Seleccione la especie"
                                    {...register("especie", {
                                        required: "La especie es requerida",
                                    })}
                                    isInvalid={!!errors.especie}
                                >
                                    <option value="">Seleccione...</option>
                                    <option value="Perro">Perro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Otro">Otro</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.especie?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-4">
                            <Form.Group as={Col} md="6" controlId="validationPetBreed">
                                <Form.Label>Raza</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Raza (Ej: Labrador, Siamés)"
                                    {...register("raza", {
                                        required: "La raza es requerida",
                                        minLength: { value: 2, message: "Mínimo 2 caracteres" },
                                    })}
                                    isInvalid={!!errors.raza}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.raza?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationPetAge">
                                <Form.Label>Edad (Años)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Edad en años"
                                    min="0"
                                    required
                                    {...register("edadMascota", {
                                        required: "La edad es requerida",
                                        min: { value: 0, message: "Debe ser un número positivo" },
                                        valueAsNumber: true,
                                    })}
                                    isInvalid={!!errors.edadMascota}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.edadMascota?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <div className="d-grid mt-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Registrando..." : "Registrarme"}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Registro;
