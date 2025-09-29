import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./producto.css";

function Producto() {
  return (
    <>
      <Container className="mb-5">
        <Row xs={1} md={2} lg={4} className="g-4">
          <Col>
            <Card className="mt-4 rounded-4 h-100">
              <Card.Img
                variant="top"
                src="../images/alimento-perros.png"
                alt="Alimento para perros"
                className="img-card-productos d-flex m-auto h-100 contain"
              />
              <Card.Body>
                <Card.Title className="text-dark titulo fs-4">
                  Alimento para perros
                </Card.Title>
                <Card.Text className="texto-cuerpo">
                  Alimento premium para perros: sabor irresistible, nutrición
                  completa y energía saludable cada día.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-4 rounded-4 h-100">
              <Card.Img
                variant="top"
                src="../images/juguetes-gatos.png"
                alt="Juguetes para gatos"
                className="img-card-productos d-flex m-auto h-100 contain"
              />
              <Card.Body>
                <Card.Title className="text-dark titulo fs-4">
                  Juguetes para gatos
                </Card.Title>
                <Card.Text className="texto-cuerpo">
                  Ideales para el juego diario, ayudan a reducir el estrés y
                  mantener activos a los gatos de todas las edades.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-4 rounded-4 h-100">
              <Card.Img
                variant="top"
                src="../images/shampoo-animales.png"
                alt="Shampoo Canino"
                className="img-card-productos d-flex m-auto h-100 contain"
              />
              <Card.Body>
                <Card.Title className="text-dark titulo fs-4">
                  Shampoo Canino
                </Card.Title>
                <Card.Text className="texto-cuerpo">
                  Limpieza suave y profunda que cuida la piel y el pelaje. Con
                  ingredientes naturales, deja el pelo brillante, sin
                  irritaciones y con un aroma fresco.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-4 rounded-4 h-100">
              <Card.Img
                variant="top"
                src="../images/ropa-perros.png"
                alt="Ropa para perros"
                className="img-card-productos d-flex m-auto h-100 cover"
              />
              <Card.Body>
                <Card.Title className="text-dark titulo fs-4">
                  Ropa para perros
                </Card.Title>
                <Card.Text className="texto-cuerpo">
                  Abrigo, estilo y comodidad en cada prenda. Diseños funcionales
                  y adorables que protegen del clima y realzan la personalidad
                  de tu mascota.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-4 rounded-4 h-100">
              <Card.Img
                variant="top"
                src="../images/juguete-perros.png"
                alt="Juguete para perros"
                className="img-card-productos d-flex m-auto h-100 cover"
              />
              <Card.Body>
                <Card.Title className="text-dark titulo fs-4">
                  Juguete para perros
                </Card.Title>
                <Card.Text className="texto-cuerpo">
                  Ideal para morder, jugar y liberar energía, estimula el
                  instinto y fortalece el vínculo con tu mascota.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-4 rounded-4 h-100">
              <Card.Img
                variant="top"
                src="../images/medicamento-perros.png"
                alt="Medicamento para perros"
                className="img-card-productos d-flex m-auto h-100 cover"
              />
              <Card.Body>
                <Card.Title className="text-dark titulo fs-4">
                  Medicamento para perros
                </Card.Title>
                <Card.Text className="texto-cuerpo">
                  Formulado para tratar afecciones comunes con eficacia,
                  seguridad y mejorar la salud de tu mascota bajo supervisión
                  veterinaria.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-4 rounded-4 h-100">
              <Card.Img
                variant="top"
                src="../images/correa.png"
                alt="Correa para perros"
                className="img-card-productos d-flex m-auto h-100 cover"
              />
              <Card.Body>
                <Card.Title className="text-dark titulo fs-4">
                  Correa para perros
                </Card.Title>
                <Card.Text className="texto-cuerpo">
                  Formulado para tratar afecciones comunes con eficacia,
                  seguridad y mejorar la salud de tu mascota bajo supervisión
                  veterinaria.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="mt-4 rounded-4 h-100">
              <Card.Img
                variant="top"
                src="../images/perfume-gato.png"
                alt="Perfume para gatos"
                className="img-card-productos d-flex m-auto h-100 cover"
              />
              <Card.Body>
                <Card.Title className="text-dark titulo fs-4">
                  Perfume para gatos
                </Card.Title>
                <Card.Text className="texto-cuerpo">
                  Aroma suave y seguro que acompaña su higiene sin irritar.
                  Ideal para mantener a tu gato fresco, limpio y mimado con
                  delicadeza.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Producto;
