import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import "./loginRegistro.css";

function Login({ handleLogin }) { 
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
    const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD_SIMULATION;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let role = 'user';
        let userName = 'Usuario';
        
        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
            role = 'admin';
            userName = 'AdminName';
            console.log("Simulación de Login: Administrador exitoso.");
            
            if (handleLogin) {
                 handleLogin(role, userName);
            }
            
            handleClose();
        } else {
            console.log("Simulación de Login: Usuario o Credenciales Inválidas.");
            
            if (email && password) {
                 if (handleLogin) {
                    handleLogin(role, userName);
                 }
                 handleClose();
            }
        }

        setEmail('');
        setPassword('');
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