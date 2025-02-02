import axios from "axios";

export const getEvents = async () => {
  try {
    const response = await axios.get("http://localhost/api/events");
    return response.data;
  } catch (error) {
    throw new Error("Error getting events");
  }
};

export const createEvent = async (event) => {
  try {
    const response = await axios.post("http://localhost/api/events", event);
    return response.data;
  } catch (error) {
    throw new Error("Error creating event");
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await axios.get(`http://localhost/api/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error getting event by id");
  }
};
