import { useEcommerceStore } from '../../../shared/hooks/useEcommerceStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { LogIn, Package2, ShoppingBag, Users } from 'lucide-react'
import { useState } from 'react'

function AuthCard({ title, actionLabel, hint, fields, onSubmit, isLoading }) {
  const [formData, setFormData] = useState(() =>
    fields.reduce((accumulator, field) => {
      accumulator[field.name] = ''
      return accumulator
    }, {}),
  )

  return (
    <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-sm shadow-black/5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-[#11110F]">{title}</h3>
        <LogIn className="h-5 w-5 text-[#C98C4B]" />
      </div>
      <p className="mt-2 text-sm text-[#62574D]">{hint}</p>
      <form
        className="mt-6 grid gap-3"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit(formData)
        }}
      >
        {fields.map((field) => (
          <input
            key={field.name}
            className="rounded-2xl border border-black/10 bg-[#F7F3EC] px-4 py-3 text-sm outline-none transition focus:border-black/20"
            placeholder={field.placeholder}
            type={field.type}
            value={formData[field.name]}
            onChange={(event) => setFormData((current) => ({ ...current, [field.name]: event.target.value }))}
            required
          />
        ))}
        <button
          className="mt-2 inline-flex items-center justify-center rounded-full bg-[#11110F] px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isLoading}
        >
          {actionLabel}
        </button>
      </form>
    </div>
  )
}

const Auth = () => {
  const navigateRouter = useNavigate()
  const location = useLocation()
  const { signIn, register, isLoading, apiError, session } = useEcommerceStore()

  const handleSignIn = async (credentials) => {
    
    const destination = location.state?.from ?? '/productos'
    const success = await signIn(credentials)
    if (success) {
      if (session.role === 'admin' || session.role === 'employee') {
      navigateRouter('/dashboard', { replace: true })
      return
    }
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

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <div className="rounded-[2rem] bg-[#11110F] p-8 text-white shadow-2xl shadow-black/10">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">Access</p>
        <h2 className="mt-3 text-3xl font-semibold">Customer and admin sessions in one place.</h2>
        <p className="mt-4 text-sm leading-7 text-white/65">
          This layout is ready to wire into your Django authentication endpoints or keep using local state while you prototype.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShoppingBag, text: 'Shop as guest' },
            { icon: Package2, text: 'Manage products' },
            { icon: Users, text: 'Control users' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <Icon className="h-5 w-5 text-[#E8B87E]" />
              <p className="mt-4 text-sm text-white/80">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {apiError ? (
          <div className="rounded-2xl border border-[#B04A3A]/30 bg-[#FFF3F1] px-4 py-3 text-sm text-[#B04A3A]">
            {apiError}
          </div>
        ) : null}

        <AuthCard
          title="Login"
          actionLabel="Sign in"
          hint="Ingresa con tu cuenta para agregar productos y crear pedidos."
          fields={[
            { name: 'email', type: 'email', placeholder: 'Email' },
            { name: 'password', type: 'password', placeholder: 'Password' },
          ]}
          onSubmit={handleSignIn}
          isLoading={isLoading}
        />
        <AuthCard
          title="Register"
          actionLabel="Create account"
          hint="Registra un usuario nuevo conectado al backend de Django."
          fields={[
            { name: 'name', type: 'text', placeholder: 'Nombre completo' },
            { name: 'email', type: 'email', placeholder: 'Email' },
            { name: 'password', type: 'password', placeholder: 'Password (min. 8 caracteres)' },
          ]}
          onSubmit={handleRegister}
          isLoading={isLoading}
        />
      </div>
    </section>
  )
}

export default Auth
