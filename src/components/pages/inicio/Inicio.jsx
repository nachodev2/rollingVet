import SeccionTitulo from './SeccionTitulo'
import SeccionMarcas from './SeccionMarcas'
import SeccionServicios from './SeccionServicios'
import './Inicio.css'


const Inicio = () => {
    return (
        <div>
            <SeccionTitulo />
            <SeccionMarcas />
            <SeccionServicios />
        </div>
    )
}

export default Inicio