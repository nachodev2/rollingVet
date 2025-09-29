import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Paciente from "./components/pages/paciente/Paciente";

function App() {
  return (
    <>
    <h1 className="text-center my-3 titulo">Historia Clínica</h1>
      <Paciente></Paciente>
      
    </>
  );
}

export default App;
