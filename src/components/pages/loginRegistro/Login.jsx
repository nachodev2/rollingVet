import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import "./loginRegistro.css";

function Login() { 
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("LOGIN: Formulario listo para enviar al Backend.");
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
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ControlInput2">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="********"
                                required
                            />
                        </Form.Group>
                        <div className='d-grid'>
                           <Button variant="primary" type="submit" className='mt-3'>
                                Ingresar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-start'>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login;