import apiClient from "../../../api/client";

export const fetchOutboxEvents = async (status) => {
  const { data } = await apiClient.get("/outbox-events/", {
    withAuth: true,
    params: status ? { status } : undefined,
  });
  return data;
};

export const fetchOutboxEventById = async (eventId) => {
  const { data } = await apiClient.get(`/outbox-events/${eventId}/`, {
    withAuth: true,
  });
  return data;
};
