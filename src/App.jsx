import Menu from './components/shared/Menu.jsx';
import Footer from './components/shared/Footer.jsx';
import SobreNosotros from "./components/pages/sobre-nosotros/SobreNosotros";
import Paciente from "./components/pages/paciente/Paciente";
import Error404 from './components/pages/error404/Error404.jsx';
import "./index.css";

function App() {
  return (
    <>
      <Menu />
      <main>
      </main>
      <Footer />
      <Paciente></Paciente>
    </>
  );
}


export default App;
