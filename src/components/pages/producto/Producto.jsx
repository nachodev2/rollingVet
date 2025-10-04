import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./producto.css";


function Producto({ data }) {

  return (

    <Card className="product-card mt-4 rounded-4 h-100">

      <Card.Img
        variant="top"
        src={data.imagen}
        alt={data.alt}
        className="img-card-productos d-flex m-auto h-100 contain"
        draggable={false}
      />
      <Card.Body>
        <Card.Title className="text-dark titulo fs-4">
          {data.nombre}
        </Card.Title>
        <Card.Text className="texto-cuerpo">
          {data.texto}
        </Card.Text>
        <Card.Text className="product-card-price">
          {data.precio}
        </Card.Text>
        <Button variant="primary" className="w-100">Comprar</Button>
      </Card.Body>
    </Card>
  );
}

export default Producto;
