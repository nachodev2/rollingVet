import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SobreNosotros() {
  return (
    <>
      <h1 className="text-center titulo mt-4 mx-1">Nuestro Equipo</h1>
      <p className="mt-3 mx-5 lead">
        Somos un grupo de tres estudiantes de RollingCode School, cursando la
        carrera de Desarrollo Web Full Stack. Actualmente estamos trabajando en
        nuestro proyecto final, donde buscamos aplicar todo lo aprendido y
        demostrar nuestras habilidades en programación, diseño y trabajo en
        equipo.
      </p>
      <Container className="mb-5">
        <Row>
          <Col>
            <Card className="mt-4 card-sobreNosotros px-2 rounded-4">
              <Card.Img
                variant="top"
                src="../images/zepeto-lu.png"
                alt="Luciana Ruiz"
                className="img-card-sobreNosotros d-flex m-auto"
              />
              <Card.Body>
                <Card.Title>Tomás Ruiz</Card.Title>
                <Card.Text>
                  Estudiante de desarrollo web full stack en RollingCode,
                  siempre enfocado en aportar ideas y soluciones que fortalezcan
                  el trabajo grupal.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-4 card-sobreNosotros px-2 rounded-4">
              <Card.Img
                variant="top"
                src="../images/zepeto-lu.png"
                alt="Luciana Ruiz"
                className="img-card-sobreNosotros d-flex m-auto"
              />
              <Card.Body>
                <Card.Title>Luciana Ruiz</Card.Title>
                <Card.Text>
                  Estudiante de desarrollo web full stack en RollingCode, con
                  gran compromiso y entusiasmo por aprender y crecer en el área
                  tecnológica.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-4 card-sobreNosotros px-2 rounded-4">
              <Card.Img
                variant="top"
                src="../images/zepeto-lu.png"
                alt="Luciana Ruiz"
                className="img-card-sobreNosotros d-flex m-auto"
              />
              <Card.Body>
                <Card.Title>José Romero</Card.Title>
                <Card.Text>
                  Estudiante de desarrollo web full stack en RollingCode,
                  motivado por la innovación y el aprendizaje constante dentro
                  del mundo digital.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SobreNosotros;
