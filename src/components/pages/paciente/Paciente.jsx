import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./paciente.css";

function Paciente() {
  const camposPaciente = ["Nombre", "Sexo", "Edad", "Peso", "Especie", "Raza"];
  const camposDueno = ["Nombre", "Apellido", "Email", "Teléfono", "Dirección"];

  const renderCampos = (campos) => (
    <Row xs={1} md={2} lg={3} className="justify-content-center">
      {campos.map((campo, index) => (
        <Col key={index} className="p-2 d-flex justify-content-center">
          <div
            className="border border-info bg-info-subtle py-3 px-4 rounded d-flex align-items-center"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <label className="text-dark me-3 mb-0 w-25">{campo}:</label>
            <input
              type="text"
              className="bg-light rounded-2 border border-2 input-paciente flex-grow-1"
            />
          </div>
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <h1 className="text-center my-4 titulo text-info">Historia Clínica</h1>
      <div className="container my-4 border border-dark rounded-3 p-3 contenedor-paciente">
        <h4 className="text-center my-3">Datos del Paciente</h4>
        <Container className="mb-5">{renderCampos(camposPaciente)}</Container>

        <h4 className="text-center my-3">Datos del Dueño</h4>
        <Container className="mb-5">{renderCampos(camposDueno)}</Container>
      </div>
    </>
  );
}

export default Paciente;
