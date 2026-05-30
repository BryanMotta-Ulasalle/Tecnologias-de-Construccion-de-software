import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ecommerceApi } from '../../../services/ecommerceApi'

export function useCartFeature({ session }) {
  const navigateRouter = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [cartId, setCartId] = useState(null)
  const [isCartLoading, setIsCartLoading] = useState(false)
  const [cartError, setCartError] = useState('')

  const loadCart = useCallback(async () => {
    if (!session.signedIn) {
      setCartItems([])
      setCartId(null)
      return
    }

    try {
      setIsCartLoading(true)
      setCartError('')
      const cartData = await ecommerceApi.getCart()
      setCartId(cartData.id)
      setCartItems(cartData.items)
    } catch (error) {
      setCartError(error?.response?.data?.detail ?? 'No se pudo cargar el carrito.')
    } finally {
      setIsCartLoading(false)
    }
  }, [session.signedIn])

  useEffect(() => {
    loadCart()
  }, [loadCart])

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0),
    [cartItems],
  )

  const addToCart = useCallback(
    async (productId) => {
      if (!session.signedIn) {
        navigateRouter('/usuarios')
        return
      }

      try {
        setIsCartLoading(true)
        setCartError('')
        await ecommerceApi.addOrUpdateCartItem({ cartItems, productId })
        await loadCart()
        navigateRouter('/pedidos')
      } catch (error) {
        setCartError(error?.response?.data?.detail ?? 'No se pudo agregar al carrito.')
      } finally {
        setIsCartLoading(false)
      }
    },
    [cartItems, loadCart, navigateRouter, session.signedIn],
  )

  const removeFromCart = useCallback(
    async (cartItemId) => {
      try {
        setIsCartLoading(true)
        setCartError('')
        await ecommerceApi.deleteCartItem(cartItemId)
        await loadCart()
      } catch (error) {
        setCartError(error?.response?.data?.detail ?? 'No se pudo eliminar el producto del carrito.')
      } finally {
        setIsCartLoading(false)
      }
    },
    [loadCart],
  )

  const createOrder = useCallback(
    async (shippingAddress) => {
      try {
        setIsCartLoading(true)
        setCartError('')
        await ecommerceApi.createOrder({ shippingAddress })
        await loadCart()
        return true
      } catch (error) {
        setCartError(error?.response?.data?.detail ?? 'No se pudo crear la orden.')
        return false
      } finally {
        setIsCartLoading(false)
      }
    },
    [loadCart],
  )

  return {
    cartItems,
    cartId,
    subtotal,
    addToCart,
    removeFromCart,
    createOrder,
    loadCart,
    isCartLoading,
    cartError,
  }
}