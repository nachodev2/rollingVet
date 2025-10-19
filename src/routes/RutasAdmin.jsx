
import { Navigate, Outlet } from 'react-router';

const RutasAdmin = () => {
    const usuario = { rol: 'admin' }; 

    if (!usuario || usuario.rol !== 'admin') {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default RutasAdmin;

