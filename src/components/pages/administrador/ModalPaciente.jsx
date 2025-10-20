import { Modal } from "react-bootstrap";
import Paciente from "../paciente/Paciente.jsx"

const ModalPaciente = ({ tipo, visible, onClose, datos, onGuardar }) => {
  const titulos = {
    modal: "Alta de Paciente",
    detalle: "Ficha del Paciente",
    editar: "Editar Paciente",
  };

  return (
    <Modal show={visible} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center fs-3 ms-4">
          {titulos[tipo]}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Paciente
          modo={tipo}
          datos={datos}
          onClose={onClose}
          onGuardar={onGuardar}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ModalPaciente;