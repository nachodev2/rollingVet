import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./contaco.css";

function Contacto() {
  return (
    <section className="container my-5 text-center g-3 p-3 border border-3 border-primary rounded-4 shadow">
      <h1 className="display-4 mb-5 subrayado fw-semibold">Contactanos</h1>
      <div className=" grid row justify-content-around ">
        
        <div className="col-12 col-md-6 col-lg-6 mb-4 ">
            <h2 className="mb-4 subrayado fw-semibold">Nuestros medios de contacto</h2>
          <h4 className="mb-4 border-bottom border-3 border-primary pb-2">
            <i className="bi bi-whatsapp"> +54 381 581 4700</i>
          </h4>
          <h4 className="mb-4 border-bottom border-3 border-primary pb-2">
            <i className="bi bi-envelope-at"> info@rollingvet.com</i>
          </h4>

          <h4 className="mb-4 border-bottom border-3 border-primary pb-2">
            <i className="bi bi-geo-alt"> San Miguel de Tucumán, Argentina</i>
          </h4>
          <h4 className="mb-4 border-bottom border-3 border-primary pb-2">
            <i className="bi bi-instagram"> Nuestro instagram</i>
          </h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6 mb-4">
            <form className="container text-start row ">
                <h2 className="mb-4 subrayado fw-semibold">Envianos un mensaje</h2>
                <div className="mb-3 col-12 col-md-6 col-lg-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" required />
                </div>
                <div className="mb-3 col-12 col-md-6 col-lg-6">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="apellido" required />
                </div>
                <div className="mb-3 col-12 col-md-12 col-lg-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3 col-12 col-md-12 col-lg-12">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea className="form-control"   style={{ resize: "vertical", maxHeight: "200px" }} id="mensaje" rows="3" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
        <div className="col-12 col-md-12 col-lg-12 mb-4 ">
            <h2 className="mb-4 subrayado fw-semibold">Nos puedes encontrar aqui</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.10606795246!2d-65.20974728822091!3d-26.836578489931313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1759557316444!5m2!1ses!2sar"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-4 border border-3 border-primary shadow"
          />
        </div>
      </div>
    </section>
  );
}

export default Contacto;
