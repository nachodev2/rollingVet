// src/components/administrador/Paginador.jsx
import React from "react";
import { Pagination } from "react-bootstrap";

const Paginador = ({ total, actual, onChange }) => {
  const totalPaginas = Math.ceil(total);

  return (
    <Pagination className="justify-content-center mt-3">
      {Array.from({ length: totalPaginas }).map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === actual}
          onClick={() => onChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Paginador;