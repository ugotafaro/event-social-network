// import lazy
import React from "react";
import EventCard from "./EventCard";

export default function LikedEvent({
  user,
  eventsLiked,
  handleLikeEvent,
  handleUnlikeEvent,
}) {
  return (
    <div className="h-screen">
      <h1 className="font-bold text-2xl">Liked Event</h1>
      <span className="font-semibold text-gray-500">
        Events you've shown interest in
      </span>
      {eventsLiked.length > 0 ? (
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
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="font-semibold">
            You have not liked any event yet !
          </span>
        </div>
      )}
    </div>
  );
}
