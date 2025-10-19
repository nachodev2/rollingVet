import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function Paciente({ onGuardar, onClose, modo = "pantalla", datos }) {
  const esModal = modo === "modal";
  const esDetalle = modo === "detalle";
  const esEdicion = modo === "editar";

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

  const [razas, setRazas] = useState([]);

  const opcionesPredefinidas = {
    Sexo: ["Macho", "Hembra"],
    Especie: ["Perro", "Gato", "Conejo", "Ave", "Otro"],
  };

  const razasPorEspecie = {
    Perro: ["Labrador Retriever", "Bulldog", "Caniche", "Pastor Alemán", "Beagle", "Boxer", "Chihuahua", "Dálmata", "Golden Retriever", "Pomerania", "Otro"],
    Gato: ["Siames", "Persa", "Maine Coon", "Azul Ruso", "Bengalí", "Angora Turco", "British Shorthair", "Sphynx", "Bombay", "Otro"],
    Conejo: ["Mini Rex", "Holandés", "Cabeza de León", "Otro"],
    Ave: ["Canario", "Loro", "Cacatúa", "Otro"],
    Otro: ["Sin especificar"]
  };

  const placeholders = {
    Nombre: "Ej: Candy",
    NombreDueno: "Ej: Laura",
    Sexo: "Ej: Hembra",
    Edad: "Ej: 3",
    Peso: "Ej: 12.5",
    Especie: "Ej: Perro",
    Raza: "Ej: Caniche",
    Apellido: "Ej: González",
    Email: "Ej: ejemplo@mail.com",
    Teléfono: "Ej: 3815123456",
    Dirección: "Ej: Av. Siempreviva 742"
  };

  useEffect(() => {
    if (esEdicion && datos) {
      setDatosPaciente(datos.paciente || {});
      setDatosDueno(datos.dueno || {});
    }
  }, [esEdicion, datos]);

  useEffect(() => {
    const especie = datosPaciente.Especie;
    if (especie && razasPorEspecie[especie]) {
      setRazas(razasPorEspecie[especie]);
    } else {
      setRazas([]);
    }
  }, [datosPaciente.Especie]);

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
    const pacienteFinal = {
      paciente: datosPaciente,
      dueno: datosDueno,
    };
    if (onGuardar) onGuardar(pacienteFinal);
    if (onClose) onClose();
  };

  const renderCampos = (campos, datos, handleChange) => (
    <Row xs={1} md={2} lg={3} className="justify-content-center">
      {campos.map((campo, index) => (
        <Col key={index} className="p-2 d-flex justify-content-center">
          <div className="py-2 px-3 border border-info bg-info-subtle rounded" style={{ width: "100%" }}>
            <div className="row align-items-center">
              <div className="col-4">
                <label className="form-label text-dark mb-0">{campo}:</label>
              </div>
              <div className="col-8">
                {campo === "Raza" ? (
                  <>
                    <input
                      type="text"
                      name={campo}
                      value={datos[campo]}
                      onChange={handleChange}
                      className="form-control"
                      list="razas-list"
                      placeholder={placeholders[campo]}
                      required
                    />
                    <datalist id="razas-list">
                      {razas.map((raza) => (
                        <option key={raza} value={raza} />
                      ))}
                    </datalist>
                  </>
                ) : opcionesPredefinidas[campo] ? (
                  <select
                    name={campo}
                    value={datos[campo]}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">{placeholders[campo]}</option>
                    {opcionesPredefinidas[campo].map((opcion) => (
                      <option key={opcion} value={opcion}>{opcion}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    name={campo}
                    value={datos[campo]}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={
                      campo === "Nombre" && handleChange === handleChangeDueno
                        ? placeholders["NombreDueno"]
                        : placeholders[campo]
                    }
                    required
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );

  if (esDetalle && datos) {
    const renderDetalle = (campos, datos) => (
      <Row xs={1} md={2} lg={3} className="justify-content-center">
        {campos.map((campo, index) => (
          <Col key={index} className="p-2 d-flex justify-content-center">
            <div className="py-2 px-3 border border-info bg-info-subtle rounded" style={{ width: "100%" }}>
              <div className="row align-items-center">
                <div className="col-4">
                  <label className="form-label text-dark mb-0">{campo}:</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    readOnly
                    value={datos?.[campo] || "-"}
                    title={datos?.[campo] || "-"}
                    className="form-control bg-white"
                  />
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    );

    return (
      <Container className="my-4">
        <h5 className="text-center mb-3">Datos del Paciente</h5>
        {renderDetalle(camposPaciente, datos.paciente)}
        <h5 className="text-center mt-4 mb-3">Datos del Dueño</h5>
        {renderDetalle(camposDueno, datos.dueno)}
      </Container>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container className={esModal || esEdicion ? "" : "my-4"}>
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