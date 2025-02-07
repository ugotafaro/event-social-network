import axios from "axios";

// Créer une instance Axios
const api = axios.create({
  baseURL: "http://localhost/api", // Base URL de ton API
});

// Ajouter un interceptor pour ajouter le token dans les headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction pour créer un événement
export const createEvent = async (event, user) => {
  try {
    const response = await api.post("/events/create", { event, user });
    return response.data;
  } catch (error) {
    throw new Error("Error creating event");
  }
};

export const likeEvent = async (userId, eventId) => {
  try {
    const response = await api.post("/users/add-event-liked", {
      userId,
      eventId,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error liking event");
  }
};

export const unlikeEvent = async (userId, eventId) => {
  try {
    const response = await api.post("/users/remove-event-liked", {
      userId,
      eventId,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error unliking event");
  }
};

export const updateEvent = async (event) => {
  try {
    const response = await api.put(`/events/update/${event._id}`, event);
    return response.data;
  } catch (error) {
    throw new Error("Error updating event");
  }
};

// Fonction pour supprimer un événement
export const deleteEvent = async (eventId) => {
  try {
    const response = await api.delete(`/events/delete/${eventId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting event");
  }
};
