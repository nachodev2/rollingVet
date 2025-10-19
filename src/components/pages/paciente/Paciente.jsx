import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Paciente({ onGuardar, onClose, modo = "pantalla" }) {
  const esModal = modo === "modal";

  const camposPaciente = ["Nombre", "Sexo", "Edad", "Peso", "Especie", "Raza"];
  const camposDueno = ["Nombre", "Apellido", "Email", "Teléfono", "Dirección"];

  const [datosPaciente, setDatosPaciente] = useState({
    Nombre: "",
    Sexo: "",
    Edad: "",
    Peso: "",
    Especie: "",
    Raza: "",
  });

  const [datosDueno, setDatosDueno] = useState({
    Nombre: "",
    Apellido: "",
    Email: "",
    Teléfono: "",
    Dirección: "",
  });

  const handleChangePaciente = (e) => {
    const { name, value } = e.target;
    setDatosPaciente((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeDueno = (e) => {
    const { name, value } = e.target;
    setDatosDueno((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoPaciente = {
      paciente: datosPaciente,
      dueno: datosDueno,
    };
    if (onGuardar) onGuardar(nuevoPaciente);
    if (onClose) onClose();
  };

  const renderCampos = (campos, datos, handleChange) => (
    <Row xs={1} md={2} lg={3} className="justify-content-center">
      {campos.map((campo, index) => (
        <Col key={index} className="p-2 d-flex justify-content-center">
          <div
            className="py-2 px-3 border border-info bg-info-subtle rounded"
            style={{ width: "100%" }}
          >
            <div className="row align-items-center">
              <div className="col-4">
                <label className="form-label text-dark mb-0">{campo}:</label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name={campo}
                  value={datos[campo]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );

  return (
    <form onSubmit={handleSubmit}>
      {!esModal && (
        <h1 className="text-center my-4 titulo text-info">Historia Clínica</h1>
      )}

      <Container className={esModal ? "" : "my-4"}>
        <h5 className="text-center mb-3">Datos del Paciente</h5>
        {renderCampos(camposPaciente, datosPaciente, handleChangePaciente)}

        <h5 className="text-center mt-4 mb-3">Datos del Dueño</h5>
        {renderCampos(camposDueno, datosDueno, handleChangeDueno)}

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-info me-3">
            Guardar
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </Container>
    </form>
  );
}

export default Paciente;
