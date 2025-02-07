import React, { useState } from "react";
import EventCard from "./EventCard";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Filter,
  Plus,
} from "lucide-react";

import CreateEventModal from "./CreateEventModal";

function Event({
  user,
  handleLikeEvent,
  handleUnlikeEvent,
  eventsLiked,
  setCreatedEvents,
  events,
  setEvents,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEventCreated = (newEvent) => {
    console.log("New event received:", newEvent); // Debugging

    setEvents((prevEvents) => [newEvent, ...prevEvents]);
    setCreatedEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  const filteredEvents = events?.filter((event) => {
    const eventTitle = event.title.toLowerCase();
    const query = searchQuery.toLowerCase();
    return eventTitle.includes(query);
  });

  return (
    <>
      <div className="mt-4">
        <CreateEventModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onEventCreated={handleEventCreated}
          user={user}
        />
        <div className="flex flex-col gap-12 md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">
              Upcoming Events
            </h1>
            <h3 className="mt-1 text-gray-400 font-semibold">
              Discover amazing events happening near you
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Event
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents?.map((event, index) => (
            <EventCard
              user={user}
              key={index}
              event={event}
              handleLikeEvent={handleLikeEvent}
              handleUnlikeEvent={handleUnlikeEvent}
              eventsLiked={eventsLiked}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Event;
