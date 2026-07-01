export const PRIVATE_HEADERS_PRODUCTS_TABLE = [
  {
    key: "name",
    label: "Nombre",
    render: (value) => <span className="font-medium">{value}</span>
  },
  {
    key: "category.name",
    label: "Categoria",
    render: (value) => <span className="text-gray-600 font-normal">{value}</span>,
  },
  {
    key: "price",
    label: "Precio",
    render: (value) => <span className="font-bold">S/ {value}</span>,
  },
  {
    key: "stock",
    label: "Stock",
    render: (value) => (
      <span className="rounded-md bg-gray-100 px-2 py-1 text-sm">{value}</span>
    ),
  },
  {
    key: "status",
    label: "Estado",
    render: (value) => (
      <span
        className={`rounded-full px-3 py-1 text-sm font-medium ${
          value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {value ? "Activo" : "Inactivo"}
      </span>
    ),
  },
]