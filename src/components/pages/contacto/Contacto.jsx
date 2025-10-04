import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function Contacto() {
  return (
    <section className="container my-5 text-center">
      <h1>Contactanos</h1>
      <div className=" grid row justify-content-space-around">
        <div className="col-12">
          <h4>
            <i className="bi bi-whatsapp"> +54 381 581 4700</i>
          </h4>
          <h4>
            <i className="bi bi-envelope-at"> info@rollingvet.com</i>
          </h4>

          <h4>
            <i className="bi bi-geo-alt"> San Miguel de Tucumán, Argentina</i>
          </h4>
          <h4>
            <i className="bi bi-instagram"> Nuestro instagram</i>
          </h4>
        </div>
        <div>
            <form action="">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Mensaje</label>
                    <textarea className="form-control" id="message" rows="3" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.10606795246!2d-65.20974728822091!3d-26.836578489931313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1759557316444!5m2!1ses!2sar"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

export default Contacto;
