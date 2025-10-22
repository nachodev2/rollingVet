import Button from "react-bootstrap/Button";

function SeccionTablaPlanes() {
  return (
    <div>
      <section>
        <h2 className="text-center my-4 vet-title position-relative z-1 display-4 text-black">
          Membresía para tus mascotas
        </h2>
      </section>
    <div className="plan-comparison-container">
      <div className="plan-card features-column">
        <div className="plan-header">
          <h4 className="plan-title">Característica</h4>
        </div>
        <div className="plan-detail-group">
          <div className="plan-detail-item">Consultas Anuales</div>
          <div className="plan-detail-item">Vacunas Esenciales</div>
          <div className="plan-detail-item">Análisis de Sangre y Orina</div>
          <div className="plan-detail-item">Chequeo Dental</div>
        </div>
      </div>
      <div className="plan-card">
        <div className="plan-header plan-web-surge">
          <h4 className="plan-title">Plan: Primeros Pasos (0-5 años)</h4>
        </div>
        <div className="plan-detail-group">
          <div className="plan-detail-item">
            <span className="icon-check">&#10003;</span> 2 por año
          </div>
          <div className="plan-detail-item">Básicas y Refuerzos</div>
          <div className="plan-detail-item">Solo si es necesario</div>
          <div className="plan-detail-item">
            <span className="icon-cross">&#10007;</span> Chequeo dental básico
          </div>
        </div>
        <div className="plan-footer">
          <Button variant="success" className="plan-button text-dark">
            Adquirir Plan
          </Button>
        </div>
      </div>
      <div className="plan-card">
        <div className="plan-header plan-hyper-view">
          <h4 className="plan-title">Plan: Madurando (5-10 años)</h4>
        </div>
        <div className="plan-detail-group">
          <div className="plan-detail-item">
            <span className="icon-cross">&#10007;</span> 1 por año
          </div>
          <div className="plan-detail-item">Refuerzos periódicos</div>
          <div className="plan-detail-item">
            <span className="icon-check">&#10003;</span> Hemograma completo
          </div>
          <div className="plan-detail-item">
            <span className="cross">&#10007;</span> Limpieza con 10% de dto.
          </div>
        </div>
        <div className="plan-footer">
          <Button variant="success" className="plan-button text-dark">
            Adquirir Plan
          </Button>
        </div>
      </div>
      <div className="plan-card plan-adultos">
        <div className="plan-header">
          <h4 className="plan-title">Plan: Adultos (10+ años)</h4>
        </div>
        <div className="plan-detail-group">
          <div className="plan-detail-item">
            <span className="icon-check">&#10003;</span> 3 por año
          </div>
          <div className="plan-detail-item">
            <span className="icon-cross">&#10007;</span> Opcional (dto. extra)
          </div>
          <div className="plan-detail-item">
            <span className="icon-check">&#10003;</span> Perfil Geriátrico
            completo
          </div>
          <div className="plan-detail-item">
            <span className="icon-check">&#10003;</span> Limpieza con 20% de
            dto.
          </div>
        </div>
        <div className="plan-footer">
          <Button variant="success" className="plan-button text-dark">
            Adquirir Plan
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SeccionTablaPlanes;
