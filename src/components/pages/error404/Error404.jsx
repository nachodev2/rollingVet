import "./error404.css";

function Error404() {
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h1 className="text-center mt-4 mx-1 text-primary">UPS! Esta página se perdió como nosotros</h1>
        <img src="../images/error404.png" alt="Error404" className="img-error404"/>
      </div>
    </>
  );
}

export default Error404
