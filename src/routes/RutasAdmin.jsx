
import { Navigate, Outlet } from 'react-router';

const RutasAdmin = () => {
   const adminPage = JSON.parse(localStorage.getItem("usuario"));

    if (!adminPage || adminPage.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default RutasAdmin;

