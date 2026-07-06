import ErrorMessage from "../../../components/ErrorMessage";
import LoadingState from "../../../components/LoadingState";
import Modal from "../../../components/Modal";
import useOutboxEventDetail from "../hooks/useOutboxEventDetail";
import OutboxStatusBadge from "./OutboxStatusBadge";

const formatDateTime = (value) => {
  if (!value) return "No disponible";

  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(value));
};

const OutboxEventDetailModal = ({ eventId, onClose }) => {
  const { event, isLoading, error } = useOutboxEventDetail(eventId);

  return (
    <Modal title={`Evento Outbox #${eventId}`} onClose={onClose}>
      {isLoading && <LoadingState message="Cargando evento..." />}
      {error && <ErrorMessage message={error} />}

      {event && (
        <div className="flex flex-col gap-6">
          <dl className="grid gap-4 rounded-xl bg-stone-50 p-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase text-stone-500">
                Tipo de evento
              </dt>
              <dd className="mt-1 font-medium">{event.event_type}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-stone-500">
                Estado
              </dt>
              <dd className="mt-1">
                <OutboxStatusBadge status={event.status} />
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-stone-500">
                Agregado
              </dt>
              <dd className="mt-1">
                {event.aggregate_type} #{event.aggregate_id}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-stone-500">
                Intentos
              </dt>
              <dd className="mt-1">{event.attempts}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-stone-500">
                Creado
              </dt>
              <dd className="mt-1 text-sm">
                {formatDateTime(event.created_at)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-stone-500">
                Procesado
              </dt>
              <dd className="mt-1 text-sm">
                {formatDateTime(event.processed_at)}
              </dd>
            </div>
          </dl>

          <div>
            <h3 className="font-semibold text-stone-900">Payload</h3>
            <pre className="mt-3 max-h-96 overflow-auto rounded-xl bg-stone-950 p-4 text-sm leading-6 text-stone-100">
              {JSON.stringify(event.payload, null, 2)}
            </pre>
          </div>

          {event.last_error && (
            <div>
              <h3 className="font-semibold text-red-800">Último error</h3>
              <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {event.last_error}
              </pre>
            </div>
          )}

          <p className="text-xs text-stone-500">
            Vista de auditoría de solo lectura.
          </p>
        </div>
      )}
    </Modal>
  );
};

export default OutboxEventDetailModal;
