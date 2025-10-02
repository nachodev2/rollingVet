import Paciente from "./components/pages/paciente/Paciente.jsx";
import Menu from "./components/shared/Menu.jsx";
import Error404 from "./components/pages/error404/Error404.jsx";
import Footer from "./components/shared/Footer.jsx";
import SobreNosotros from "./components/pages/sobre-nosotros/SobreNosotros";
import Producto from "../src/components/pages/producto/Producto";
import "./index.css";

function App() {
  return (
    <div className="layout-contenedor">
      <Menu />
      <main className="contenido-principal">
        <Paciente />
        <Error404 />
        <SobreNosotros />
        <Producto></Producto>
      </main>
      <Footer />
    </div>
  );
}

export default App;
