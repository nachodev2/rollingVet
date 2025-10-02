import { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Menu from './components/shared/Menu.jsx';
import Error404 from './components/pages/error404/Error404.jsx';
import Footer from './components/shared/Footer.jsx';
import SobreNosotros from "./components/pages/sobre-nosotros/SobreNosotros";
import "./index.css";
import Paciente from "./components/pages/paciente/Paciente";

function App() {
  return (
    <>
      <Menu />
      <main>
        <Paciente />
        <Error404 />
        <SobreNosotros />
      </main>
      <Footer />
    </>
  );
}


export default App;
