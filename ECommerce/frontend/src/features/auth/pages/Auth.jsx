import { useEcommerceStore } from '../../../shared/hooks/useEcommerceStore'
import { AuthView } from '../../../components/views/AuthView'
import { useLocation, useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigateRouter = useNavigate()
  const location = useLocation()
  const { signIn, register, isLoading, apiError } = useEcommerceStore()

  const handleSignIn = async (credentials) => {
    const destination = location.state?.from ?? '/productos'
    const success = await signIn(credentials)
    if (success) {
      navigateRouter(destination, { replace: true })
    }
  }

  const handleRegister = async (payload) => {
    const destination = location.state?.from ?? '/productos'
    const success = await register(payload)
    if (success) {
      navigateRouter(destination, { replace: true })
    }
  }

  return <AuthView onSignIn={handleSignIn} onRegister={handleRegister} isLoading={isLoading} errorMessage={apiError} />
}

export default Auth
