import Button from 'react-bootstrap/Button';

function PlanComparisonCards() {
  return (
    <div className="plan-comparison-container">
      
      {/* Columna de Características (Fila 1 de la tabla original) */}
      <div className="plan-card features-column">
        <div className="plan-header">
          <h4 className="plan-title">Característica</h4>
        </div>
        <div className="plan-detail-group">
          <div className="plan-detail-item">Ultra-fast browsing</div>
          <div className="plan-detail-item">Advanced AI insights</div>
          <div className="plan-detail-item">Seamless integration</div>
          <div className="plan-detail-item">Full UTF-8 support</div>
        </div>
        <div className="plan-footer">
          <Button variant="success" className="plan-button">Adquirir Plan</Button>
        </div>
      </div>

      {/* Columna del Plan 1: WebSurge (Fila 2 de la tabla original) */}
      <div className="plan-card">
        <div className="plan-header plan-web-surge">
          <h4 className="plan-title">Plan: WebSurge</h4>
        </div>
        <div className="plan-detail-group">
          <div className="plan-detail-item"><span className="icon-check">&#10003;</span> Fast browsing</div>
          <div className="plan-detail-item">Basic AI recommendations</div>
          <div className="plan-detail-item">Restricts customization</div>
          <div className="plan-detail-item"><span className="icon-cross">&#10007;</span> Potential display errors</div>
        </div>
        <div className="plan-footer">
          <Button variant="success" className="plan-button">Adquirir Plan</Button>
        </div>
      </div>

      {/* Columna del Plan 2: HyperView (Fila 3 de la tabla original) */}
      <div className="plan-card">
        <div className="plan-header plan-hyper-view">
          <h4 className="plan-title">Plan: HyperView</h4>
        </div>
        <div className="plan-detail-group">
          <div className="plan-detail-item"><span className="icon-cross">&#10007;</span> Moderate speeds</div>
          <div className="plan-detail-item"><span className="icon-cross">&#10007;</span> No AI assistance</div>
          <div className="plan-detail-item"><span className="icon-cross">&#10007;</span> Steep learning curve</div>
          <div className="plan-detail-item"><span className="icon-cross">&#10007;</span> Partial UTF-8 support</div>
        </div>
        <div className="plan-footer">
          <Button variant="outline-dark" className="plan-button">Ver Detalles</Button>
        </div>
      </div>
      
    </div>
  );
}

export default PlanComparisonCards;