import { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';

function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
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
          <Form>
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
                autoFocus
              />
            </Form.Group>
       
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-start'>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary">Ingresar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;