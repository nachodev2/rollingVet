import SeccionTitulo from './SeccionTitulo'
import SeccionMarcas from './SeccionMarcas'
import SeccionServicios from './SeccionServicios'
import SeccionProductosRecomendados from './SeccionProductosRecomendados'
import SeccionTablaPlanes from './SeccionTablaPlanes'
import './Inicio.css'


const Inicio = () => {
    return (
        <div>
            <SeccionTitulo />
            <SeccionMarcas />
            <SeccionServicios />
            <SeccionProductosRecomendados />
            <SeccionTablaPlanes />
        </div>
    )
}

export default Inicio