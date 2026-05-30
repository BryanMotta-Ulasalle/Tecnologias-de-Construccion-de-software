import { useEcommerceStore } from '../../../shared/hooks/useEcommerceStore'
import { DashboardView } from '../../../components/views/DashboardView'

const Dashboard = () => {
  const { dashboardMetrics, orderRows, navigate } = useEcommerceStore()

  return <DashboardView metrics={dashboardMetrics} orderRows={orderRows} onNavigate={navigate} />
}

export default Dashboard
