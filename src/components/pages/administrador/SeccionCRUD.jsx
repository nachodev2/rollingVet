// src/components/administrador/SeccionCRUD.jsx
import React from "react";
import TablaCRUD from "./TablaCRUD.jsx";
import Paginador from "./Paginador.jsx";

const SeccionCRUD = ({
  tabKey,
  encabezados,
  datos,
  botonTexto,
  pagina,
  total,
  onCrear,
  onVer,
  onEditar,
  onEliminar,
  onPaginar,
}) => (
  <>
    <h2 className="subtitulo-seccion">
      Gestión de {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
    </h2>

    <div className="btn-crear-container">
      <button className="btn-crear-elemento" onClick={onCrear}>
        {botonTexto}
      </button>
    </div>

    <TablaCRUD
      encabezadosTabla={encabezados}
      datosMostrados={datos}
      keyTab={tabKey}
      onVer={onVer}
      onEditar={onEditar}
      onEliminar={onEliminar}
    />

    <Paginador total={total} actual={pagina} onChange={onPaginar} />
  </>
);

export default SeccionCRUD;