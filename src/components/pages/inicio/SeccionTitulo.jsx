import { Container, Image } from "react-bootstrap";
import "./Inicio.css";
const ImagenMascota = "/images/especies/ai-generated-8678181_640.webp";

function SeccionTitulo() {
  return (
    <Container className="my-5">
      <div className="vet-section-wrapper">
        <div className="vet-background-bar"></div>
        <h1 className="text-center mb-4 vet-title position-relative z-1 display-1 text-black">
          Bienestar y Amor
        </h1>

        <div className="vet-image-frame position-relative z-1">
          <Image
            src={ImagenMascota}
            alt="Perro y gato asomándose"
            fluid
            className="vet-image-content"
          />
        </div>
      </div>
    </Container>
  );
}

export default SeccionTitulo;
