import Paciente from "./components/pages/paciente/Paciente.jsx";
import Menu from "./components/shared/Menu.jsx";
import Error404 from "./components/pages/error404/Error404.jsx";
import Footer from "./components/shared/Footer.jsx";
import SobreNosotros from "./components/pages/sobre-nosotros/SobreNosotros.jsx";
import Producto from "./components/pages/producto/Producto.jsx";
import Inicio from "./components/pages/inicio/Inicio.jsx";
import Administrador from "./components/pages/administrador/Administrador.jsx";
import "./index.css";

function App() {
  return (
    <div className="layout-contenedor">
      <Menu />
      <main className="contenido-principal">
        <Administrador />
      </main>
      <Footer />
    </div>
  );
}

export default App;
