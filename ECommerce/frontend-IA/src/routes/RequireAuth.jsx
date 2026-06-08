import { Navigate, useLocation } from 'react-router-dom'
import { useEcommerceStore } from '../shared/hooks/useEcommerceStore'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const { session } = useEcommerceStore()

  if (!session.signedIn) {
    return <Navigate to="/usuarios" replace state={{ from: location.pathname }} />
  }

  return children
}

export default RequireAuth
