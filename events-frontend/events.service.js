import axios from "axios";

export const getEvents = async () => {
  try {
    const response = await axios.get("http://localhost/api/events");
    return response.data;
  } catch (error) {
    throw new Error("Error getting events");
  }
};

export const createEvent = async (event, user) => {
  try {
    const response = await axios.post("http://localhost/api/events/create", {
      event,
      user,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error creating event");
  }
};

export const likeEvent = async (userId, eventId) => {
  try {
    console.log("event id", eventId);
    const response = await axios.post(
      `http://localhost/api/users/add-event-liked`,
      {
        userId,
        eventId,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error liking event");
  }
};

export const unlikeEvent = async (userId, eventId) => {
  try {
    const response = await axios.post(
      `http://localhost/api/users/remove-event-liked`,
      {
        userId,
        eventId,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error unliking event");
  }
};
