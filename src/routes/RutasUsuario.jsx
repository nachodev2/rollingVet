import { Navigate, Outlet } from "react-router";

const RutasUsuario = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario || usuario.role !== "user") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RutasUsuario;
