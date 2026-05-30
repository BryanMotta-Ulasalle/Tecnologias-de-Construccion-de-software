import { useEcommerceStore } from '../../../shared/hooks/useEcommerceStore'
import { CartView } from '../../../components/views/CartView'

const Cart = () => {
  const { cartItems, subtotal, navigate, removeFromCart, createOrder, isLoading } = useEcommerceStore()

  return (
    <CartView
      cartItems={cartItems}
      subtotal={subtotal}
      onNavigate={navigate}
      onRemoveFromCart={removeFromCart}
      onCreateOrder={createOrder}
      isLoading={isLoading}
    />
  )
}

export default Cart
