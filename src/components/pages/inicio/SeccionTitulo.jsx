import './inicio.css'
import { Container, Row, Col } from 'react-bootstrap'

const SeccionTitulo = () => {
    return (
        <section className="seccion-titulo py-5">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
                        <h1 className="display-4 fw-bold">Cuidando de tus mascotas con amor y profesionalismo</h1>
                        <p className="lead mt-3">En RollingVet, tu veterinaria móvil de confianza, ofrecemos atención veterinaria de alta calidad directamente en la puerta de tu hogar. Nuestro equipo de profesionales está dedicado a brindar el mejor cuidado para tus mascotas, con servicios que incluyen consultas, vacunaciones, desparasitaciones y más. ¡Confía en nosotros para mantener a tus amigos peludos saludables y felices!</p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}   

export default SeccionTitulo