import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import "./loginRegistro.css";

// IMPORTANTE: Asegúrate de que Menu.jsx le pase la prop handleLogin.
// Si no la pasas, descomenta las líneas que definen la prop abajo y usa la versión del Menu.jsx
// que te pasé con handleLogin y localStorage para fines de la presentación.
function Login({ handleLogin }) { 
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;
    const ADMIN_PASS = process.env.REACT_APP_ADMIN_PASSWORD_SIMULATION;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let role = 'user';
        let userName = 'Usuario';
        
        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
            role = 'admin';
            userName = 'AdminName';
            console.log("Simulación de Login: Administrador exitoso.");
            
            // Llama a la función del Navbar para actualizar el estado
            if (handleLogin) {
                 handleLogin(role, userName);
            }
            
            handleClose();
        } else {
            console.log("Simulación de Login: Usuario o Credenciales Inválidas.");
            // Aquí en un proyecto real harías el fetch al backend.
            
            // Para la presentación, puedes simular un usuario normal si no coincide con admin:
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