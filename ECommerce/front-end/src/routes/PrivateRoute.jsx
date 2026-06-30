import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PrivateRoute = ({children}) => {

    const {isAuthenticated, isLoading} = useAuth()

    if(isLoading){
      return <p> Cargando Sesion...</p>
    }

    if(!isAuthenticated){
      return <Navigate to="/login" replace/>
    }

  return children
}
export default PrivateRoute
