// import lazy
import React from "react";
import EventCard from "./EventCard";
import { getEventById } from "../../events.service";
import { useEffect, useState } from "react";
export default function LikedEvent({
  user,
  eventsLiked,
  handleLikeEvent,
  handleUnlikeEvent,
}) {
  return (
    <div>
      <h1 className="font-bold text-2xl">Liked Event</h1>
      <span className="font-semibold text-gray-500">
        Events you've shown interest in
      </span>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventsLiked.map((event, index) => (
          <EventCard
            key={index}
            user={user}
            event={event}
            handleLikeEvent={handleLikeEvent}
            handleUnlikeEvent={handleUnlikeEvent}
            eventsLiked={eventsLiked}
          />
        ))}
      </div>
    </div>
  );
}
