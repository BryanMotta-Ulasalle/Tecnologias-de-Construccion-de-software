import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../../../api/errors";
import { fetchOutboxEvents } from "../api/outboxApi";

const useOutboxEvents = (status) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const loadEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchOutboxEvents(status);
        if (isActive) setEvents(data);
      } catch (requestError) {
        if (isActive) {
          setError(
            getApiErrorMessage(
              requestError,
              "No se pudieron cargar los eventos Outbox.",
            ),
          );
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadEvents();

    return () => {
      isActive = false;
    };
  }, [status]);

  return { data: events, events, isLoading, error };
};

export default useOutboxEvents;
