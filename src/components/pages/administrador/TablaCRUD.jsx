// src/components/administrador/TablaCRUD.jsx
import React from "react";
import { Table } from "react-bootstrap";
import { PencilSquare, Trash, Eye } from "react-bootstrap-icons";

const TablaCRUD = ({
  encabezadosTabla,
  datosMostrados,
  keyTab,
  onVer,
  onEditar,
  onEliminar,
}) => (
  <div className="mt-4 contenedor-tabla">
    <Table striped bordered hover responsive>
      <thead>
        <tr className="text-center">
          {encabezadosTabla.map((encabezado, index) => (
            <th key={index}>{encabezado}</th>
          ))}
          <th className="columna-acciones">Acciones</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {datosMostrados.length > 0 ? (
          datosMostrados.map((item) => (
            <tr key={item.id}>
              <td>{item.campo1}</td>
              <td>{item.campo2}</td>
              {encabezadosTabla.length > 2 && <td>{item.campo3}</td>}
              {encabezadosTabla.length > 3 && <td>{item.campo4}</td>}
              <td className="acciones-botones-contenedor">
                <div className="contenedor-iconos-accion">
                  {keyTab === "pacientes" && (
                    <>
                      <button
                        className="btn-icono-accion ver"
                        title="Ver Detalle"
                        onClick={() => onVer(item.id)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="btn-icono-accion editar"
                        title="Editar"
                        onClick={() => onEditar(item.id)}
                      >
                        <PencilSquare size={18} />
                      </button>
                      <button
                        className="btn-icono-accion eliminar"
                        title="Eliminar"
                        onClick={() => onEliminar(item.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={encabezadosTabla.length + 1}>
              No hay elementos para mostrar en esta sección.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
);

export default TablaCRUD;