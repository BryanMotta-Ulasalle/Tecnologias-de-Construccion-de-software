import { Eye } from "lucide-react";
import { useState } from "react";
import EmptyState from "../../../components/EmptyState";
import ErrorMessage from "../../../components/ErrorMessage";
import H2 from "../../../components/H2";
import LoadingState from "../../../components/LoadingState";
import TablePrivate from "../../products/components/staff/TablePrivate";
import OutboxEventDetailModal from "../components/OutboxEventDetailModal";
import OutboxStatusBadge from "../components/OutboxStatusBadge";
import useOutboxEvents from "../hooks/useOutboxEvents";

const STATUS_OPTIONS = [
  "PENDING",
  "PROCESSING",
  "PROCESSED",
  "FAILED",
];

const formatDateTime = (value) => {
  if (!value) return "No disponible";

  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const OutboxEventsPage = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const { events, isLoading, error } = useOutboxEvents(statusFilter);

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (value) => <span className="font-semibold">#{value}</span>,
    },
    {
      key: "event_type",
      label: "Tipo de evento",
      render: (value) => <span className="font-medium">{value}</span>,
    },
    { key: "aggregate_type", label: "Agregado" },
    { key: "aggregate_id", label: "Aggregate ID" },
    {
      key: "status",
      label: "Estado",
      render: (value) => <OutboxStatusBadge status={value} />,
    },
    {
      key: "attempts",
      label: "Intentos",
      render: (value) => (
        <span className="rounded-md bg-stone-100 px-2 py-1 text-sm">
          {value}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Creado",
      render: (value) => (
        <span className="whitespace-nowrap text-sm text-stone-600">
          {formatDateTime(value)}
        </span>
      ),
    },
    {
      key: "processed_at",
      label: "Procesado",
      render: (value) => (
        <span className="whitespace-nowrap text-sm text-stone-600">
          {formatDateTime(value)}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Acciones",
      render: (_, event) => (
        <button
          type="button"
          onClick={() => setSelectedEventId(event.id)}
          className="cursor-pointer rounded-lg p-2 text-blue-700 hover:bg-blue-50"
          aria-label={`Ver evento Outbox ${event.id}`}
        >
          <Eye className="h-4 w-4" />
        </button>
      ),
    },
  ];

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <H2>Eventos Outbox</H2>
          <p className="mt-1 text-sm text-stone-500">
            Auditoría de eventos transaccionales y sus intentos de proceso.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="outbox-status-filter"
            className="text-sm font-medium text-stone-700"
          >
            Filtrar por estado
          </label>
          <select
            id="outbox-status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-stone-300 bg-white px-4 py-2"
          >
            <option value="">Todos</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && <LoadingState message="Cargando eventos Outbox..." />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && events.length === 0 && (
        <EmptyState
          title="No hay eventos Outbox"
          description={
            statusFilter
              ? `No existen eventos con estado ${statusFilter}.`
              : "Los eventos de negocio aparecerán aquí."
          }
        />
      )}
      {!isLoading && !error && events.length > 0 && (
        <TablePrivate columns={columns} data={events} />
      )}

      {selectedEventId && (
        <OutboxEventDetailModal
          eventId={selectedEventId}
          onClose={() => setSelectedEventId(null)}
        />
      )}
    </section>
  );
};

export default OutboxEventsPage;
