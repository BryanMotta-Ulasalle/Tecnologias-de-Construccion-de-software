import { CreditCard } from 'lucide-react'
import { useState } from 'react'
import { SectionHeading } from '../SectionHeading'

export function CartView({ cartItems, subtotal, onNavigate, onRemoveFromCart, onCreateOrder, isLoading }) {
  const [shippingAddress, setShippingAddress] = useState('')

  const handleCheckout = async () => {
    if (!cartItems.length || !shippingAddress.trim()) {
      return
    }

    await onCreateOrder(shippingAddress.trim())
    setShippingAddress('')
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Checkout"
        title="Your cart"
        action={
          <button onClick={() => onNavigate('shop')} className="text-sm font-medium text-[#62574D] transition hover:text-[#11110F]" type="button">
            Continue shopping
          </button>
        }
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-sm shadow-black/5">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-3xl border border-black/5 bg-[#F7F3EC] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.product.image} alt={item.product.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-[#8B7F73]">{item.product.category}</p>
                    <h3 className="mt-1 text-base font-semibold text-[#11110F]">{item.product.name}</h3>
                    <p className="mt-1 text-sm text-[#62574D]">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <span className="text-lg font-semibold text-[#11110F]">${(item.product.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => onRemoveFromCart(item.id)} className="text-sm font-medium text-[#B04A3A]" type="button">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#11110F] p-6 text-white shadow-2xl shadow-black/10">
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">Summary</p>
          <div className="mt-5 space-y-3 text-sm text-white/75">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
          </div>
          <div className="my-5 h-px bg-white/10" />
          <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-white/55" htmlFor="shipping-address">
            Shipping address
          </label>
          <textarea
            id="shipping-address"
            value={shippingAddress}
            onChange={(event) => setShippingAddress(event.target.value)}
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/45 focus:border-white/35"
            placeholder="Ingresa la dirección de envío"
            rows={3}
          />
          <div className="my-5 h-px bg-white/10" />
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E8B87E] px-5 py-3 text-sm font-semibold text-[#11110F] transition hover:bg-[#F1C998] disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleCheckout}
            disabled={isLoading || !cartItems.length || !shippingAddress.trim()}
            type="button"
          >
            Proceed to checkout
            <CreditCard className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
