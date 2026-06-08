import { useCallback, useEffect, useState } from 'react'
import { ecommerceApi } from '../../../services/ecommerceApi'

const STORAGE_KEY = 'ecommerce-atelier-session'

export function useAuthFeature() {
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? { signedIn: false, role: 'guest', accessToken: null, refreshToken: null, user: null }
    } catch {
      return { signedIn: false, role: 'guest', accessToken: null, refreshToken: null, user: null }
    }
  })
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    ecommerceApi.setAccessToken(session.accessToken)
  }, [session])

  const signIn = useCallback(async ({ email, password }) => {
    setIsAuthLoading(true)
    setAuthError('')
    try {
      const tokenData = await ecommerceApi.login({ email, password })
      ecommerceApi.setAccessToken(tokenData.access)
      const currentUser = await ecommerceApi.getCurrentUser()

      setSession({
        signedIn: true,
        role: currentUser.role?.name?.toLowerCase() ?? 'customer',
        accessToken: tokenData.access,
        refreshToken: tokenData.refresh,
        user: currentUser,
      })

      return true
    } catch (error) {
      setAuthError(error?.response?.data?.detail ?? 'Credenciales inválidas.')
      return false
    } finally {
      setIsAuthLoading(false)
    }
  }, [])

  const register = useCallback(async ({ name, email, password }) => {
    setIsAuthLoading(true)
    setAuthError('')
    try {
      await ecommerceApi.register({
        name,
        email,
        password,
        roleId: Number(import.meta.env.VITE_CUSTOMER_ROLE_ID),
      })
      return signIn({ email, password })
    } catch (error) {
      setAuthError(error?.response?.data?.detail ?? 'No se pudo registrar el usuario.')
      return false
    } finally {
      setIsAuthLoading(false)
    }
  }, [signIn])

  const signOut = useCallback(() => {
    setSession({ signedIn: false, role: 'guest', accessToken: null, refreshToken: null, user: null })
    ecommerceApi.setAccessToken(null)
  }, [])

  return {
    session,
    setSession,
    signIn,
    register,
    signOut,
    isAuthLoading,
    authError,
  }
}