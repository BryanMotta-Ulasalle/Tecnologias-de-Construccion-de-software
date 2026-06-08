import { useEcommerceStore } from '../../../shared/hooks/useEcommerceStore'
import { CreditCard, Package2, ShoppingBag, Users } from 'lucide-react'
import { SectionHeading } from '../../../components/SectionHeading'

const metricIcons = {
  Revenue: CreditCard,
  Orders: Package2,
  Customers: Users,
  Products: ShoppingBag,
}

const Dashboard = () => {
  const { dashboardMetrics, orderRows, navigate } = useEcommerceStore()

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Admin"
        title="Operations dashboard"
        action={
          <button onClick={() => navigate('landing')} className="text-sm font-medium text-[#62574D] transition hover:text-[#11110F]" type="button">
            Public site
          </button>
        }
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => {
          const Icon = metricIcons[metric.label] ?? Package2
          return (
          <div key={metric.label} className="rounded-[1.75rem] border border-black/5 bg-white/80 p-5 shadow-sm shadow-black/5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#62574D]">{metric.label}</p>
              <Icon className="h-5 w-5 text-[#C98C4B]" />
            </div>
            <p className="mt-4 text-3xl font-semibold text-[#11110F]">{metric.value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[#8B7F73]">{metric.detail}</p>
          </div>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-black/5 bg-white/80 p-5 shadow-sm shadow-black/5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Orders</h3>
            <span className="text-sm text-[#62574D]">Recent activity</span>
          </div>
          <div className="mt-4 space-y-3">
            {orderRows.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-3xl bg-[#F7F3EC] px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-[#11110F]">#{order.id}</p>
                  <p className="text-sm text-[#62574D]">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#11110F]">{order.status}</p>
                  <p className="text-sm text-[#62574D]">${order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#11110F] p-5 text-white shadow-2xl shadow-black/10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Configuration notes</h3>
            <Package2 className="h-5 w-5 text-[#E8B87E]" />
          </div>
          <div className="mt-5 space-y-4 text-sm leading-7 text-white/70">
            <p>1. Este front ya está en JS y listo para reemplazar el prototipo actual.</p>
            <p>2. Las pantallas de login, carrito y dashboard son reutilizables con tu API Django.</p>
            <p>3. La estructura visual sigue la plantilla: hero editorial, tarjetas, métricas y CTA.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
