import Paciente from "./components/pages/paciente/Paciente";
import { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Menu from './components/shared/Menu.jsx';
import Error404 from './components/pages/error404/Error404.jsx';
import Footer from './components/shared/Footer.jsx';
import SobreNosotros from "./components/pages/sobre-nosotros/SobreNosotros";
import "./index.css";

function App() {
  return (
    <>
      <Menu />
      <main>
      </main>
      <Footer />
    </>
  );
}


export default App;
