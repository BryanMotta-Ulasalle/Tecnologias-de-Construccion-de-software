import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../../../api/errors";
import { fetchOutboxEventById } from "../api/outboxApi";

const useOutboxEventDetail = (eventId) => {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(eventId));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) return undefined;

    let isActive = true;

    const loadEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchOutboxEventById(eventId);
        if (isActive) setEvent(data);
      } catch (requestError) {
        if (isActive) {
          setError(
            getApiErrorMessage(
              requestError,
              "No se pudo cargar el evento Outbox.",
            ),
          );
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadEvent();

    return () => {
      isActive = false;
    };
  }, [eventId]);

  return {
    data: eventId ? event : null,
    event: eventId ? event : null,
    isLoading: eventId ? isLoading : false,
    error: eventId ? error : null,
  };
};

export default useOutboxEventDetail;
