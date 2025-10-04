import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CardImg } from "react-bootstrap";
import "./producto.css";

function Producto({ data }) {
  return (
    <Card className="product-card mt-4 rounded-4">
      
      <Card.Img
        variant="top"
        src={data.imagen}
        alt={data.alt}
        className="product-card-img w-100"
        draggable={false}
      />
      <Card.Body className="d-flex flex-column justify-content-between p-3"> 
        <div className='mb-3'>
            <Card.Title className="text-dark titulo fs-5 mb-1 text-truncate"> 
              {data.nombre}
            </Card.Title>
            <Card.Text className="texto-cuerpo small text-muted mb-2 text-truncate"> 
              {data.texto} 
            </Card.Text>
        </div>

        <div>
            <Card.Text className="product-card-price fs-4 fw-bold mb-2">
              {data.precio}
            </Card.Text>
            <Button variant="success" className="w-100">Comprar</Button> 
        </div>
      </Card.Body>
    </Card>
  );
}

export default Producto;