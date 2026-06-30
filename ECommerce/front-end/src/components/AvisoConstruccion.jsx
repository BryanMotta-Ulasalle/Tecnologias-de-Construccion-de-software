import { Link } from "react-router-dom"

const AvisoConstruccion = () => {
  return (
    <div className='h-dvh w-dvw flex justify-center items-center flex-col gap-5'>
        <h1 className='font-medium text-3xl'>Esta seccion aun se encuentra en Desarrollo, por favor de seguir probando otra parte del Sistema</h1>
        <Link to="/" className="bg-orange-300 px-4 py-2 rounded-lg">Ir al Inicio</Link>    
    </div>
  )
}

export default AvisoConstruccion