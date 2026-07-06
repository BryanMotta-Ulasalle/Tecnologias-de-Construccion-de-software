import {
  Boxes,
  ChartColumnStacked,
  ShoppingCart,
  TriangleAlert,
  Users,
  WalletCards,
} from "lucide-react";
import EmptyState from "../../../components/EmptyState";
import ErrorMessage from "../../../components/ErrorMessage";
import H2 from "../../../components/H2";
import LoadingState from "../../../components/LoadingState";
import TablePrivate from "../../products/components/staff/TablePrivate";
import { formatProductPrice } from "../../products/utils/productFormatters";
import MetricCard from "../components/MetricCard";
import useDashboardAdmin from "../hooks/useDashboardAdmin";

const DashboardPage = () => {
  const { data, isLoading, error } = useDashboardAdmin();

  if (isLoading) {
    return <LoadingState message="Cargando dashboard..." />;
  }

  if (error) {
    return <ErrorMessage message={error} className="m-5" />;
  }

  const { products, categories, orders, users } = data;
  const lowStockProducts = products.filter(
    (product) => Number(product.stock) <= 5,
  );
  const orderValue = orders.reduce(
    (total, order) => total + Number(order.total_price || 0),
    0,
  );
  const usersById = new Map(users.map((user) => [user.id, user]));
  const recentOrders = [...orders]
    .sort((first, second) => second.id - first.id)
    .slice(0, 5);
  const columns = [
    {
      key: "id",
      label: "Orden",
      render: (value) => <span className="font-semibold">#{value}</span>,
    },
    {
      key: "user",
      label: "Cliente",
      render: (value) => usersById.get(value)?.name || `Usuario #${value}`,
    },
    {
      key: "status",
      label: "Estado",
      render: (value) => (
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold capitalize text-amber-800">
          {value}
        </span>
      ),
    },
    {
      key: "total_price",
      label: "Total",
      render: (value) => (
        <span className="font-bold">{formatProductPrice(value)}</span>
      ),
    },
    {
      key: "shipping_address",
      label: "Direccion",
      render: (value) => (
        <span className="block max-w-64 text-sm text-stone-600">{value}</span>
      ),
    },
  ];

  const metrics = [
    {
      label: "Productos",
      value: products.length,
      detail: "Productos registrados",
      icon: Boxes,
    },
    {
      label: "Stock bajo",
      value: lowStockProducts.length,
      detail: "Cinco unidades o menos",
      icon: TriangleAlert,
    },
    {
      label: "Categorias",
      value: categories.length,
      detail: "Categorias registradas",
      icon: ChartColumnStacked,
    },
    {
      label: "Ordenes",
      value: orders.length,
      detail: "Ordenes registradas",
      icon: ShoppingCart,
    },
    {
      label: "Valor de ordenes",
      value: formatProductPrice(orderValue),
      detail: "No equivale a pagos confirmados",
      icon: WalletCards,
    },
    {
      label: "Usuarios",
      value: users.length,
      detail: "Cuentas registradas",
      icon: Users,
    },
  ];

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10">
      <div>
        <H2>Dashboard</H2>
        <p className="mt-1 text-sm text-stone-500">
          Resumen calculado desde los endpoints existentes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-stone-900">
          Ordenes recientes
        </h2>
        <div className="mt-4">
          {recentOrders.length === 0 ? (
            <EmptyState
              title="No hay ordenes recientes"
              description="Las nuevas ordenes apareceran en este resumen."
            />
          ) : (
            <TablePrivate columns={columns} data={recentOrders} />
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
