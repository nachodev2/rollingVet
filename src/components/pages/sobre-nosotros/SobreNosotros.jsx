import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./sobreNosotros.css";

function SobreNosotros() {
  return (
    <>
      <h1 className="text-center titulo text-info mt-4 mx-1">Nuestro Equipo</h1>
      <h3 className="mt-3 fs-5 texto-cuerpo">
        Somos un grupo de tres estudiantes de RollingCode School, cursando la
        carrera de Desarrollo Web Full Stack. Actualmente estamos trabajando en
        nuestro proyecto final, donde buscamos aplicar todo lo aprendido y
        demostrar nuestras habilidades en programación, diseño y trabajo en
        equipo.
      </h3>
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
                <Card.Title className="text-dark titulo fs-4">Tomás Ruiz</Card.Title>
                <Card.Text className="texto-cuerpo">
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
                src="../public/images/zepeto-lu.png"
                alt="Luciana Ruiz"
                className="img-card-sobreNosotros d-flex m-auto"
              />
              <Card.Body>
                <Card.Title className="text-dark titulo fs-4">Luciana Ruiz</Card.Title>
                <Card.Text className="texto-cuerpo">
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
                <Card.Title className="text-dark titulo fs-4">José Romero</Card.Title>
                <Card.Text className="texto-cuerpo">
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
