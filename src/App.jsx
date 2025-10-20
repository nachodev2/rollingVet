import { Routes, Route } from 'react-router'
import Menu from "./components/shared/Menu.jsx";
import Footer from "./components/shared/Footer.jsx";
import Inicio from "./components/pages/inicio/Inicio.jsx";
import Contacto from "./components/pages/contacto/Contacto.jsx";
import SobreNosotros from "./components/pages/sobre-nosotros/SobreNosotros.jsx";
import Administrador from "./components/pages/administrador/Administrador.jsx";
import CarroCompras from "./components/pages/carro-compras/CarroCompras.jsx";
import Paciente from "./components/pages/paciente/Paciente.jsx";
import Producto from "./components/pages/producto/Producto.jsx";
import Error404 from "./components/pages/error404/Error404.jsx";
import TurnosPage from './components/pages/turnos/TurnosPage.jsx';
import "./index.css";

function App() {
  return (
    <div className="layout-contenedor">
      <Menu />
      <main className="contenido-principal">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<SobreNosotros />} />
          <Route path="/administracion" element={<Administrador />} />
          <Route path="/carro" element={<CarroCompras />} />
          <Route path="/paciente" element={<Paciente />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/turnos" element={<TurnosPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
