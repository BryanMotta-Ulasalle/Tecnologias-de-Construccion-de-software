import { useEffect, useMemo, useState } from 'react'
import { ecommerceApi } from '../../../services/ecommerceApi'

export function useDashboardFeature({ session, products }) {
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [isDashboardLoading, setIsDashboardLoading] = useState(false)
  const [dashboardError, setDashboardError] = useState('')

  useEffect(() => {
    const loadDashboard = async () => {
      if (!session.signedIn) {
        setOrders([])
        setUsers([])
        return
      }

      try {
        setIsDashboardLoading(true)
        setDashboardError('')
        const [ordersData, usersData] = await Promise.all([
          ecommerceApi.getOrders(),
          ecommerceApi.getUsers().catch(() => []),
        ])

        setOrders(ordersData)
        setUsers(usersData)
      } catch (error) {
        setDashboardError(error?.response?.data?.detail ?? 'No se pudo cargar el dashboard.')
      } finally {
        setIsDashboardLoading(false)
      }
    }

    loadDashboard()
  }, [session.signedIn])

  const dashboardMetrics = useMemo(() => {
    const revenue = orders.reduce((total, order) => total + Number(order.total_price ?? 0), 0)

    return [
      { label: 'Revenue', value: `$${revenue.toFixed(2)}`, detail: 'Ingresos acumulados' },
      { label: 'Orders', value: `${orders.length}`, detail: 'Órdenes registradas' },
      { label: 'Customers', value: `${users.length}`, detail: 'Usuarios visibles' },
      { label: 'Products', value: `${products.length}`, detail: 'Productos activos' },
    ]
  }, [orders, products.length, users.length])

  const orderRows = useMemo(
    () =>
      orders.map((order) => ({
        id: String(order.id),
        customer: order.user?.name ?? 'Cliente',
        status: order.status,
        total: Number(order.total_price ?? 0),
      })),
    [orders],
  )

  return {
    orders,
    users,
    dashboardMetrics,
    orderRows,
    isDashboardLoading,
    dashboardError,
  }
}