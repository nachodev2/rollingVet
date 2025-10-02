import { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Menu from './components/shared/Menu.jsx';
import Error404 from './components/pages/error404/Error404.jsx';
import './index.css'

function App() {
  return (
    <>
      <Menu />
      <Error404 />
    </>
  );
}


export default App;
