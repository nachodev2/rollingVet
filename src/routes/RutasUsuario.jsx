import { Navigate, Outlet } from 'react-router';

const RutasUsuario = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default RutasUsuario;
