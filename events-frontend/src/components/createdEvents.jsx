import React from "react";
import EventCard from "./EventCard";
import ModifyEventModal from "./ModifyEventModal";
import { useState } from "react";

export default function CreatedEvents({
  user,
  createdEvents,
  setCreatedEvents,
  eventsLiked,
  events,
  setEvents,
  handleLikeEvent,
  handleUnlikeEvent,
}) {
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [eventToModify, setEventToModify] = useState(null);

  const handleModalModify = (e, event) => {
    e.stopPropagation();
    if (!isModifyOpen) {
      setEventToModify(event);
      setIsModifyOpen(true);
    } else {
      setEventToModify(null);
      setIsModifyOpen(false);
    }
  };

  const handleEventUpdated = (updatedEvent) => {
    console.log("Event updated:", updatedEvent); // Debugging

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
    setCreatedEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
  };

  const handleDeleteEvent = (eventToDelete) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event._id !== eventToDelete._id)
    );
    setCreatedEvents((prevEvents) =>
      prevEvents.filter((event) => event._id !== eventToDelete._id)
    );
  };

  return (
    <div className="h-screen">
      <ModifyEventModal
        isOpen={isModifyOpen}
        handleModalModify={handleModalModify}
        eventToModify={eventToModify}
        onEventUpdated={handleEventUpdated}
      />
      <h1 className="font-bold text-2xl">Created Events</h1>
      <span className="font-semibold text-gray-500">Events you've created</span>
      {createdEvents.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdEvents.map((event, index) => (
            <EventCard
              key={index}
              user={user}
              event={event}
              handleLikeEvent={handleLikeEvent}
              handleUnlikeEvent={handleUnlikeEvent}
              eventsLiked={eventsLiked}
              handleModalModify={handleModalModify}
              onDeleteEvent={handleDeleteEvent}
              fromCreatedEvents={true}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="font-semibold">
            You have not created any event yet !
          </span>
        </div>
      )}
    </div>
  );
}
