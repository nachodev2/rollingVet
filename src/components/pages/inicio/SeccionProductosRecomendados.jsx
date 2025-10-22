import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Producto from '../producto/Producto.jsx';
import './Inicio.css';

function SeccionProductosRecomendados() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const productos = [
    { id: 1, nombre: "Alimento Premium Perro", imagen: "/images/productos/alimento-perros.png", precio: "$15.000", alt: "Bolsa de alimento", texto: "Alimento premium..." },
    { id: 2, nombre: "Juguete Interactivo", imagen: "/images/productos/juguete-perros.png", precio: "$3.500", alt: "Juguete para perros", texto: "Juguete..." },
    { id: 3, nombre: "Shampoo Piel Sensible", imagen: "/images/productos/shampoo-animales.png", precio: "$5.800", alt: "Botella de shampoo", texto: "Shampoo..." },
    { id: 4, nombre: "Correa Reforzada", imagen: "/images/productos/correa.png", precio: "$2.100", alt: "Correa de paseo", texto: "Correa..." },
    { id: 5, nombre: "Juguete Gato Plumas", imagen: "/images/productos/juguetes-gatos.png", precio: "$1.200", alt: "Juguete de gato", texto: "Juguete..." },
    { id: 6, nombre: "Antiparasitario", imagen: "/images/productos/medicamento-perros.png", precio: "$9.000", alt: "Medicamento para perros", texto: "Medicamento..." },
    { id: 7, nombre: "Perfume para Gatos", imagen: "/images/productos/perfume-gato.png", precio: "$4.500", alt: "Perfume para mascotas", texto: "Perfume..." },
    { id: 8, nombre: "Ropa de Invierno", imagen: "/images/productos/ropa-perros.png", precio: "$7.200", alt: "Abrigo para perros", texto: "Ropa..." },
  ];

  const productosLoop = productos.concat(productos).concat(productos);

  const onMouseDown = (e) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onTouchStart = (e) => {
    if (scrollRef.current) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const onTouchMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const onTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isDragging) return;

      const totalWidth = container.scrollWidth;
      const visibleWidth = container.clientWidth;
      const currentScroll = container.scrollLeft;

      const singleSetWidth = totalWidth / 3;
      
      const buffer = 10;

      if (currentScroll >= (totalWidth - visibleWidth - buffer)) {
        container.scrollLeft = singleSetWidth;
        return;
      }
      
      if (currentScroll <= buffer) {
        container.scrollLeft = singleSetWidth;
        return;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  return (
    <Container className="my-5 fade-wrapper">
      <h3 className="mb-4 text-center">Productos Recomendados</h3>
      <div
        className={`scroll-container ${isDragging ? 'is-dragging' : ''}`}
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        
        {productosLoop.map((producto, index) => (
          <div key={`${producto.id}-${index}`} className="scroll-item">
            <Producto data={producto} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default SeccionProductosRecomendados;
