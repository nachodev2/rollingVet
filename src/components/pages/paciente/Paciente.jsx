import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Paciente({ onGuardar, onClose, modo = "pantalla", datos }) {
  const esModal = modo === "modal";
  const esDetalle = modo === "detalle";
  const esEdicion = modo === "editar";

  const camposPaciente = ["Nombre", "Sexo", "Edad", "Peso", "Especie", "Raza"];
  const camposDueno = ["Nombre", "Apellido", "Email", "Teléfono", "Dirección"];

  const opcionesPredefinidas = {
    Sexo: ["Macho", "Hembra"],
    Especie: ["Perro", "Gato", "Conejo", "Ave", "Otro"],
  };

  const razasPorEspecie = {
    Perro: ["Labrador", "Caniche", "Bulldog", "Otro"],
    Gato: ["Siames", "Persa", "Maine Coon", "Otro"],
    Conejo: ["Mini Rex", "Holandés", "Otro"],
    Ave: ["Canario", "Loro", "Otro"],
    Otro: ["Sin especificar"],
  };

  const placeholders = {
    "paciente.Nombre": "Ej: Candy",
    "paciente.Sexo": "Ej: Hembra",
    "paciente.Edad": "Ej: 3",
    "paciente.Peso": "Ej: 12.5",
    "paciente.Especie": "Ej: Perro",
    "paciente.Raza": "Ej: Caniche",
    "dueno.Nombre": "Ej: Laura",
    "dueno.Apellido": "Ej: González",
    "dueno.Email": "Ej: ejemplo@mail.com",
    "dueno.Teléfono": "Ej: 3815123456",
    "dueno.Dirección": "Ej: Av. Siempreviva 742",
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const especieSeleccionada = watch("paciente.Especie");

  useEffect(() => {
    if ((esModal || esEdicion) && datos) {
      camposPaciente.forEach((campo) =>
        setValue(`paciente.${campo}`, datos.paciente?.[campo] || "")
      );
      camposDueno.forEach((campo) =>
        setValue(`dueno.${campo}`, datos.dueno?.[campo] || "")
      );
    }
  }, [datos, esModal, esEdicion, setValue]);

  const onSubmit = (formData) => {
    try {
      onGuardar(formData);
      onClose();
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  const renderCampos = (campos, tipo) => (
    <Row xs={1} md={2} lg={3} className="justify-content-center">
      {campos.map((campo, index) => {
        const nombreCampo = `${tipo}.${campo}`;
        const valorActual = watch(nombreCampo);

        const reglas = {
          required: `${campo} es obligatorio`,
          ...(campo === "Email" && {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Formato de email inválido",
            },
          }),
          ...(campo === "Teléfono" && {
            pattern: {
              value: /^[0-9]{7,15}$/,
              message: "Teléfono inválido (solo números)",
            },
          }),
          ...(campo === "Nombre" && {
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
            maxLength: { value: 30, message: "Máximo 30 caracteres" },
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
              message: "Solo letras y espacios",
            },
          }),
        };

        return (
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
                  {campo === "Raza" ? (
                    <>
                      <input
                        type="text"
                        {...register(nombreCampo, reglas)}
                        list="razas-list"
                        placeholder={placeholders[nombreCampo]}
                        className={`form-control ${errors?.[tipo]?.[campo] ? "is-invalid" : ""}`}
                      />
                      <datalist id="razas-list">
                        {(razasPorEspecie[especieSeleccionada] || []).map((raza) => (
                          <option key={raza} value={raza} />
                        ))}
                      </datalist>
                    </>
                  ) : opcionesPredefinidas[campo] ? (
                    <select
                      {...register(nombreCampo, reglas)}
                      className={`form-control ${errors?.[tipo]?.[campo] ? "is-invalid" : ""}`}
                    >
                      <option value="">{placeholders[nombreCampo]}</option>
                      {opcionesPredefinidas[campo].map((opcion) => (
                        <option key={opcion} value={opcion}>{opcion}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      {...register(nombreCampo, reglas)}
                      placeholder={placeholders[nombreCampo]}
                      className={`form-control ${errors?.[tipo]?.[campo] ? "is-invalid" : ""}`}
                    />
                  )}
                  {errors?.[tipo]?.[campo] && (
                    <div className="invalid-feedback text-center">
                      {errors[tipo][campo].message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );

  if (esDetalle && datos) {
    const renderDetalle = (campos, datos) => (
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container className={esModal || esEdicion ? "" : "my-4"}>
        <h5 className="text-center mb-3">Datos del Paciente</h5>
        {renderCampos(camposPaciente, "paciente")}

        <h5 className="text-center mt-4 mb-3">Datos del Dueño</h5>
        {renderCampos(camposDueno, "dueno")}

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-info me-3">
            {esEdicion ? "Actualizar" : "Guardar"}
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