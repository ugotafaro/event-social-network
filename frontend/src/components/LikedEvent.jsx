// import lazy
import React, { lazy } from "react";
const EventCard = lazy(() => import("event/EventCard"));

export default function LikedEvent() {
  const eventsLiked = [
    {
      name: "React Conference",
      tag: "React",
      description: "A conference for React developers",
      date: "2022-01-01",
      image: "me.jpeg",
    },
    {
      name: "Vue Conference",
      tag: "Vue",
      description: "A conference for Vue developers",
      date: "2022-01-01",
      image: "mainevent.jpeg",
    },
    {
      name: "Angular Conference",
      tag: "Angular",
      description: "A conference for Angular developers",
      date: "2022-01-01",
      image: "me.jpeg",
    },
  ];

  return (
    <div>
      <h1 className="font-bold text-2xl">Liked Event</h1>
      <span className="font-semibold text-gray-500">
        Events you've shown interest in
      </span>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventsLiked.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
}
